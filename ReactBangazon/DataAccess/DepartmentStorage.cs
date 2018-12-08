using Bangazon.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class DepartmentStorage
    {
        private readonly string ConnectionString;

        public DepartmentStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<Departments> GetAllDepartments()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<Departments>(@"select * from Departments");

                return result.ToList();
            }
        }

        public List<Departments> GetAllDepartmentsWithEmployees()
        {
            try
            {
                using (var db = new SqlConnection(ConnectionString))
                {
                    db.Open();

                    var departments = db.Query<Departments>(@"select * from Departments");

                    var employees = db.Query<Employees>(@"select * from Employees");

                    foreach (var dpt in departments)
                    {
                        foreach (var employee in employees)
                        {
                            if (employee.DepartmentId == dpt.Id)
                            {
                                dpt.Employees.Add(employee);
                            }
                        }
                    }

                    return departments.ToList();
                }
            }
            catch
            {
                return null;
            }
            
        }

        public Departments ReadDepartment(int departmentId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                try
                {
                    var department = db.QueryFirst<Departments>(@"select * from Departments
where Departments.Id = @id", new { id = departmentId });

                    var employees = db.Query<Employees>(@"select * from Employees where Employees.DepartmentId = @id", new { id = departmentId });

                    foreach (var employee in employees)
                    {
                        department.Employees.Add(employee);
                    }

                    return department;
                }
                catch
                {
                    return null;
                }


            }
        }

        public bool PostDepartment(Departments dpt)
        {
            try
            {
                using (var db = new SqlConnection(ConnectionString))
                {
                    db.Open();

                    var result = db.Execute(@"INSERT INTO [dbo].[Departments]
           ([SupervisorId]
           ,[Name])
     VALUES
           (@SupervisorId, @Name)", dpt);

                    return result == 1;
                }
            }
            catch
            {
                return false;
            }
            
        }

        public bool DeleteDepartment(int id)
        {
            try
            {
                using (var db = new SqlConnection(ConnectionString))
                {
                    db.Open();

                    var result = db.Execute(@"delete from Departments
where Id = @id", new { id });

                    return result == 1;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
