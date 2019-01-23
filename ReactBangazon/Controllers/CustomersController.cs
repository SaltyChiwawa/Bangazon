﻿using System;
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

        [HttpGet]
        public IActionResult GetAllCustomers([FromQuery(Name = "includes")] string queryOne, [FromQuery(Name = "q")] string queryTwo)
        {
            var customers = _storage.GetAllCustomers();
             var products = _storage.GetProducts();
             var paymentTypes = _storage.GetPaymentTypes();

            if (queryOne != null)
            {
                var queryParameters = queryOne.Split(',');

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
                }

                if (queryParameters.Contains("payments"))
                {
                    foreach (var c in customers)
                    {
                        foreach (var cpt in paymentTypes)
                        {
                            if (cpt.CustomerId == c.FirebaseId)
                            {
                                c.PaymentTypes.Add(cpt);
                            }
                        }
                    }
                }
                return Ok(customers.ToList());
            }

            if (queryTwo != null)
            {
                return Ok(_storage.QueryOnCustomers(queryTwo));
            }

            var returnObject = new List<ExpandoObject>();

            foreach (var customer in customers)
            {
                dynamic obj = new ExpandoObject();
                obj.id = customer.Id;
                obj.firstName = customer.FirstName;
                obj.lastName = customer.LastName;
                returnObject.Add(obj);
            }
            return Ok(returnObject);
        }

        [HttpGet("{id}")]
        public IActionResult GetCustomerById(int CustomerId)
        {
            return Ok(_storage.GetCustomerById(CustomerId));
        }

        [HttpPost]
        public IActionResult AddCustomer(Customers customer)
        {
            return Ok(_storage.AddCustomer(customer));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            return Ok(_storage.DeleteCustomerById(id));
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(Customers customer, int Id)
        {
            return Ok(_storage.UpdateCustomer(customer, Id));
        }
    }
}