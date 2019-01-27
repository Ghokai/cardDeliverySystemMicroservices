using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using orderService.DBContext;
using orderService.Models;
using Microsoft.EntityFrameworkCore;
using orderService.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderService.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private IOrderRepository _repo = null;
        private const string cnst_userKey = "authUser";

        public OrdersController(IOrderRepository repo)
        {
            _repo = repo;
           
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var user = (User)this.HttpContext.Items[cnst_userKey];
            var orders = _repo.GetAllOrders(user);

            return Json(orders);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = (User)this.HttpContext.Items[cnst_userKey];
            var order = _repo.GetOrder(user,id);

            return Json(order);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Order newOrder)
        {
            var user = (User)this.HttpContext.Items[cnst_userKey];
            _repo.AddOrder(user, newOrder);

            return Ok();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Order updatedOrder)
        {
            var user = (User)this.HttpContext.Items[cnst_userKey];
            _repo.UpdateOrder(user, id, updatedOrder);

            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = (User)this.HttpContext.Items[cnst_userKey];
            _repo.DeleteOrder(user, id);

            return Ok();
        }
    }
}
