using handMadeNhom7.Dto.Customers;
using handMadeNhom7.Entities;
using handMadeNhom7.Dto.Shared;
using handMadeNhom7.Exceptions;
using handMadeNhom7.Services.Interfaces;

namespace handMadeNhom7.Services.Implements
{
    public class CustomerService : ICustomerService
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        public CustomerService(ILogger<CustomerService> logger, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _dbContext = dbContext;
        }
        public List<Customer> GetAll()
        {
            var listStudent = from customer in _dbContext.Customers
                              select new Customer
                              {
                                  Id = customer.Id,
                                  ProductName = customer.ProductName,
                                  ProductImage = customer.ProductImage,
                                  Price = customer.Price,
                                  ProductDescription = customer.ProductDescription,
                                  Brand = customer.Brand,
                                  Category = customer.Category
                              };
            return listStudent.ToList();


        }
        public PageResultDto<List<Customer>> GetAllWithPage(FilterDto input)
        {
            var customerQuery = _dbContext.Customers.AsQueryable();
            if (input.Keyword != null)
            {
                customerQuery = customerQuery.Where(s => s.ProductName != null &&
                s.ProductName.Contains(input.Keyword));
            }
            int totalItem = customerQuery.Count();
            customerQuery = customerQuery.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);

            return new PageResultDto<List<Customer>>
            {
                Items = customerQuery.ToList(),
                TotalItem = totalItem,
            };
        }
        public Customer GetbyId(int id)
        {
            var student = _dbContext.Customers.FirstOrDefault((p) => p.Id == id);
            return student;
        }
        public void Create(CreateCustomerDto input)
        {
            _dbContext.Customers.Add(new Customer
            {
                ProductImage = input.ProductImage,
                Price = input.Price,
                ProductName = input.ProductName,
                ProductDescription = input.ProductDescription,
                Brand = input.Brand,
                Category = input.Category
            });
            _dbContext.SaveChanges();
        }
        public void Update(UpdateCustomerDto input)
        {
            var customer = _dbContext.Customers.FirstOrDefault(p => p.Id == input.Id);
            if (customer != null)
            {
                //  customer.ProductImage = input.ProductImage;
                customer.Price = input.Price;
                customer.ProductName = input.ProductName;
                customer.ProductDescription = input.ProductDescription;

            }
            _dbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            var customer = _dbContext.Customers.FirstOrDefault((p) => p.Id == id);
            if (customer != null)
            {
                _dbContext.Customers.Remove(customer);
            }
            _dbContext.SaveChanges();
        }
    }
}
