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
        [HttpGet("{id}")]
        public IActionResult GetSingleOrder(int id)
        {
            return Ok(_orders.GetSingleOrder(id));
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteSingleOrder(int id)
        {
           var order = _orders.GetSingleOrder(id);

           if (order == null)
            {
                return NotFound();
            }
           var success = _orders.DeleteOrder(id);

           if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was a Complete Failure" });

        }
        [HttpPost("{id}/new")]
        public IActionResult PostOrder(int id)
        {
            var success = _orders.PostOrder(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Post was a Complete Failure" });
        }
        [HttpGet("fullorder")]
        public IActionResult GetFullOrders()
        {
            return Ok(_orders.GetFullOrder());
        }

        [HttpGet("fullorder/{id}")]
        public IActionResult GetFullSingleOrders(int id)
        {
            return Ok(_orders.GetSingleFullOrder(id));
        }
    }
}