using Microsoft.AspNetCore.Mvc;

namespace handMadeNhom7.Dto.Shared
{
    public class FilterDto
    {
        [FromQuery(Name = "pageSize")]
        public int PageSize { get; set; }
        [FromQuery(Name = "pageIndex")]
        public int PageIndex { get; set; }
        private string _keyword;
        [FromQuery(Name = "keyword")]
        public string Keyword
        {
            get => _keyword;
            set => _keyword = value?.Trim();
        }
        public int IdKeyWord { get; set; }
    }
}
