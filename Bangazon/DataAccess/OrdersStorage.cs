using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon.Models;
using Dapper;
using System.Data.SqlClient;

namespace Bangazon.DataAccess
{
    public class OrdersStorage    {
        private readonly string ConnectionString;

        public OrdersStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<Orders> GetAllOrders()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                List<Orders> Orders = new List<Orders>();

                var result = connection.Query<Orders>(@"select * from Orders");
                return result.ToList();
            }
        }

    }
}
