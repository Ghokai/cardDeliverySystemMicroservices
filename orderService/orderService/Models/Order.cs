using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orderService.Models
{
    public class Order
    {
        public int id { get; set; }
        public string userphone { get; set; }
        public int useraddressid { get; set; }
        public int cardid { get; set; }
        public int deliveryid { get; set; }

        public Order()
        {

        }
    }
}
