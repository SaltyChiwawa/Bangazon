using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.Models
{
    public class OrderLines
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
    }
}
