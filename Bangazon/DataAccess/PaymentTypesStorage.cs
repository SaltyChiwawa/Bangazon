using Bangazon.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class PaymentTypesStorage
    {
        private readonly string ConnectionString;

        public PaymentTypesStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // Getting ListofPayment Types
        public List<PaymentTypes> GetPayementTypes()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<PaymentTypes>(@"select Name, ID from PaymentTypes");

                return result.ToList();

            }
        }

        // Getting singlePaymentType
        public List<PaymentTypes> GetSinglePaymentType(int Id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();
                var result = db.Query<PaymentTypes>(@"Select Name, id from PaymentTypes
                                                  where Id = @Id", new { Id = Id });
                return result.ToList();
            }
        }

           

        // API functions go here, use ConnectionString for new SqlConnection

    }

  
}
