using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.Models
{
    public class PaymentTypes
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CustomerId { get; set; }
    }
}
