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
        public bool PostOrder(int customerId)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                int result = connection.Execute(@"Insert into Orders(Orders.CustomerId, Orders.PaymentTypeId)Select CustomersPaymentTypes.CustomerId, CustomersPaymentTypes.PaymentTypeId From CustomersPaymentTypes where CustomersPaymentTypes.CustomerId = @id", new { id = customerId });

                if (result > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public List<Orders> GetFullOrder()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {

                var orders = connection.Query<Orders>(@"select * from Orders");
                var orderLines = connection.Query<OrderLines>(@"select * from OrderLines");

                foreach (var x in orders)
                {
                    foreach (var orderLine in orderLines)
                    {
                        if (orderLine.OrderId == x.Id)
                        {
                            x.Products.Add(orderLine);
                        }
                    }
                }
                return orders.ToList();
            }         
        }

    }
}
