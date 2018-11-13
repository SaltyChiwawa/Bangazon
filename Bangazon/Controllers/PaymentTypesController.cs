using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Bangazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypesController : ControllerBase
    {
        private readonly PaymentTypesStorage _storage;

        public PaymentTypesController(IConfiguration config)
        {
            _storage = new PaymentTypesStorage(config);
        }

        [HttpGet]
        public IActionResult GetSales()
        {
            return Ok(_storage.GetPayementTypes());
        }

    }
}