﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using web.Db;
using web.Dto;
using web.Entities;
using web.Other;
using web.Services;
using web.Dto.Request;
using web.Dto.Response;

namespace web.Repositories
{
    public class AuthRepository
        : IAuthRepository
    {
        #region Private Fields

        private readonly DataContext dataContext;
        private readonly IPasswordService passwordService;

        #endregion

        #region Constructor

        public AuthRepository(
            DataContext dataContext,
            IPasswordService passwordService)
        {
            this.dataContext = dataContext;
            this.passwordService = passwordService;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<ResponseUserDto>> LoginAsync(LoginRequestDto loginRequestDto, CancellationToken cancellationToken = default)
        {
            var user = await this.dataContext.Users
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Include(x => x.Roles)
                .FirstOrDefaultAsync(x => x.Email == loginRequestDto.Email, cancellationToken);
            if(user is null)
            {
                return new ServiceResult<ResponseUserDto>(StatusCodes.Status404NotFound);
            }
            if(!await passwordService.VerifyPasswordAsync(loginRequestDto.Password, user.PasswordHash, user.PasswordSalt, cancellationToken))
            {
                return new ServiceResult<ResponseUserDto>(StatusCodes.Status401Unauthorized);
            }
            return new ServiceResult<ResponseUserDto>(user.ToDto());
        }

        #endregion
    }
}
