using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.Models
{
    public class Departments
    {
        public int Id { get; set; }
        public int SupervisorId { get; set; }
        public string Name { get; set; }
        public List<Employees> Employees = new List<Employees>();
    }
}
