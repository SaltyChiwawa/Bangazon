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
    public class DepartmentsController : ControllerBase
    {
        private readonly DepartmentStorage _storage;

        public DepartmentsController(IConfiguration config)
        {
            _storage = new DepartmentStorage(config);
        }

        [HttpGet]
        public IActionResult ReadAll([FromQuery(Name = "includes")] string employees)
        {
            if (employees == "employees")
            {
                return Ok(_storage.GetAllDepartmentsWithEmployees());
            }
            return Ok(_storage.GetAllDepartments());
        }

        [HttpGet("{id}")]
        public IActionResult Read(int id)
        {
            var successfulRead = _storage.ReadDepartment(id);
            if (successfulRead != null)
            {
                return Ok(_storage.ReadDepartment(id));
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Departments dpt)
        {
            return Ok(_storage.PostDepartment(dpt));
        }
    }
}