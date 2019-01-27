using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using orderService.Models;
using orderService.DBContext;
using Microsoft.EntityFrameworkCore;

namespace orderService.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private OrderDBContext _odbc = null;

        public OrderRepository(OrderDBContext dbcontext)
        {
            this._odbc = dbcontext;
        }

        private void CheckAddressForUser(string userphone,int userAddressId)
        {
            var userAdress = _odbc.useraddressinfos.Where(a => a.userphone == userphone && a.id == userAddressId).FirstOrDefault();
            if (userAdress == null)
            {
                throw new Exception("Invalid Address for User!");
            }
            else if (!userAdress.isactive)
            {
                throw new Exception("Address is not active!");
            }
        }

        public void AddOrder(User user, Order newOrder)
        {
            if(newOrder.cardid<=0 || newOrder.deliveryid <= 0 || newOrder.useraddressid <= 0)
            {
                throw new Exception("Incorrect Input Values!");
            }

            CheckAddressForUser(user.phone,newOrder.useraddressid);

            newOrder.id = 0;
            newOrder.userphone = user.phone;

            _odbc.orders.Add(newOrder);
            _odbc.SaveChanges();
        }

        public void DeleteOrder(User user, int id)
        {
            var existingOrder = _odbc.orders.Where(o => o.userphone == user.phone && o.id == id).FirstOrDefault();
            if(existingOrder == null)
            {
                throw new Exception("Order not found!");
            }
            _odbc.Remove(existingOrder);
            _odbc.SaveChanges();
        }

        public List<Order> GetAllOrders(User user)
        {
            var orders = _odbc.orders.Where(o => o.userphone == user.phone).ToList();
            return orders;
        }

        public Order GetOrder(User user, int id)
        {
            var order = _odbc.orders.Where(o => o.userphone == user.phone && o.id == id).FirstOrDefault();
            if (order == null)
            {
                throw new Exception("Order not found!");
            }
            return order;
        }

        public void UpdateOrder(User user, int id, Order newOrder)
        {
            var existingOrder = _odbc.orders.Where(o => o.userphone == user.phone && o.id == id).FirstOrDefault();
            if (existingOrder == null)
            {
                throw new Exception("Order not found!");
            }

            if (newOrder.cardid > 0) existingOrder.cardid = newOrder.cardid;
            if (newOrder.useraddressid > 0)
            {
                var userAdress = _odbc.useraddressinfos.Where(a => a.userphone == user.phone && a.id == newOrder.useraddressid).FirstOrDefault();

                CheckAddressForUser(user.phone, newOrder.useraddressid);

                existingOrder.useraddressid = newOrder.useraddressid;
            }
            if (newOrder.deliveryid > 0) existingOrder.deliveryid = newOrder.deliveryid;
            //_odbc.Entry(existingOrder).CurrentValues.SetValues(updatedOrder);
            _odbc.Entry(existingOrder).State = EntityState.Modified;
            _odbc.SaveChanges();
        }
    }
}
