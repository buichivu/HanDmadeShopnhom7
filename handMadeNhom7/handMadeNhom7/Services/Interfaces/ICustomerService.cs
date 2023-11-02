using handMadeNhom7.Dto.Customers;
using handMadeNhom7.Entities;
using handMadeNhom7.Dto.Shared;

namespace handMadeNhom7.Services.Interfaces
{
    public interface ICustomerService
    {
        void Create(CreateCustomerDto input);
        void Delete(int id);
        List<Customer> GetAll();
        PageResultDto<List<Customer>> GetAllWithPage(FilterDto input);
        Customer GetbyId(int id);
        void Update(UpdateCustomerDto input);
    }
}
