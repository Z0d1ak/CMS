using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;
using web.Repositories;

namespace web.Services
{
    public class CompanyService : ICompanyService
    {
        #region Private Fields

        private readonly ICompanyRepository companyRepository;

        #endregion

        #region Constructor

        public CompanyService(ICompanyRepository companyRepository)
        {
            this.companyRepository = companyRepository;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<ResponseCompanyDto>> CreateAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken = default)
        {
            return  await this.companyRepository.CreateAsync(createCompanyDto, cancellationToken);
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return  await this.companyRepository.DeleteAsync(id, cancellationToken);
        }

        public async Task<ServiceResult<SearchResponseDto<ResponseCompanyDto>>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            return await this.companyRepository.FindAsync(searchParameters, cancellationToken);
        }

        public async Task<ServiceResult<ResponseCompanyDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await this.companyRepository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<ServiceResult> UpdateAsync(StoreCompanyDto storeCompanyDto, CancellationToken cancellationToken = default)
        {
            return await this.companyRepository.UpdateAsync(storeCompanyDto, cancellationToken);
        }

        #endregion
    }
}
