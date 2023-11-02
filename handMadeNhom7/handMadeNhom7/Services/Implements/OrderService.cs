using handMadeNhom7.Entities;
using handMadeNhom7.Dto.Customers;
using handMadeNhom7.Dto.Shared;
using handMadeNhom7.Services.Interfaces;

namespace handMadeNhom7.Services.Implements
{
    public class OrderService : IOrderService
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        public OrderService(ILogger<OrderService> logger, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _dbContext = dbContext;
        }
        public List<Order> GetAll()
        {
            var listOrder = from order in _dbContext.Orders
                            select new Order
                            {
                                Id = order.Id,
                                CustomerId = order.CustomerId,
                                CustomerName = order.CustomerName,
                                PhoneNumber = order.PhoneNumber,
                                Address = order.Address,
                                ProductName = order.ProductName,
                                Quantity = order.Quantity,
                                Price = order.Price,
                                Delivery = order.Delivery,
                                DeliveryPrice = order.DeliveryPrice,
                                Discount = order.Discount,
                                DiscountPrice = order.DiscountPrice,
                                FinalPrice = order.FinalPrice,
                                ProductImage = order.ProductImage,
                                Status = order.Status,
                            };
            return listOrder.ToList();
        }
        public PageResultDto<List<Order>> GetAllWithPage(FilterDto input)
        {
            var orderQuery = _dbContext.Orders.AsQueryable();
            if (input.IdKeyWord != 0)
            {
                orderQuery = orderQuery.Where(s =>
                s.CustomerId == input.IdKeyWord);
            }
            int totalItem = orderQuery.Count();
            orderQuery = orderQuery.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);

            return new PageResultDto<List<Order>>
            {
                Items = orderQuery.ToList(),
                TotalItem = totalItem,
            };
        }
        public void Create(CreateOrderDto input)
        {

            _dbContext.Orders.Add(new Order
            {
                CustomerId = input.CustomerId,
                CustomerName = input.CustomerName,
                PhoneNumber = input.PhoneNumber,
                Address = input.Address,
                ProductName = input.ProductName,
                Quantity = input.Quantity,
                Price = input.Price,
                Delivery = input.Delivery,
                DeliveryPrice = input.DeliveryPrice,
                Discount = input.Discount,
                DiscountPrice = input.DiscountPrice,
                FinalPrice = input.FinalPrice,
                ProductImage = input.ProductImage,
                Status = input.Status,
            });
            _dbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            var order = _dbContext.Orders.FirstOrDefault((p) => p.Id == id);
            if (order != null)
            {
                _dbContext.Orders.Remove(order);
            }
            _dbContext.SaveChanges();
        }
        public void DeleteAllFull()
        {
            var rows = from o in _dbContext.Orders select o;
            foreach (var row in rows)
            {
                _dbContext.Orders.Remove(row);
            }
            _dbContext.SaveChanges();
        }
    }
}
