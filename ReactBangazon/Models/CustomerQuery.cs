using Bangazon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBangazon.Models
{
    public class CustomerQuery
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Products> Products = new List<Products>();
        public List<PaymentTypes> PaymentTypes = new List<PaymentTypes>();
    }
}
