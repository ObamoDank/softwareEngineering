# Program utilises numpy and matplotlib to generate visualisation of datasets

import sqlite3
import numpy as np
import matplotlib.pyplot as plt
import re
import statistics
import numpy as np
import random

# Function takes a list of months and returns the count of each month
def sortMonth(items):
    sortedList = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0}
    for i in items:
        sortedList[i[1]] += 1
    return sortedList

# Function takes a list of months and values and returns the average value for each month
def ratingMonth(items):
    ratingList = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0}
    count = 0
    for i in ratingList:
        for j in items:
            if i == j[0]:
                count += 1
                ratingList[i] += j[1]
        ratingList[i] = round(ratingList[i] / count, 2)
        count = 0
    return ratingList
    
# Connect to SQLite Database
connection = sqlite3.connect('product.db')
cursor = connection.cursor()

# Retrieve the top 3 brands based on the sum of their total reviews
topBrandReviews = cursor.execute('SELECT brand, SUM(totalReviews) from item group by brand order by SUM(totalReviews) DESC LIMIT 3').fetchall()

# Variables store name of top 3 brands
b0 = topBrandReviews[0][0]
b1 = topBrandReviews[1][0]
b2 = topBrandReviews[2][0]

# Retrieve all required data for top brands
brandReviews = cursor.execute('SELECT brand, dates from item, review where item.asin = review.asin and brand in ("' + b0 +'", "' + b1 + '", "' + b2 + '")').fetchall()

reviewBrands = {b0: [], b1: [], b2: []}

# Retrieve the specific month for each review and send to list of corresponding brand
for i in brandReviews:
    i = list(i)
    i[1] = re.search(r'\w+', i[1]).group()[:3]
    if i[0] == b0:
        reviewBrands[b0].append(i)
    elif i[0] == b1:
        reviewBrands[b1].append(i)
    else:
        reviewBrands[b2].append(i)

# Use the sortMonths function to retrieve the count of each month for each top brand
for i in reviewBrands:
    reviewBrands[i] = sortMonth(reviewBrands[i])
    
# Create Graph using matplotlib
plt.figure(1, figsize=(10, 10))

fig, graph0 = plt.subplots()
fig.suptitle("Number of Reviews Per Month for Most Reviewed Brands")
graph0.plot(list(reviewBrands[b0].keys()), list(reviewBrands[b0].values()), '--r')
color = 'tab:red'
graph0.set_xlabel("Month")
graph0.set_ylabel("Number of Reviews for " + b0, color = color)

graph1 = graph0.twinx()
graph1.plot(list(reviewBrands[b1].keys()), list(reviewBrands[b1].values()), '--b')
graph1.plot(list(reviewBrands[b2].keys()), list(reviewBrands[b2].values()), '--g')
graph1.set_ylabel("Number of Reviews for " + b1 + ' & ' + b2)

fig.legend([b0, b1, b2])

plt.savefig('task1.png')

#First section of code will determine top 5 Brands
# Take all records between 2017 & 2019 and merge them into a single list
ratings2017 = cursor.execute('select brand, i.rating, r.dates, r.rating from item i, review r where i.asin = r.asin and dates like "%2017"').fetchall()
ratings2018 = cursor.execute('select brand, i.rating, r.dates, r.rating from item i, review r where i.asin = r.asin and dates like "%2018"').fetchall()
ratings2019 = cursor.execute('select brand, i.rating, r.dates, r.rating from item i, review r where i.asin = r.asin and dates like "%2019"').fetchall()

ratings = ratings2017 + ratings2018 + ratings2019

# Create dictionary to contain all details for each brand and populate dictionary using loop
brands = {}

for i in ratings:
    if i[0] not in brands:
        brands[i[0]] = []
    brands[i[0]].append(i[1])
        
# Calculate the average rating for each brand and sort this into top 5 values
for i in brands:
    brands[i] = statistics.mean(brands[i])
    
topStats = sorted(brands.values())[-1:-6:-1]

# Use top 5 values by discovering their corresponding brand name in dictionary

topBrands = {}

for i in topStats:
    for j in brands:
        if brands[j] == i:
            topBrands[j] = []

# Next section will extract necessary data for top 5 brands and determine the month for each item
for i in ratings:
    if i[0] in topBrands:
        mon = re.search(r'\w+', i[2]).group()[:3]
        topBrands[i[0]].append([mon, i[3]])

# Using the ratingMonth function, retrieve the average rating for each month corresponding to top 5 brands
for i in topBrands:
    topBrands[i] = ratingMonth(topBrands[i])
    
# Create New Figure for Graph
plt.figure(5) 

for i in topBrands:
    plt.plot(np.array(list(topBrands[i].keys())), np.array(list(topBrands[i].values())))
 
plt.title("Average Monthly Rating for Top 5 Brands between 2017 & 2019")
plt.xlabel("Month")
plt.ylabel("Average Rating")
plt.legend(topBrands.keys())
    
plt.savefig('task2.png')

# Retrieve the average rating and total reviews for each item in database
plotData2 = cursor.execute('select asin, rating, totalReviews from item').fetchall()

# Create location to store data

ratings = []
reviews = []
ratings1 = []
reviews1 = []
ratings2 = []
reviews2 = []
ratings3 = []
reviews3 = []

# store each rating and create numpy array from data
for i in plotData2:
    ratings.append(i[1])
    reviews.append(i[2])

ratings = np.array(ratings)
reviews = np.array(reviews)

# loop through data to create new lists which correspond to separate inputs as 4 graphs will be drawn from the same dataset
for i in range(len(reviews)):
    if reviews[i] < 100:
        reviews1.append(reviews[i])
        ratings1.append(ratings[i])
    if reviews[i] < 250:
        reviews2.append(reviews[i])
        ratings2.append(ratings[i])
    if reviews[i] < 500:
        reviews3.append(reviews[i])
        ratings3.append(ratings[i])

# Create four graphs of different scales to illustrate data
plt.figure(6)
plt.scatter(ratings1, reviews1, color = 'green', alpha = 0.07)
plt.title("Number of Reviews vs Average Rating for each Product")
plt.xlabel("Rating")
plt.ylabel("# of Reviews")
           
plt.savefig('task3a.png')


plt.figure(7)
plt.scatter(ratings2, reviews2, color = 'blue', alpha = 0.07)
plt.title("Number of Reviews vs Average Rating for each Product")
plt.xlabel("Rating")
plt.ylabel("# of Reviews")
           
plt.savefig('task3b.png')
           
plt.figure(8)
plt.scatter(ratings3, reviews3, color = 'magenta', alpha = 0.07)
plt.title("Number of Reviews vs Average Rating for each Product")
plt.xlabel("Rating")
plt.ylabel("# of Reviews")
           
plt.savefig('task3c.png')
         
plt.figure(9)
plt.scatter(ratings, reviews, color = 'black', alpha = 0.07)
plt.title("Number of Reviews vs Average Rating for each Product")
plt.xlabel("Rating")
plt.ylabel("# of Reviews")
           
plt.savefig('task3d.png')

# Retrieve Contents of all reviews including dates
plotData3 = cursor.execute('select body, dates, title from review').fetchall()

# Create for the list of years
years = []

costReviews = {}
costReviewPercentages = {}
reviewsPerYear = {}

# Extract the year corresponding to each review
for i in range(len(plotData3)):
    plotData3[i] = list(plotData3[i])
    yr = int(re.search(r'\d\d\d\d', plotData3[i][1]).group())
    if yr not in years:
        years.append(yr)
    plotData3[i][1] = yr
    
years = np.array(years)

# List of key words to search review contents
keywords = ['cost', 'price', 'value', 'money', 'dollars', 'cash', 'spend', 'bill', 'cheap', 'expensive' '$']

#  Generate a list of the count of all years along with the number of reviews per year in order to ascertain the percentage of reviews corresponding to keywords
for i in range(min(years), max(years) + 1):
    if i not in costReviews:
        costReviews[i] = 0
        costReviewPercentages[i] = 0
        reviewsPerYear[i] = 0
    for j in plotData3:
        for k in keywords:
            if re.search(k, j[0]) != None or re.search(k, j[2]) != None:
                if i == j[1]:
                    costReviews[i] += 1
                break

# count total reviews per year
for i in range(min(years), max(years) + 1):
    for j in plotData3:
        if i == j[1]:
            reviewsPerYear[i] += 1
            
# Determine percentage of reviews per year related to keywords
for i in range(min(years), max(years) + 1):
    costReviewPercentages[i] = round(costReviews[i] / reviewsPerYear[i] * 100, 2)

# Create graph
plt.figure(4)
plt.suptitle("Reviews Per Year Relating to Cost")
plt.subplot(211)
plt.plot(np.array(list(costReviews.keys())), np.array(list(costReviews.values())), '--r')
plt.ylabel('# of Reviews')
plt.subplot(212)
plt.plot(np.array(list(costReviewPercentages.keys())), np.array(list(costReviewPercentages.values())), '--m')
plt.xlabel('Year')
plt.ylabel('% of Total Reviews')

plt.savefig('task4.png')