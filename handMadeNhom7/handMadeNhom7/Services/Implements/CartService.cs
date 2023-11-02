using handMadeNhom7.Dto.Cart;
using handMadeNhom7.Entities;
using Microsoft.AspNetCore.Cors.Infrastructure;
using handMadeNhom7.Dto.Shared;
using handMadeNhom7.Services.Interfaces;

namespace handMadeNhom7.Services.Implements
{
    public class CartService : ICartService
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        public CartService(ILogger<CartService> logger, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _dbContext = dbContext;
        }
        public List<Cart> GetAll()
        {
            var listCart = from cart in _dbContext.Carts
                           select new Cart
                           {
                               Id = cart.Id,
                               CustomerId = cart.CustomerId,
                               ProductName = cart.ProductName,
                               ProductImage = cart.ProductImage,
                               Price = cart.Price,
                               ProductDescription = cart.ProductDescription,
                               Quantity = cart.Quantity,
                           };
            return listCart.ToList();
        }
        public PageResultDto<List<Cart>> GetAllWithPage(FilterDto input)
        {
            var cartQuery = _dbContext.Carts.AsQueryable();
            if (input.IdKeyWord != 0)
            {
                cartQuery = cartQuery.Where(s =>
                s.CustomerId == input.IdKeyWord);
            }
            int totalItem = cartQuery.Count();
            cartQuery = cartQuery.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);

            return new PageResultDto<List<Cart>>
            {
                Items = cartQuery.ToList(),
                TotalItem = totalItem,
            };
        }
        public Cart GetbyId(int id)
        {
            var cart = _dbContext.Carts.FirstOrDefault((p) => p.Id == id);
            return cart;
        }
        public void Create(CreateCartDto input)
        {
            _dbContext.Carts.Add(new Cart
            {
                CustomerId = input.CustomerId,
                ProductImage = input.ProductImage,
                Price = input.Price,
                ProductName = input.ProductName,
                ProductDescription = input.ProductDescription,
                Quantity = input.Quantity

            });
            _dbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            var cart = _dbContext.Carts.FirstOrDefault((p) => p.Id == id);
            if (cart != null)
            {
                _dbContext.Carts.Remove(cart);
            }
            _dbContext.SaveChanges();
        }
        public void DeleteAll(int id)
        {
            var rows = from o in _dbContext.Carts.Where(s => s.CustomerId == id) select o;
            foreach (var row in rows)
            {
                _dbContext.Carts.Remove(row);
            }
            _dbContext.SaveChanges();
        }
        public void DeleteAllFull()
        {
            var rows = from o in _dbContext.Carts select o;
            foreach (var row in rows)
            {
                _dbContext.Carts.Remove(row);
            }
            _dbContext.SaveChanges();
        }
    }

}
