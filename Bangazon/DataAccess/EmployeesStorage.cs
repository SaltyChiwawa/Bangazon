using Bangazon.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class EmployeesStorage 
    {
        private readonly string ConnectionString;

        public EmployeesStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public List<Employees> GetAllEmployees()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<Employees>(@"select E.id as 'Employee ID', E.FirstName +' '+  E.LastName as 'Employee Name', D.Name as 'Department Name', C.id as 'Computer Id'
                                                          from Employees E
                                                          join Departments D on E.DepartmentId = D.id
                                                          join Computers C on E.id = C.EmployeeId");
                return result.ToList();
            }
        }


        // API functions go here, use ConnectionString for new SqlConnection

    }
}
