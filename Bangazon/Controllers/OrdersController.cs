using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bangazon.DataAccess;
using Bangazon.Models;
using Microsoft.Extensions.Configuration;

namespace Bangazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrdersStorage _orders;

        public OrdersController(IConfiguration config)
        {
            _orders = new OrdersStorage(config);
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            return Ok(_orders.GetAllOrders());
        }
    }
}