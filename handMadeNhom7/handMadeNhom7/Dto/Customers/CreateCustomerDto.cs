using System.ComponentModel.DataAnnotations;

namespace handMadeNhom7.Dto.Customers
{
    public class CreateCustomerDto
    {
        public string ProductImage { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public string ProductDescription { get; set; }
        public int Category { get; set; }
        public string Brand { get; set; }

    }
}
