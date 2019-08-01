#ifndef PERSON_H
#define PERSON_H
#include <string>

using namespace std;

class Person {
	string name ;
    string last_name;
	string date_of_birth;
	int age;
	
	public : 
	Person(string nName, string nLast_name, string nDate_of_birth, int nAge);
	
	string Person::get_name();

	string Person::get_lname();

	string Person::get_dob();

	int Person::get_age();
	
	~Person();
};
#endif // PERSON_H
