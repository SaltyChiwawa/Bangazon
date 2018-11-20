using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon.Models;
using System.Data.SqlClient;
using Dapper;

namespace Bangazon.DataAccess
{
    public class OrderLinesStorage
    {
        private readonly string ConnectionString;

        public OrderLinesStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<OrderLines> GetAllOrderLines()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<OrderLines>(@"select * from OrderLines");
                return result.ToList();
            }
        }
    }
}
