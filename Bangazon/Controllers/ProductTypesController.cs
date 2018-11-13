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

        public IActionResult GetAll()
        {
            return Ok(_storage.GetAllProductTypes());
        }
    }
}