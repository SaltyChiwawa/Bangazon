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

                var paymentTypes = db.Query<PaymentTypes>(@"SELECT *
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
                                                   FROM Customers c
                                                   JOIN CustomersPaymentTypes cpt ON c.Id = cpt.CustomerId
                                                   JOIN PaymentTypes pt ON cpt.PaymentTypeId = pt.Id
                                                   JOIN Products p ON c.Id = p.CustomerId");


                return result.ToList();
            }
        }

        public List<Customers> QueryOnCustomers(string q)
        {
            var customers = GetAllCustomers();

            var results =
                from c in customers
                where c.FirstName.Contains(q) || c.LastName.Contains(q) || c.PaymentTypes.Any(a => a.Name.Contains(q)) || c.Products.Any(a => a.Title.Contains(q))
                select c;

            return results.ToList();
        }

        public bool AddCustomer(Customers customer)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"INSERT 
                                          INTO [dbo].[Customers]
                                          ([FirstName]) VALUES (@FirstName)", customer);

                return result == 1;
            }
        }
    }
}
