using Bangazon.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class ProductsStorage
    {
        private readonly string ConnectionString;

        public ProductsStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<Products> GetAll()
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Products>(@"select *
                                                        from Products");
                return result.ToList();
            }
        }

        public List<Products> GetSingle(int id)
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Products>(@"select *
                                                        from Products
                                                        where Id = @id", new { Id = id });

                return result.ToList();

            }
        }

    }
}
