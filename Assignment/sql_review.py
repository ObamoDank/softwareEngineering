# Program will read the contents of database and output data to console. Console will also revise data and input to a new table

import sqlite3

connection = sqlite3.connect("product.db")
cursor = connection.cursor()

# Storing and executing SQL commands to create database tables for execution later
dropSummary = "DROP TABLE IF EXISTS reviewSummary"

createSummary = """
CREATE TABLE reviewSummary(
reviewID INTEGER PRIMARY KEY,
asin CHAR(10),
title VARCHAR(20) NOT NULL,
brand VARCHAR(150) NOT NULL,
rating NUMBER(2) NOT NULL,
totalReviews NUMBER(5)
);
"""

cursor.execute(dropSummary)
cursor.execute(createSummary)

# Extract all items with at least 1 review in 2019 and print to console

phones = cursor.execute("SELECT DISTINCT i.asin, i.title, i.brand, i.rating, i.totalReviews FROM item i, review r WHERE i.asin = r.asin AND r.dates LIKE '%2019' ORDER BY i.title").fetchall()

for i in phones:
    print(i[1])

# Storing and Executing SQL command to populate new table with acquired data

insertItem = """
INSERT INTO reviewSummary VALUES (NULL, '{asin}', '{title}', '{brand}', {rating}, {totalReviews})
"""

for i in phones:
    sqlCommand = insertItem.format(asin=i[0], title=i[1], brand=i[2], rating=i[3], totalReviews=i[4])
    print(sqlCommand)
    cursor.execute(sqlCommand)

# Extract all titles and average ratings and print to console in descending order based on average rating

rating = cursor.execute("SELECT title, rating FROM reviewSummary ORDER BY rating DESC").fetchall()

print(rating)
for i in rating:
    print(i[0], ':', i[1])
    
connection.commit()
connection.close()