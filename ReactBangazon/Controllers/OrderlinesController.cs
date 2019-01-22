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
    public class OrderlinesController : ControllerBase
    {
        private readonly OrderLinesStorage _orderLines;

        public OrderlinesController(IConfiguration config)
        {
            _orderLines = new OrderLinesStorage(config);
        }
        [HttpPost]
        public void AddOrderLine([FromBody] OrderLines orderLine)
        {
            _orderLines.addNewOrderLine(orderLine);
        }
        [HttpGet]
        public IActionResult GetAllOrderLines()
        {
            return Ok(_orderLines.GetAllOrderLines());
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleOrderLine(int id)
        {
            return Ok(_orderLines.GetSingleOrderLine(id));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSingleOrderLine(int id)
        {
            var order = _orderLines.GetSingleOrderLine(id);

            if (order == null)
            {
                return NotFound();
            }
            var success = _orderLines.DeleteOrderLine(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was a Complete Failure" });
        }
    }
}