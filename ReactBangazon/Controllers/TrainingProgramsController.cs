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
    public class TrainingProgramsController : ControllerBase
    {
        private readonly TrainingProgramStorage _storage;

        public TrainingProgramsController(IConfiguration config)
        {
            _storage = new TrainingProgramStorage(config);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_storage.GetAllTrainingPrograms());
        }
    }
}