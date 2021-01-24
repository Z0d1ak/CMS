﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Dto;
using web.Entities;
using web.Options;
using web.Other.SearchParameters;
using web.Services;

namespace web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService companyService;

        public CompanyController(ICompanyService companyService)
        {
            this.companyService = companyService;
        }

        [Authorize(Roles = AccessRoles.SuperAdmin)]
        [HttpPost]
        public async Task<ActionResult> Create(CreateCompanyDto createCompanyDto)
        {
            var result = await this.companyService.CreateAsync(createCompanyDto, this.HttpContext.RequestAborted);

            if (result.IsSuccessful())
            {
                return this.CreatedAtAction(nameof(CompanyController.GetCompany), result.Value.Id, result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [HttpGet("{id}", Name = nameof(CompanyController.GetCompany))]
        [Authorize]
        public async Task<ActionResult<CompanyDto>> GetCompany([FromRoute] Guid id)
        {
            var result = await this.companyService.GetByIdAsync(id, this.HttpContext.RequestAborted);

            if (result.IsSuccessful())
            {
                return this.Ok(result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [HttpGet()]
        [Authorize(Roles = AccessRoles.SuperAdmin)]
        public async Task<ActionResult<IEnumerable<CompanyDto>>> Find([FromQuery] CompanySearchParameters searchParameters)
        {
            var result = await this.companyService.FindAsync(searchParameters, this.HttpContext.RequestAborted);

            if (result.IsSuccessful())
            {
                return this.Ok(result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [HttpPut]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        public async Task<ActionResult> Update(CompanyDto companyDto)
        {
            var result = await this.companyService.UpdateAsync(companyDto, this.HttpContext.RequestAborted);

            if (result.IsSucessful())
            {
                return this.NoContent();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [Authorize(Roles = AccessRoles.SuperAdmin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] Guid id)
        {
            var result = await this.companyService.DeleteAsync(id, this.HttpContext.RequestAborted);

            if (result.IsSucessful())
            {
                return this.NoContent();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }
    }
}
