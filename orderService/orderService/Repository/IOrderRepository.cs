using orderService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orderService.Repository
{
    public interface IOrderRepository
    {
        List<Order> GetAllOrders(User user);
        Order GetOrder(User user, int id);
        void AddOrder(User user, Order newOrder);
        void UpdateOrder(User user, int id,Order newOrder);
        void DeleteOrder(User user, int id);
    }
}
