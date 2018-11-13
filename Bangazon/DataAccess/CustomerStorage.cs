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

        public IEnumerable<Customers> GetAllCustomers()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<Customers>(@"SELECT * 
                                                   FROM Customers c
                                                   JOIN Products p on p.CustomerId = c.Id
                                                   JOIN CustomersPaymentTypes cpt on cpt.CustomerId = c.Id
                                                   JOIN PaymentTypes pt on pt.Id = cpt.PaymentTypeId");


                return result.ToList();
            }
        }
    }
}
