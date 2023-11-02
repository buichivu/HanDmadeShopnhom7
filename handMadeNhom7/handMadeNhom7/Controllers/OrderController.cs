using handMadeNhom7.Dto.Customers;
using handMadeNhom7.Dto.Shared;
using handMadeNhom7.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace handMadeNhom7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : APIControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService, ILogger<OrderController> logger) : base(logger)
        {
            _orderService = orderService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            try
            {
                var orders = _orderService.GetAll();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            };
        }
        [HttpGet("get-all-with-page")]
        public IActionResult GetAllWithPage([FromQuery] FilterDto input)
        {
            return Ok(_orderService.GetAllWithPage(input));
        }
        [HttpPost("create")]
        public IActionResult CreateOrder(CreateOrderDto input)
        {
            try
            {
                _orderService.Create(input);
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
                _orderService.Delete(id);
                return Ok(_orderService);
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
                _orderService.DeleteAllFull();
                return Ok(_orderService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
    }

}
