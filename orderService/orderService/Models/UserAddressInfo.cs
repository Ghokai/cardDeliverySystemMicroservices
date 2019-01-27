using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orderService.Models
{
    public class UserAddressInfo
    {
        public int id { get; set; }
        public string userphone { get; set; }
        public string addresstype { get; set; }
        public string addressdescription { get; set; }
        public bool isactive { get; set; }

        public UserAddressInfo()
        {

        }
    }
}
