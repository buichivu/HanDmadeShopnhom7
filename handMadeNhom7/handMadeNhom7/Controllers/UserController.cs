using handMadeNhom7.Dto.User;
using handMadeNhom7.Entities;
using handMadeNhom7.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace handMadeNhom7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : APIControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService,
            ILogger<UserController> logger) : base(logger)
        {
            _userService = userService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            try
            {
                var students = _userService.GetAll();
                return Ok(students);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            };
        }
        [HttpGet("get-user-by-id/{id}")]
        public IActionResult GetById([FromQuery] int id)
        {
            try
            {
                User user = _userService.GetbyId(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPost("create")]
        public IActionResult Create(CreateUserDto input)
        {
            try
            {
                _userService.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
        [HttpPost("update")]
        public IActionResult UpdateById(UpdateUserDto input)
        {
            try
            {
                _userService.Update(input);
                return Ok(_userService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPut("update-user")]
        public IActionResult UpdateUser(User input)
        {
            try
            {
                _userService.UpdateUser(input);
                return Ok(_userService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpDelete("deleted-user/(id)")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                _userService.DeleteUser(id);
                return Ok(_userService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto input)
        {
            try
            {
                string token = _userService.Login(input);
                var handler = new JwtSecurityTokenHandler();
                var decodedValue = handler.ReadJwtToken(token);
                var currentId = decodedValue.Payload.Sub;
                return Ok(new { token, currentId });
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
    }
}

