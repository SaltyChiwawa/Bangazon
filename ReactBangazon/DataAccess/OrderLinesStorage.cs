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
        public List<OrderLines> GetSingleOrderLine(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = connection.Query<OrderLines>(@"select * from OrderLines where OrderLines.Id = @id", new { id });
                return result.ToList();
            }
        }
        public bool DeleteOrderLine(int orderLineId)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                int result = connection.Execute(@"delete from OrderLines where OrderLines.Id = @id", new { id = orderLineId });
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
        }
    }
}
