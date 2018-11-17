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

                var result = connection.Query<Orders>(@"select * from Orders");
                return result.ToList();
            }
        }
        public List<Orders> GetSingleOrder(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = connection.Query<Orders>(@"select * from Orders where Orders.Id = @id", new {id});
                return result.ToList();
            }
        }
        public bool DeleteOrder(int orderId)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                int result = connection.Execute(@"delete from Orders where Orders.Id = @id", new { id = orderId});
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
        }
    }
}
