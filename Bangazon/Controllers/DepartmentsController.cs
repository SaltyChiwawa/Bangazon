using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon.DataAccess;
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
        public IActionResult ReadAll()
        {
            return Ok(_storage.GetAllDepartments());
        }
    }
}