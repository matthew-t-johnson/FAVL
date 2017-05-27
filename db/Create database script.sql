USE [favl]
GO
/****** Object:  Table [dbo].[Admins]    Script Date: 5/27/2017 4:03:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admins](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[PasswordHash] [nvarchar](100) NOT NULL,
	[PasswordSalt] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
/****** Object:  Table [dbo].[Books]    Script Date: 5/27/2017 4:03:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[AuthorFirst] [nvarchar](100) NOT NULL,
	[AuthorMiddle] [nvarchar](100) NOT NULL,
	[AuthorLast] [nvarchar](100) NOT NULL,
	[LibraryID] [int] NOT NULL,
	[Barcode] [varchar](50) NOT NULL,
	[CheckedOutTo] [int] NULL,
	[TotalCheckouts] [int] NOT NULL,
	[CheckedOutDate] [datetime2](0) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
/****** Object:  Table [dbo].[CheckOuts]    Script Date: 5/27/2017 4:03:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckOuts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BookID] [int] NOT NULL,
	[ReaderID] [int] NOT NULL,
	[LibraryID] [int] NOT NULL,
	[CheckOutDate] [datetime2](0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
/****** Object:  Table [dbo].[CheckOutsByDay]    Script Date: 5/27/2017 4:03:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckOutsByDay](
	[Day] [datetime2](0) NOT NULL,
	[LibraryID] [int] NOT NULL,
	[CheckOuts] [int] NOT NULL,
 CONSTRAINT [PK_CheckOutsByDay] PRIMARY KEY CLUSTERED 
(
	[Day] ASC,
	[LibraryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
/****** Object:  Table [dbo].[Librarians]    Script Date: 5/27/2017 4:03:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Librarians](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[PasswordHash] [nvarchar](100) NOT NULL,
	[PasswordSalt] [nvarchar](100) NOT NULL,
	[IsAdmin] [bit] NOT NULL,
	[Barcode] [varchar](50) NOT NULL,
	[LibraryID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
/****** Object:  Table [dbo].[Libraries]    Script Date: 5/27/2017 4:03:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Libraries](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Village] [nvarchar](100) NOT NULL,
	[Country] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
/****** Object:  Table [dbo].[Readers]    Script Date: 5/27/2017 4:03:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Readers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[MiddleName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Barcode] [varchar](50) NULL,
	[TotalCheckouts] [int] NOT NULL,
	[LibraryID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
ALTER TABLE [dbo].[Books] ADD  DEFAULT ('') FOR [AuthorFirst]
GO
ALTER TABLE [dbo].[Books] ADD  DEFAULT ('') FOR [AuthorMiddle]
GO
ALTER TABLE [dbo].[Books] ADD  DEFAULT ('') FOR [AuthorLast]
GO
ALTER TABLE [dbo].[Books] ADD  DEFAULT ((0)) FOR [TotalCheckouts]
GO
ALTER TABLE [dbo].[Librarians] ADD  DEFAULT ((0)) FOR [IsAdmin]
GO
ALTER TABLE [dbo].[Readers] ADD  DEFAULT ('') FOR [FirstName]
GO
ALTER TABLE [dbo].[Readers] ADD  DEFAULT ('') FOR [MiddleName]
GO
ALTER TABLE [dbo].[Readers] ADD  DEFAULT ('') FOR [LastName]
GO
ALTER TABLE [dbo].[Readers] ADD  DEFAULT ((0)) FOR [TotalCheckouts]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_Books_Libraries] FOREIGN KEY([LibraryID])
REFERENCES [dbo].[Libraries] ([Id])
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_Books_Libraries]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_Books_Readers] FOREIGN KEY([CheckedOutTo])
REFERENCES [dbo].[Readers] ([Id])
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_Books_Readers]
GO
ALTER TABLE [dbo].[Librarians]  WITH CHECK ADD  CONSTRAINT [FK_Librarians_Libraries] FOREIGN KEY([LibraryID])
REFERENCES [dbo].[Libraries] ([Id])
GO
ALTER TABLE [dbo].[Librarians] CHECK CONSTRAINT [FK_Librarians_Libraries]
GO
ALTER TABLE [dbo].[Readers]  WITH CHECK ADD  CONSTRAINT [FK_Readers_Libraries] FOREIGN KEY([LibraryID])
REFERENCES [dbo].[Libraries] ([Id])
GO
ALTER TABLE [dbo].[Readers] CHECK CONSTRAINT [FK_Readers_Libraries]
GO
/****** Object:  StoredProcedure [dbo].[UpdateCheckOutsByDay]    Script Date: 5/27/2017 4:03:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCheckOutsByDay]
	@dayEnd datetime2(0)
AS

declare @dayBegin DateTime2(0) = dateadd(day, -1, @dayEnd)

insert into CheckOutsByDay

select @dayEnd as [Day], LibraryID, count(*) as CheckOuts
from CheckOuts where CheckOutDate >= @dayBegin and CheckOutDate < @dayEnd group by LibraryID

RETURN 0
GO
