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

        public bool Add(Customers customer)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"INSERT INTO [dbo].[Customers]([Id])
                                        VALUES (@Id)", customer);

                return result == 1;
            }
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public IEnumerable<Customers> GetAllCustomers()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<Customers>("SELECT * FROM Customers");

                return result.ToList();
            }
        }
    }
}
