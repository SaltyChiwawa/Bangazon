USE [NewBangazon]
GO

/****** Object:  Table [dbo].[Departments]    Script Date: 11/13/2018 8:52:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Departments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SupervisorId] [int] NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK__Departme__3214EC0734E35052] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


ALTER TABLE [dbo].[Departments]  WITH CHECK ADD  CONSTRAINT [FK__Departmen__Super__4D94879B] FOREIGN KEY([SupervisorId])
REFERENCES [dbo].[Employees] ([Id])
GO

ALTER TABLE [dbo].[Departments] CHECK CONSTRAINT [FK__Departmen__Super__4D94879B]
GO