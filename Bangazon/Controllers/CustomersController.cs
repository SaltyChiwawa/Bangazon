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
        public IActionResult GetAllCustomers([FromQuery] Products product, string payment)
        {
            var customers = _storage.GetAllCustomers();
            var products = _storage.GetProducts();

            foreach (var customer in customers)
            {
                foreach (var p in products)
                {
                    if (p.CustomerId == customer.Id)
                    {
                        customer.Products.Add(p);
                    }
                }
            }

            if (product != null)
            {
                var customersWithProducts = customers.Where(customer => customer.Products.Contains(product));
            }


             return Ok(customers.ToList());

        }
    }
}