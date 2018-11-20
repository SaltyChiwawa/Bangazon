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

        [HttpGet]
        public IActionResult GetAllOrderLines()
        {
            return Ok(_orderLines.GetAllOrderLines());
        }
    }
}