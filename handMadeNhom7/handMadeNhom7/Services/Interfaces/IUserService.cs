using handMadeNhom7.Entities;
using handMadeNhom7.Dto.User;

namespace handMadeNhom7.Services.Interfaces
{
    public interface IUserService
    {
        void Create(CreateUserDto input);
        List<UserPriceDto> GetAll();
        User GetbyId(int id);
        string Login(LoginDto input);
        void Update(UpdateUserDto input);
        void UpdateUser(User input);
        void DeleteUser(int id);
    }
}
