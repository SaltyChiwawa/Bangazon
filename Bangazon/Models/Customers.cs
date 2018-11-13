using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.Models
{
    public class Customers
    {
        public int Id { get; set; }
        public List<Products> Products { get; set; }
    }
}
