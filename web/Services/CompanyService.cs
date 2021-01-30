using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Dto;
using web.Other;
using web.Other.SearchParameters;
using web.Repositories;
using web.Dto.Request;
using web.Dto.Response;

namespace web.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository companyRepository;

        public CompanyService(ICompanyRepository companyRepository)
        {
            this.companyRepository = companyRepository;
        }

        public async Task<ServiceResult<ResponseCompanyDto>> CreateAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken = default)
        {
            var company = await this.companyRepository.CreateAsync(createCompanyDto, cancellationToken);

            if(company is null)
            {
                return new ServiceResult<ResponseCompanyDto>(StatusCodes.Status409Conflict);
            }

            return new ServiceResult<ResponseCompanyDto>(company);
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

        public async Task<ServiceResult<SearchResponseDto<ResponseCompanyDto>>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var companyDtos = await this.companyRepository.FindAsync(searchParameters, cancellationToken);

            return new ServiceResult<SearchResponseDto<ResponseCompanyDto>>(companyDtos);
        }

        public async Task<ServiceResult<ResponseCompanyDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var companyDto = await this.companyRepository.GetByIdAsync(id, cancellationToken);
            if(companyDto is null)
            {
                return new ServiceResult<ResponseCompanyDto>(StatusCodes.Status404NotFound);
            }

            return new ServiceResult<ResponseCompanyDto>(companyDto);
        }

        public async Task<ServiceResult> UpdateAsync(StoreCompanyDto storeCompanyDto, CancellationToken cancellationToken = default)
        {
            bool isUpdated = await this.companyRepository.UpdateAsync(storeCompanyDto, cancellationToken);

            if (!isUpdated)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }

            return ServiceResult.Successfull;
        }
    }
}
