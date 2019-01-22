using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon.DataAccess;
using Bangazon.Models;
using ReactBangazon;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Bangazon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsStorage _storage;

        public ProductsController(IConfiguration config)
        {
            _storage = new ProductsStorage(config);
        }

        [HttpGet]
        public IActionResult GetAllProducts([FromQuery] string q)
        {
            if (q != null)
            {
                return Ok(_storage.QueryOnProducts(q));
            }

            return Ok(_storage.GetProductCards());
        }  

        [HttpGet("{id}")]
        public IActionResult GetSingleProduct(int id)
        {
            return Ok(_storage.GetSingle(id));
        }

        [HttpPost]
        public void AddProduct([FromBody] Products product)
        {
            _storage.addNewProduct(product);
        }

        [HttpPut("{id}")]
        public void UpdateProduct([FromBody] Products product, int id)
        {
            product.Id = id;
            _storage.UpdateProduct(product);
        }

        [HttpDelete("{id}")]
        public void DeleteProducts(int id)
        {
            
            _storage.DeleteProduct(id);
        }



    }
}