using handMadeNhom7.Dto.Cart;
using handMadeNhom7.Dto.Shared;
using handMadeNhom7.Entities;
using handMadeNhom7.Services.Interfaces;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace handMadeNhom7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : APIControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService, ILogger<CartController> logger) : base(logger)
        {
            _cartService = cartService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            try
            {
                var cart = _cartService.GetAll();
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            };
        }
        [HttpGet("get-all-with-page")]
        public IActionResult GetAllWithPage([FromQuery] FilterDto input)
        {
            return Ok(_cartService.GetAllWithPage(input));
        }
        [HttpGet("get-cart-by-id/{id}")]
        public IActionResult GetById([FromQuery] int id)
        {
            try
            {
                Cart cart = _cartService.GetbyId(id);
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPost("create")]
        public IActionResult CreateCart(CreateCartDto input)
        {
            try
            {
                _cartService.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                _cartService.Delete(id);
                return Ok(_cartService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
        [HttpDelete("delete-all/{customerId}")]
        public IActionResult DeleteAll(int customerId)
        {
            try
            {
                _cartService.DeleteAll(customerId);
                return Ok(_cartService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
        [HttpDelete("delete-all-full")]
        public IActionResult DeleteAllFull()
        {
            try
            {
                _cartService.DeleteAllFull();
                return Ok(_cartService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
    }
}
