using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NickBuhro.Translit;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Db;
using web.Entities;
using web.Options;
using web.Repositories.Helpers;
using web.Services;

namespace web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IUserInfoProvider userInfoProvider;

        public PublishController(DataContext dataContext,
            IUserInfoProvider userInfoProvider)
        {
            this.dataContext = dataContext;
            this.userInfoProvider = userInfoProvider;
        }

        [HttpGet("tg")]
        public async Task<IActionResult> GetTelegrammDataAsync()
        {
            var data = await this.dataContext.TelegrammDatas.FirstOrDefaultAsync();
            if(data is null)
            {
                data = new TelegrammData
                {
                    Id = Guid.NewGuid(),
                    CompanyId = userInfoProvider.CompanyId
                };
                this.dataContext.TelegrammDatas.Add(data);
                await this.dataContext.SaveChangesAsync();
            }

            return this.Ok(data);
        }

        [HttpPost("tg")]
        public async Task<IActionResult> SaveTelegrammAsync(TelegrammDto telegrammDto)
        {
            var data = await this.dataContext.TelegrammDatas.FirstOrDefaultAsync();
            if (data is null)
            {
                data = new TelegrammData
                {
                    Id = Guid.NewGuid(),
                    CompanyId = userInfoProvider.CompanyId
                };
                this.dataContext.TelegrammDatas.Add(data);
            }

            data.BotName = telegrammDto.BotName;
            data.ChanelName = telegrammDto.ChanelName;
            this.dataContext.Update(data);
            await this.dataContext.SaveChangesAsync();

            return this.Ok();
        }

        [HttpPost("pubdata")]
        public async Task<IActionResult> SetPublishDateAsync(RequestPublishDto requestPublishDto)
        {

            var article = await this.dataContext.Articles.FirstOrDefaultAsync(x => x.Id == requestPublishDto.ArticleID);
            if(article is null)
            {
                return this.NotFound();
            }
            
            var name = string.Join('_', article.Title.Split(' ', StringSplitOptions.RemoveEmptyEntries));
            var latinName = Transliteration.CyrillicToLatin(
                name,
                Language.Russian);
            var pd = await this.dataContext.PublishDatas.FirstOrDefaultAsync(x => x.ArticleId == requestPublishDto.ArticleID);
            DateTime? date = requestPublishDto.Date is null ? null : DateTime.Parse(requestPublishDto.Date);
            if (pd is null)
            {
                pd = new PublishData
                {
                    Id = Guid.NewGuid(),
                    CompanyId = this.userInfoProvider.CompanyId,
                    ArticleId = article.Id,
                    Date = date,
                    Link = latinName
                };
                this.dataContext.PublishDatas.Add(pd);

            }
            else
            {
                pd.Date = date;
                pd.Link = latinName;
                this.dataContext.Update(pd);
            }

            await this.dataContext.SaveChangesAsync();
            return this.Ok(pd);

        }

        [HttpGet("pubdata/{id}")]
        public async Task<IActionResult> GetPublishDataAsync([FromRoute]Guid id)
        {
            var data = this.dataContext.PublishDatas.FirstOrDefault(x => x.ArticleId == id);

            return this.Ok(data);
        }


        [HttpGet("check")]
        public async Task Publish()
        {
            var tg = await this.dataContext.TelegrammDatas.IgnoreQueryFilters().FirstOrDefaultAsync();
            if(tg is null)
            {
                return;
            }
            var lst = await this.dataContext.PublishDatas.IgnoreQueryFilters().Where(x => !x.Published && (x.Date == null || x.Date <= DateTime.Now)).ToListAsync();

            foreach(var item in lst)
            {
                try
                {
                    var article = await this.dataContext.Articles.FirstAsync(x => x.Id == item.ArticleId);

                    var name = article + Environment.NewLine + "http://localhost:3000/" + item.Link;
                    await PublishASync(tg.BotName, tg.ChanelName, name);
                    item.Published = true;
                    this.dataContext.Update(item);
                }
                catch
                {

                }
            }

            await dataContext.SaveChangesAsync();
        }

        [HttpGet("art/{name}")]
        public async Task<IActionResult> GetArticle([FromRoute]string name)
        {
            var data = await this.dataContext.PublishDatas.IgnoreQueryFilters().FirstOrDefaultAsync(x => x.Link == name);
            if(data == null)
            {
                return this.NotFound();
            }
            var article = await this.dataContext.Articles.IgnoreQueryFilters().FirstOrDefaultAsync(x => x.Id == data.ArticleId);

            return this.Ok(article);
        }

        private async Task PublishASync(string bot, string chat, string message)
        {
            string urlString = "https://api.telegram.org/bot{0}/sendMessage?chat_id={1}&text={2}&parse_mode=HTML&disable_web_page_preview=false";
            string apiToken = "1735079029:AAHchLHL0JOc0sWu44bbi558kRygThC7rZg";
            string chatId = "@cms_test";
            string text = "https://www.youtube.com/watch?v=lGmCrZHxRPU&ab_channel=Sh0tnik ";
            urlString = String.Format(urlString, bot, chat, message);
            WebRequest request = WebRequest.Create(urlString);
            Stream rs = request.GetResponse().GetResponseStream();
            StreamReader reader = new StreamReader(rs);
            string line = "";
            StringBuilder sb = new StringBuilder();
            while (line != null)
            {
                line = reader.ReadLine();
                if (line != null)
                    sb.Append(line);
            }
            string response = sb.ToString();
        }
    }

    public class TelegrammDto
    {
        public string BotName { get; set; }

        public string ChanelName { get; set; }
    }

    public class PublishDto
    {
        public Guid ArticleId { get; set; }

        public Guid ArticleDate { get; set; }
    }

    public class RequestPublishDto
    {
        public Guid ArticleID { get; set; }

        
        public string? Date { get; set; }
    }


    public class ResponsePublishDto
    {
        public Guid ArticleID { get; set; }

        public DateTime Date { get; set; }
    }
}
