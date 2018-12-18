using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.Models
{
    public class Customers
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool ActiveOrder { get; set; }
        public List<Products> Products { get; set; } = new List<Products>();
        public List<PaymentTypes> PaymentTypes { get; set; } = new List<PaymentTypes>();        
    }
}
