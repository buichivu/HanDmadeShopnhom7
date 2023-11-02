namespace handMadeNhom7.Dto.Customers
{
    public class CreateOrderDto
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string Delivery { get; set; }
        public int DeliveryPrice { get; set; }
        public string Discount { get; set; }
        public int DiscountPrice { get; set; }
        public int FinalPrice { get; set; }
        public string ProductImage { get; set; }

        public string Status { get; set; }
    }
}
