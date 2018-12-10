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
                var successfulRead = _storage.GetAllDepartmentsWithEmployees();
                if (successfulRead != null)
                {
                    return Ok(successfulRead);
                }
                return BadRequest();
            }
            var successfulReadWithoutDepartments = _storage.GetAllDepartments();
            if (successfulReadWithoutDepartments != null)
            {
                return Ok(successfulReadWithoutDepartments);
            }
            return BadRequest();
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
            var successfulCreate = _storage.PostDepartment(dpt);
            if (successfulCreate)
            {
                return Ok(successfulCreate);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] Departments dpt)
        {
            var validPut = _storage.ReadDepartment(dpt.Id);
            if (validPut != null)
            {
                return Ok(_storage.UpdateDepartment(dpt));
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validDelete = _storage.ReadDepartment(id);
            if (validDelete != null)
            {
                return Ok(_storage.DeleteDepartment(id));
            }
            return BadRequest();
        }
    }
}