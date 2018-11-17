using Bangazon.Models;
using Microsoft.Extensions.Configuration;
using System;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class ProductTypesStorage
    {
        private readonly string ConnectionString;

        public ProductTypesStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<ProductTypes> GetAllProductTypes()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<ProductTypes>(@"select * from ProductTypes");

                return result.ToList();
            }
        }

        public List<ProductTypes> GetProductType(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<ProductTypes>(@"select * from ProductTypes where Id = @id", new {id});

                return result.ToList();
            }
        }

        public bool PutProductType(int id, string category)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"
UPDATE [dbo].[ProductTypes]
SET [Category] = @category
 WHERE Id = @id", new { id = id, category = category });

                return result == 1;
            }
        }

        public bool PostProductType(string category)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"
INSERT INTO [dbo].[ProductTypes]
           ([Category])
     VALUES
           (@category)", new { category = category});

                return result == 1;
            }

        }

    }
}
