using handMadeNhom7.Dto.Customers;
using handMadeNhom7.Dto.Shared;
using handMadeNhom7.Entities;
using handMadeNhom7.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace handMadeNhom7.Controllers
{

    //   [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : APIControllerBase
    {
        private readonly ICustomerService _customerService;
        public ProductController(ICustomerService customerService, ILogger<ProductController> logger) : base(logger)
        {
            _customerService = customerService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            try
            {
                var students = _customerService.GetAll();
                return Ok(students);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            };
        }
        [HttpGet("get-all-with-page")]
        public IActionResult GetAllWithPage([FromQuery] FilterDto input)
        {
            return Ok(_customerService.GetAllWithPage(input));
        }
        [HttpGet("get-product-by-id/{id}")]
        public IActionResult GetById([FromQuery] int id)
        {
            try
            {
                Customer customer = _customerService.GetbyId(id);
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPost("create")]
        public IActionResult CreateCustomer([FromBody] CreateCustomerDto input)
        {
            try
            {
                _customerService.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
        [HttpPut("update")]
        public IActionResult UpdateById([FromForm] UpdateCustomerDto input)
        {
            try
            {
                _customerService.Update(input);
                return Ok(_customerService);
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
                _customerService.Delete(id);
                return Ok(_customerService);
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
    }
}
