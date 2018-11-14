ALTER TABLE [dbo].[Computers] DROP CONSTRAINT [FK__Computers__Emplo__4E88ABD4]

ALTER TABLE [dbo].[Computers]  WITH CHECK ADD  CONSTRAINT [FK__Computers__Emplo__4E88ABD4] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employees] ([Id])
ON DELETE SET NULL
GO

-- CustomerPayments --- Two Foreign Keys
ALTER TABLE [dbo].[CustomersPaymentTypes] DROP CONSTRAINT [FK__Customers__Custo__5441852A]

ALTER TABLE [dbo].[CustomersPaymentTypes]  WITH CHECK ADD  CONSTRAINT [FK__Customers__Custo__5441852A] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([Id])
ON DELETE SET NULL


ALTER TABLE [dbo].[CustomersPaymentTypes] CHECK CONSTRAINT [FK__Customers__Payme__5535A963]

ALTER TABLE [dbo].[CustomersPaymentTypes]  WITH CHECK ADD  CONSTRAINT [FK__Customers__Payme__5535A963] FOREIGN KEY([PaymentTypeId])
REFERENCES [dbo].[PaymentTypes] ([Id])
ON DELETE SET NULL
GO

--- Departments ---
ALTER TABLE [dbo].[Departments] DROP CONSTRAINT [FK__Departmen__Super__4D94879B]
GO

ALTER TABLE [dbo].[Departments]  WITH CHECK ADD  CONSTRAINT [FK__Departmen__Super__4D94879B] FOREIGN KEY([SupervisorId])
REFERENCES [dbo].[Employees] ([Id])
ON DELETE SET NULL
GO

--- Employees ---
ALTER TABLE [dbo].[Employees] DROP CONSTRAINT [FK__Employees__Depar__4CA06362]
GO

ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK__Employees__Depar__4CA06362] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([Id])
ON DELETE SET NULL
GO

--- EmployeesTrainingProgram Two FORIEGIN KEYS ---
ALTER TABLE [dbo].[EmployeesTrainingPrograms] DROP CONSTRAINT [FK__Employees__Emplo__4F7CD00D]
GO

ALTER TABLE [dbo].[EmployeesTrainingPrograms]  WITH CHECK ADD  CONSTRAINT [FK__Employees__Emplo__4F7CD00D] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employees] ([Id])
ON DELETE SET NULL
GO

ALTER TABLE [dbo].[EmployeesTrainingPrograms] CHECK CONSTRAINT [FK__Employees__Train__5070F446]
GO

ALTER TABLE [dbo].[EmployeesTrainingPrograms]  WITH CHECK ADD  CONSTRAINT [FK__Employees__Train__5070F446] FOREIGN KEY([TrainingProgramId])
REFERENCES [dbo].[TrainingPrograms] ([Id])
ON DELETE SET NULL
GO

--- ORDERLINES TWO FOREIGN KEYS ---
ALTER TABLE [dbo].[OrderLines] DROP CONSTRAINT [FK__OrderLine__Order__571DF1D5]
GO

ALTER TABLE [dbo].[OrderLines]  WITH CHECK ADD  CONSTRAINT [FK__OrderLine__Order__571DF1D5] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([Id])
ON DELETE SET NULL
GO

ALTER TABLE [dbo].[OrderLines] DROP CONSTRAINT [FK__OrderLine__Produ__5812160E]
GO

ALTER TABLE [dbo].[OrderLines]  WITH CHECK ADD  CONSTRAINT [FK__OrderLine__Produ__5812160E] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
ON DELETE SET NULL
GO

---ORDRES TWO FOREIGN KEYS---

ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK__Orders__Customer__534D60F1]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__Customer__534D60F1] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([Id])
ON DELETE SET NULL
GO

ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK__Orders__PaymentT__5629CD9C]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__PaymentT__5629CD9C] FOREIGN KEY([PaymentTypeId])
REFERENCES [dbo].[PaymentTypes] ([Id])
ON DELETE SET NULL
GO

--- PRODUCTS TWO FOREIGN KEYS ---
ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK__Products__Custom__52593CB8]
GO

ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK__Products__Custom__52593CB8] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([Id])
ON DELETE SET NULL
GO

ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK__Products__Produc__5165187F]
GO

ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK__Products__Produc__5165187F] FOREIGN KEY([ProductTypeId])
REFERENCES [dbo].[ProductTypes] ([Id])
ON DELETE SET NULL
GO




















