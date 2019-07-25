class Person:
    def __init__(self, name, first_name, date_of_birth, age):
        self._name = name
        self._first_name = first_name
        self._date_of_birth = date_of_birth
        self._age = age

    def __str__(self):
        return self._first_name + ' ' + self._name