using System;
using Dapper;
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
    public class ProductTypesController : ControllerBase
    {
        private readonly ProductTypesStorage _storage;

        public ProductTypesController(IConfiguration config)
        {
            _storage = new ProductTypesStorage(config);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_storage.GetAllProductTypes());
        }

        [HttpGet("{id}")]
        public IActionResult GetProductType(int id)
        {
            return Ok(_storage.GetProductType(id));
        }

        [HttpPut("{id}/{category}")]
        public IActionResult UpdateProductType(int id, string category)
        {
            return Ok(_storage.PutProductType(id, category));
        }

        [HttpPost("{category}")]
        public IActionResult CreateProductType(string category)
        {
            return Ok(_storage.PostProductType(category));
        }
    }
}