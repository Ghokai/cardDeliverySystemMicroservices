using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using orderService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orderService.DBContext
{
    public class OrderDBContext:DbContext
    {
        public DbSet<Order> orders{ get; set; }
        public DbSet<UserAddressInfo> useraddressinfos { get; set; }
        private string connStr = "";
        public OrderDBContext(IConfiguration configuration)
        {
            connStr=configuration.GetConnectionString("PostgreSqlConnectionStr");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(connStr);
    }
}
//"Host=localhost;Database=CardDeliveryDB;Username=postgres;Password=password"
