using Bangazon.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class ComputerStorage
    {
        private readonly string ConnectionString;

        public ComputerStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<Computers> GetAll()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Computers>(@"select Employees.FirstName, Employees.LastName, Computers.EmployeeId, Computers.Id
                                                            from Employees
                                                            join Computers
	                                                            on Employees.Id = Computers.EmployeeId
	                                                        where Employees.Id = Computers.EmployeeId");

                return result.ToList();
            }
        }

        public List<Computers> GetSingle(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Computers>(@"select *
                                                            from Computers
                                                            Where Id = @id", new { id });

                return result.ToList();
            }
        }

        public void AddComputer(Computers computer)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Execute(@"insert into  
                                                    Computers (EmployeeId)
                                                    values (@EmployeeId)", new { EmployeeId = computer.EmployeeId });
            }
        }

        public void UpdateComputer(Computers computer)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                connection.Execute(@"update computers
                                        set EmployeeId = @EmployeeId
                                        where Id = @id", computer);
            }
        }

        public void DeleteComputer(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                connection.Execute(@"delete
                                        from Computers
                                        where Id = @id", new { id });
            }
        }
    }
}
