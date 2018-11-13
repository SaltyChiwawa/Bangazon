using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon.DataAccess;
using Bangazon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Bangazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerStorage _storage;

        public CustomersController(IConfiguration config)
        {
            _storage = new CustomerStorage(config);
        }

        [HttpGet("customers")]
        public IActionResult GetAllCustomers([FromQuery] string products, string payments)
        {
            /*var customers = _storage.GetAllCustomers();
            if (products != null)
            {
                return customers.Where(customer => customer.Products.ContainsKey(product)).ToList();
            }*/

            return Ok(_storage.GetAllCustomers());
        }
    }
}