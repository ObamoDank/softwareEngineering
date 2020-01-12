# Program will read the contents of an excel spreadsheet and write to an SQLite Database

import sqlite3
import openpyxl

connection = sqlite3.connect("product.db")
cursor = connection.cursor()
rule = "".maketrans("'", " ")

# Storing and executing SQL commands to create database tables for execution later
dropItem = "DROP Table IF EXISTS item"
dropReview = "DROP Table IF EXISTS review"

createItem = """
CREATE TABLE item(
asin CHAR(10) PRIMARY KEY,
brand VARCHAR(20) NOT NULL,
title VARCHAR(150) NOT NULL,
url VARCHAR(150) NOT NULL,
image VARCHAR(150) NOT NULL,
rating NUMBER(2) NOT NULL,
reviewUrl VARCHAR(150),
totalReviews NUMBER(5),
prices VARCHAR(20)
)
"""
createReview = """
CREATE TABLE review(
reviewID INTEGER PRIMARY KEY,
asin CHAR(10),
name VARCHAR(50),
rating NUMBER(1) NOT NULL,
dates DATE,
verified BOOLEAN,
title VARCHAR(150),
body varchar(1000),
helpfulVotes NUMBER(3),
FOREIGN KEY (asin) REFERENCES item(asin)
)
"""
cursor.execute(dropItem)
cursor.execute(dropReview)
cursor.execute(createItem)
cursor.execute(createReview)

# Loading up the data from the Excel Spread sheets

wbItem = openpyxl.load_workbook("items.xlsx")
wbReview = openpyxl.load_workbook("reviews.xlsx")
itemSheet = wbItem["20190928-items"]
reviewSheet = wbReview["20190928-reviews"]

# Putting Data into a workable format - This is what I will be mostly working with to complete the task

items = itemSheet.rows
reviews = reviewSheet.rows

# Storing SQL commands to update the database

insertItem = """
INSERT INTO item VALUES ('{asin}', '{brand}', '{title}', '{url}', '{image}', {rating}, '{reviewUrl}', {totalReviews}, '{prices}')
"""
insertReview = """
INSERT INTO review VALUES (NULL, '{asin}', '{name}', {rating}, '{date}', {verified}, '{title}', '{body}', {helpfulVotes})
"""

#Loops through each row in the items and review spreadsheets and stores all information within SQLite database
for i in items:
    if i[0].value != 'asin':
        sqlCommand = insertItem.format(asin=i[0].value, brand=i[1].value, title=str(i[2].value).translate(rule), url=i[3].value, image=i[4].value, rating=i[5].value, reviewUrl=i[6].value, totalReviews=i[7].value, prices=i[8].value)
        cursor.execute(sqlCommand)
        
for i in reviews:
    if i[0].value != 'asin':
        if i[7].value != None:
            sqlCommand = insertReview.format(asin=i[0].value, name=str(i[1].value).translate(rule), rating=i[2].value, date=i[3].value, verified=i[4].value, title=str(i[5].value).translate(rule), body=str(i[6].value).translate(rule), helpfulVotes=i[7].value)
            print(sqlCommand)
        else:
            sqlCommand = insertReview.format(asin=i[0].value, name=str(i[1].value).translate(rule), rating=i[2].value, date=i[3].value, verified=i[4].value, title=str(i[5].value).translate(rule), body=str(i[6].value).translate(rule), helpfulVotes=0)
        print(sqlCommand)
        cursor.execute(sqlCommand)

connection.commit()
connection.close()