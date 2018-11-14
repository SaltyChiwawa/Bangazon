using Bangazon.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class CustomerStorage
    {
        static List<Customers> _customers = new List<Customers>();
        private readonly string ConnectionString;

        public CustomerStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<Products> GetProducts()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var products = db.Query<Products>(@"SELECT *
                                                  FROM Products p
                                                  JOIN Customers c ON c.id = p.CustomerId");

                return products.ToList();
            }
        }

        public List<PaymentTypes> GetPaymentTypes()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var paymentTypes = db.Query<PaymentTypes>(@"SELECT 
	                                                          cpt.CustomerId,
	                                                          pt.Id,
	                                                          pt.Name
                                                            FROM CustomersPaymentTypes cpt
                                                            JOIN PaymentTypes pt ON pt.Id = cpt.PaymentTypeId");
                return paymentTypes.ToList();
            }
        }

        public List<Customers> GetAllCustomers()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<Customers>(@"SELECT * 
                                                   FROM Customers");

               
                return result.ToList();
            }
        }


    }
}
