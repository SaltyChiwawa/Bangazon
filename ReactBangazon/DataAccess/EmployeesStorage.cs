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

                var result = db.Query<EmployeeDetails>(@"select E.id as 'EmployeeID', E.FirstName +' '+  E.LastName as 'EmployeeName', D.Id as 'DepartmentId', C.id as 'ComputerId'
                                                          from Employees E
                                                          left join Departments D on E.DepartmentId = D.id
                                                          left join Computers C on E.id = C.EmployeeId");
                return result.ToList();
            }
        }

       //Getting single Employee Details
        public EmployeeDetails GetSingleEmployee(int EmployeeId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();
                
                var result = db.QueryFirst<EmployeeDetails>(@"select * from Employees where Id = @Id", new {Id = EmployeeId });

                return result;
            }
        }

        //Posting single Employee Details
        public bool AddNewEmployee(Employees employee)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();


                var result = db.Execute(@"INSERT INTO [dbo].[Employees]
                                         ([FirstName],[LastName],[DepartmentId]) 
                                         VALUES ( @FirstName, @LastName,@DepartmentId)", employee);
                return result == 1;
            }

        }

        // Putt/ Updating Employee
        public bool UpdateEmployee(Employees employee)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"UPDATE [dbo].[Employees]
                                         SET DepartmentId = @DepartmentId, FirstName = @FirstName, LastName = @LastName
                                         Where [Id] = @Id", employee);


                return result == 1;
            }
        }

        // Delete Employee
        public bool DeleteEmployee(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"DELETE FROM [dbo].[Employees]
      WHERE ID = @id", new { id });

                return result == 1;
            }
        }


        // API functions go here, use ConnectionString for new SqlConnection

    }
}
