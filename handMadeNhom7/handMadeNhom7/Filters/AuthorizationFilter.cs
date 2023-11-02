﻿using handMadeNhom7.Constants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace handMadeNhom7.Filters
{
    public class AuthorizationFilter : Attribute, IAuthorizationFilter
    {
        private readonly int[] _userTypes;
        public AuthorizationFilter(params int[] userTypes)
        {
            _userTypes = userTypes;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            var claims = user.Claims.ToList();
            var userTypeClaim = claims.FirstOrDefault(c => c.Type == CustomClaimTypes.UserType);
            if (userTypeClaim != null)
            {
                int userType = int.Parse(userTypeClaim.Value);
                if (!_userTypes.Contains(userType))
                {
                    context.Result = new UnauthorizedObjectResult(new { message = $"User type = {userType} khong co quyen" });
                };
            }
            else
            {
                context.Result = new UnauthorizedObjectResult(new { message = "Khong co quyen" });
            }

        }
    }
}
