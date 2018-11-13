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

        [HttpGet]
        public List<Products> GetAll()
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                List<Products> Products = new List<Products>();

                var result = connection.Query<Products>(@"select *
                                                        from Products");
                return result.ToList();
            }
        }

    }
}
