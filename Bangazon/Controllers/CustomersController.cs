using System;
using System.Collections.Generic;
using System.Dynamic;
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
        public IActionResult GetAllCustomers([FromQuery(Name="includes")] string includes)
        {
            var customers = _storage.GetAllCustomers();
            var products = _storage.GetProducts();           

            if (includes != null)
            {
                var queryParameters = includes.Split(',');

                if (queryParameters.Contains("products"))
                {
                    foreach (var c in customers)
                    {
                        foreach (var p in products)
                        {
                            if (p.CustomerId == c.Id)
                            {
                                c.Products.Add(p);
                            }
                        }
                    }


                    return Ok(customers.ToList());
                }
            }
            var returnObject = new List<ExpandoObject>();

            foreach (var customer in customers)
            {
                dynamic obj = new ExpandoObject();
                obj.Id = customer.Id;
                obj.FirstName = customer.FirstName;
                obj.LastName = customer.LastName;
                obj.ActiveOrder = customer.ActiveOrder;
                returnObject.Add(obj);
            }
            return Ok(returnObject);

        }
    }
}