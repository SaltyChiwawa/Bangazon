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
    public class TrainingProgramStorage
    {
        private readonly string ConnectionString;

        public TrainingProgramStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<TrainingPrograms> GetAllTrainingPrograms()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<TrainingPrograms>(@"select * from TrainingPrograms");

                return result.ToList();
            }
        }
    }
}
