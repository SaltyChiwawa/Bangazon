﻿using System;
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
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesStorage _storage;

        public EmployeesController(IConfiguration config)
        {
            _storage = new EmployeesStorage(config);
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_storage.GetAllEmployees());
        }

        [HttpGet ("{id}")]
        public IActionResult GetSingleEmployee(int Id)
        {
            return Ok(_storage.GetSingleEmployee(Id));
        }

        [HttpPost]
        public IActionResult AddNewEmployee(Employees employee)
        {
            return Ok(_storage.AddNewEmployee(employee));
        }

        [HttpPut ("{id}")]
        public IActionResult UpdateEmployee(Employees employee)
        {
            return Ok(_storage.UpdateEmployee(employee));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                var employeeExists = _storage.GetSingleEmployee(id);
                
                if(employeeExists != null)
                {
                    return Ok(_storage.DeleteEmployee(id));
                }
                return NotFound();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}