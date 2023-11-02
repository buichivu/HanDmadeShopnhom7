using handMadeNhom7.Constants;
using handMadeNhom7.Entities;
using handMadeNhom7.Services.Interfaces;
using handMadeNhom7.Utils;
using Microsoft.IdentityModel.Tokens;
using handMadeNhom7.Dto.User;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Numerics;
using System.Security.Claims;
using System.Text;
using handMadeNhom7.Exceptions;

namespace handMadeNhom7.Services.Implements
{
    public class UserService : IUserService
    {
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(ILogger<CustomerService> logger, ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _logger = logger;
            _dbContext = dbContext;
            _configuration = configuration;
        }
        public List<UserPriceDto> GetAll()
        {
            List<UserPriceDto> result = new List<UserPriceDto>();
            var listUser = from user in _dbContext.Users

                           select new User
                           {
                               Id = user.Id,
                               FullName = user.FullName,
                               UserName = user.UserName,
                               Password = user.Password,
                               Email = user.Email,
                               Phone = user.Phone,
                               UserType = user.UserType
                           };
            foreach (var items in listUser)
            {
                int total = _dbContext.Orders.Where(o => o.CustomerId == items.Id).Sum(i => i.FinalPrice);
                var user = new UserPriceDto()
                {
                    Id = items.Id,
                    FullName = items.FullName,
                    UserName = items.UserName,
                    Password = items.Password,
                    Email = items.Email,
                    Phone = items.Phone,
                    UserType = items.UserType,
                    TotalPrice = total,
                };
                result.Add(user);
            }
            return result;
        }

        public void UpdateUser(User input)
        {
            var user = _dbContext.Users.FirstOrDefault(p => p.Id == input.Id);
            if (user != null)
            {
                user.FullName = input.FullName;
                user.Phone = input.Phone;

            }
            _dbContext.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var user = _dbContext.Users.FirstOrDefault(p => p.Id == id);
            if (user != null)
            {
                _dbContext.Users.Remove(user);
            }
            _dbContext.SaveChanges();
        }

        public User GetbyId(int id)
        {
            var user = _dbContext.Users.FirstOrDefault((p) => p.Id == id);
            return user;
        }
        public void Create(CreateUserDto input)
        {
            if (_dbContext.Users.Any(u => u.UserName == input.UserName))
            {
                throw new UserFriendlyException($"Ten tai khoan \"{input.UserName}\" da ton tai");
            }
            _dbContext.Users.Add(new User
            {
                FullName = input.FullName,
                UserName = input.UserName,
                Password = CommonUtils.CreateMD5(input.Password),
                Email = input.Email,
                Phone = input.Phone,
                UserType = input.UserType
            });
            _dbContext.SaveChanges();
        }
        public void Update(UpdateUserDto input)
        {
            var user = _dbContext.Users.FirstOrDefault(p => p.Id == input.Id);
            if (user != null)
            {
                user.Password = CommonUtils.CreateMD5(input.Password);
            }
            _dbContext.SaveChanges();
        }
        public string Login(LoginDto input)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == input.UserName);
            if (CommonUtils.CreateMD5(input.Password) == user.Password)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub,user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name,user.UserName),
                    new Claim(CustomClaimTypes.UserType,user.UserType.ToString())
                };
                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddSeconds(_configuration.GetValue<int>("JWT:Expires")),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            else
            {
                throw new UserFriendlyException($"Mat khau khong chinh xac");
            }
        }

    }
}
