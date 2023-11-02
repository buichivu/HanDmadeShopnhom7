using handMadeNhom7.Dto.Cart;
using handMadeNhom7.Entities;
using handMadeNhom7.Dto.Shared;

namespace handMadeNhom7.Services.Interfaces
{
    public interface ICartService
    {
        void Create(CreateCartDto input);
        void Delete(int id);

        void DeleteAll(int id);
        void DeleteAllFull();
        List<Cart> GetAll();
        PageResultDto<List<Cart>> GetAllWithPage(FilterDto input);
        Cart GetbyId(int id);
    }
}
