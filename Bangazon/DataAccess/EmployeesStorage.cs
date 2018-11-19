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

        //Getting Employees Detail
        public List<EmployeeDetails> GetAllEmployees()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<EmployeeDetails>(@"select E.id as 'EmployeeID', E.FirstName +' '+  E.LastName as 'EmployeeName', D.Name as 'DepartmentName', C.id as 'ComputerId'
                                                          from Employees E
                                                          join Departments D on E.DepartmentId = D.id
                                                          join Computers C on E.id = C.EmployeeId");
                return result.ToList();
            }
        }

        //  //Getting single Employee Details
        public List<EmployeeDetails> GetSingleEmployee(int EmployeeId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();
                
                var result = db.Query<EmployeeDetails>(@"select E.Id as 'EmployeeID', E.FirstName +' '+  E.LastName as 'EmployeeName', D.Name as 'DepartmentName', C.id as 'ComputerId'
                                                          from Employees E
                                                          join Departments D on E.DepartmentId = D.id
                                                          join Computers C on E.id = C.EmployeeId
                                                          where EmployeeId = @Id", new {Id = EmployeeId });

                return result.ToList();
            }
        }

        public bool AddNewEmployee(Employees employee)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();


                var result = db.Execute(@"INSERT INTO [dbo].[Employees]
                                         ([FirstName],[LastName]) 
                                         VALUES ( @FirstName, @LastName)", employee);
                return result == 1;
            }

        }



        // API functions go here, use ConnectionString for new SqlConnection

    }
}
