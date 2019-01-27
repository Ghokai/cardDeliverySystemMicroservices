using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using orderService.Models;

namespace orderService.Controllers
{
    [Produces("application/json")]
    [Route("api/whoami")]
    public class whoamiController : Controller
    {
        // GET: api/whoami
        [HttpGet]
        public IActionResult Get()
        {
            var user = (User)this.HttpContext.Items["tokenUser"];
            return Json(user);
        }
    }
      
}
