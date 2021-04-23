using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Db;
using web.Entities;
using web.Options;
using web.Services;

namespace web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IWebHostEnvironment environment;

        public DataController(
            DataContext dataContext,
            IWebHostEnvironment environment  
            )
        {
            DataContext = dataContext;
            this.environment = environment;
        }

        public DataContext DataContext { get; }

        public static string GetFileExtensionFromUrl(string url)
        {
            url = url.Split('?')[0];
            url = url.Split('/').Last();
            return url.Contains('.') ? url.Substring(url.LastIndexOf('.')) : "";
        }


        [HttpPost("ByUrl")]
        public async Task<IActionResult> SaveByUrlAsync()
        {
            string url;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                url = await reader.ReadToEndAsync();
            }
            var type = GetFileExtensionFromUrl(url);
            byte[] payLoad;
            using WebClient webClient = new WebClient();
            var id = Guid.NewGuid();
            //Fetch the File Name.
            string fileName = $"{id}{type}";
            if (!Directory.Exists(this.environment.WebRootPath + "\\Upload\\"))
            {
                Directory.CreateDirectory(this.environment.WebRootPath + "\\Upload\\");
            }

            webClient.DownloadFile(new Uri(url), this.environment.WebRootPath + "\\Upload\\" + fileName);

            var resp = new ResponseDataDto
            {
                Success = 1,
                File = new ResponseFileDto
                {
                    Url = "https://localhost:44329/Upload/" + fileName
                }
            };

            return this.Ok(resp);
        }

        public class FileUploadApi
        {
            public IFormFile files { get; set; }
        }

        [HttpGet("urimeta")]
        public async Task<IActionResult> GetLinkMeta([FromQuery] string url)
        {
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(new Uri(url));
            request.Method = WebRequestMethods.Http.Get;

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            StreamReader reader = new StreamReader(response.GetResponseStream());

            String responseString = reader.ReadToEnd();

            response.Close();

            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(responseString);

            String title = (from x in doc.DocumentNode.Descendants()
                            where x.Name.ToLower() == "title"
                            select x.InnerText).FirstOrDefault();

            String desc = (from x in doc.DocumentNode.Descendants()
                           where x.Name.ToLower() == "meta"
                           && x.Attributes["name"] != null
                           && x.Attributes["name"].Value.ToLower() == "description"
                           select x.Attributes["content"].Value).FirstOrDefault();

            List<String> imgs = (from x in doc.DocumentNode.Descendants()
                                 where x.Name.ToLower() == "img"
                                 select x.Attributes["src"].Value).ToList<String>();
            List<String> links = (from x in doc.DocumentNode.Descendants()
                                 where x.Name.ToLower() == "link" && (x.Attributes["href"].Value.Contains(".png") || x.Attributes["href"].Value.Contains(".jpeg"))
                                 select x.Attributes["href"].Value).ToList<String>();

            var lst = links.Concat(imgs).Where(x => !string.IsNullOrWhiteSpace(x) && (x.Contains(".png") || x.Contains("jpeg")));

            var im = lst?.FirstOrDefault();
            var resp = new ResponseLinkDto
            {
                Success = 1,
                Meta = new ResponseFLinkMeta
                {
                    Title = title,
                    Description = desc,
                    site_name = new Uri(url).Host,
                    Image = im == null ? null : new ResponseFileDto { Url = im}
                }
            };

            return this.Ok(resp);

        }


        [HttpPost("ByContent")]
        public async Task<IActionResult> SaveByDataAsync()
        {
            var from = this.Request.Form;


            IFormFile formFile = from.Files.First();//fileUploadApi.files;
            if (formFile.Length > 0)
            {
                var type = Path.GetExtension(formFile.FileName);

                var id = Guid.NewGuid();
                //Fetch the File Name.
                string fileName = $"{id}{type}";
                if (!Directory.Exists(this.environment.WebRootPath + "\\Upload\\"))
                {
                    Directory.CreateDirectory(this.environment.WebRootPath + "\\Upload\\");
                }
                using (FileStream fs = System.IO.File.Create(this.environment.WebRootPath + "\\Upload\\" + fileName))
                {
                    await formFile.CopyToAsync(fs);
                    fs.Flush();
                }

                var resp = new ResponseDataDto
                {
                    Success = 1,
                    File = new ResponseFileDto
                    {
                        Url = "https://localhost:44329/Upload/" + fileName
                    }
                };

                return this.Ok(resp);
            }

            else return null;
        }
    }

    public class ResponseLinkDto
    {
        public int Success { get; set; }

        public ResponseFLinkMeta Meta { get; set; } = null!;
    }

    public class ResponseFLinkMeta
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string site_name { get; set; } = null!;

        public ResponseFileDto Image { get; set; } = null!;

    }

    public class ResponseDataDto
    {
        public int Success { get; set; }

        public ResponseFileDto File { get; set; } = null!;
    }

    public class ResponseFileDto
    {
        public string Url { get; set; } = null!;
    }
}
