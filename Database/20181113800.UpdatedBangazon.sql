ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK__Orders__PaymentT__5629CD9C]

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__PaymentT__5629CD9C] FOREIGN KEY([PaymentTypeId])
REFERENCES [dbo].[PaymentTypes] ([Id])
ON DELETE SET NULL
GO