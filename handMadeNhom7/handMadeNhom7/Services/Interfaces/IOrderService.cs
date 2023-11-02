using handMadeNhom7.Entities;
using handMadeNhom7.Dto.Customers;
using handMadeNhom7.Dto.Shared;

namespace handMadeNhom7.Services.Interfaces
{
    public interface IOrderService
    {
        void Create(CreateOrderDto input);
        void Delete(int id);
        void DeleteAllFull();
        List<Order> GetAll();
        PageResultDto<List<Order>> GetAllWithPage(FilterDto input);
    }
}
