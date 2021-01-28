using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Dto;
using web.Other;
using web.Other.SearchParameters;
using web.Repositories;

namespace web.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository companyRepository;

        public CompanyService(ICompanyRepository companyRepository)
        {
            this.companyRepository = companyRepository;
        }

        public async Task<ServiceResult<CompanyDto>> CreateAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken = default)
        {
            var company = await this.companyRepository.CreateAsync(createCompanyDto, cancellationToken);

            if(company is null)
            {
                return new ServiceResult<CompanyDto>(StatusCodes.Status409Conflict);
            }

            return new ServiceResult<CompanyDto>(company);
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var isDeleted = await this.companyRepository.DeleteAsync(id, cancellationToken);

            if (!isDeleted)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }

            return ServiceResult.Successfull;
        }

        public async Task<ServiceResult<SearchResponseDto<CompanyDto>>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var companyDtos = await this.companyRepository.FindAsync(searchParameters, cancellationToken);

            return new ServiceResult<SearchResponseDto<CompanyDto>>(companyDtos);
        }

        public async Task<ServiceResult<CompanyDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var companyDto = await this.companyRepository.GetByIdAsync(id, cancellationToken);
            if(companyDto is null)
            {
                return new ServiceResult<CompanyDto>(StatusCodes.Status404NotFound);
            }

            return new ServiceResult<CompanyDto>(companyDto);
        }

        public async Task<ServiceResult> UpdateAsync(CompanyDto companyDto, CancellationToken cancellationToken = default)
        {
            bool isUpdated = await this.companyRepository.UpdateAsync(companyDto, cancellationToken);

            if (!isUpdated)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }

            return ServiceResult.Successfull;
        }
    }
}
