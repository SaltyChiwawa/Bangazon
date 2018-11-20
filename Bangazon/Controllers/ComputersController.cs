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
    public class ComputersController : ControllerBase
    {
        private readonly ComputerStorage _storage;

        public ComputersController(IConfiguration config)
        {
            _storage = new ComputerStorage(config);
        }


        [HttpGet]
        public IActionResult GetAllComputers ()
        {
            return Ok(_storage.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleComputer(int id)
        {
            return Ok(_storage.GetSingle(id));
        }

        [HttpPost]
        public void AddNewComputer([FromBody] Computers computer)
        {
            _storage.AddComputer(computer);
        }
    
        

    }
}