using Bangazon.Models;
using ReactBangazon.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon.DataAccess
{
    public class ProductsStorage
    {
        private readonly string ConnectionString;

        public ProductsStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        // API functions go here, use ConnectionString for new SqlConnection

        public List<Products> GetAll()
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Products>(@"
                select Products.Id, Products.Title, Products.Price, Customers.FirstName, Customers.LastName

                 from Products
                  join Customers
                  on Products.CustomerId = Customers.Id
                  ");
                return result.ToList();
            }
        }

        public List<ProductsList> GetProductCards()
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<ProductsList>(@"select TOP 20 Products.Id, Products.Title, Products.Price, Customers.FirstName, Customers.LastName

                 from Products
                  join Customers
                  on Products.CustomerId = Customers.Id");
                return result.ToList();
            }
        }

        public List<Products> GetSingle(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Products>(@"select *
                                                        from Products   
                                                        where Id = @id", new { Id = id });

                return result.ToList();

            }
        }

        public void addNewProduct( Products product)
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                connection.Execute(@"insert into 
                                    Products(Price,ProductTypeId,Title,Description,Quantity,CustomerId)
                                    values (@Price,
                                            @ProductTypeId,
                                            @Title,
                                            @Description,
                                            @Quantity,
                                            @CustomerId)", product);
            }
        }

        public void UpdateProduct(Products product)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                connection.Execute(@"update products
                                    set Price = @Price,
                                        ProductTypeId = @ProductTypeId,
                                        Title = @Title,
                                        Description = @Description,
                                        Quantity = @Quantity,
                                        CustomerId = @CustomerId 
                                    where Id = @id",  product);
            }

        }

        public void DeleteProduct(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                connection.Execute(@"delete
                                        from Products
                                        where Id = @id", new { id });
            }
        }
            

    }
}
