from person import *

Dale = Person('Dale', 'Dale', '14/07/1995', 24)
Kurtis = Person('Kale', 'Kurtis', '12/09/1882', 28)
Teags = Person('Teags', 'Nerman', '29/02/1982', 39)

people = []
people.append(Dale)
people.append(Kurtis)
people.append(Teags)

for i in people:
    print(i._name + ' ' + i._first_name + ' ' + i._date_of_birth + ' ' + str(i._age))
