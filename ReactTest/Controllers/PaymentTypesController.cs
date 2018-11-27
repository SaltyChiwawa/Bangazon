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
    public class PaymentTypesController : ControllerBase
    {
        private readonly PaymentTypesStorage _storage;

        public PaymentTypesController(IConfiguration config)
        {
            _storage = new PaymentTypesStorage(config);
        }

        [HttpGet]
        public IActionResult GetSales()
        {
            return Ok(_storage.GetPayementTypes());
        }

        [HttpGet("{id}")]
        public IActionResult GetSinglePaymetType(int id)
        {
            return Ok(_storage.GetSinglePaymentType(id));
        }

        [HttpPost("paymenttype")]
        public IActionResult AddNewPaymentType(PaymentTypes paymentType)
        {
            return Ok(_storage.AddPaymentType(paymentType));
        }

        [HttpPut("paymentType")]
        public IActionResult UpdatePaymentType(PaymentTypes paymentType)
        {
            return Ok(_storage.UpdatePaymentType(paymentType));
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePaymentType(int id)
        {
            var paymentType = _storage.GetSinglePaymentType(id);

            if (paymentType == null)
            {
                return NotFound();
            }

            var success = _storage.DeleteById(id);

            if(success)
            {
                return Ok(new { Message = "Deleting was successful" });
            }

            return BadRequest(new { Message = "Deleting was unsuccessful" });
        }
    }
}