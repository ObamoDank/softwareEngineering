
#include "Person.h"

Person :: Person (string nName, string nLast_name, string nDate_of_birth, int nAge){
	name = nName;
	last_name = nLast_name;
	date_of_birth = nDate_of_birth;
	age = nAge
}

string Person::get_name(){
	return name;
}

string Person::get_lname(){
	return last_name;
}

string Person::get_dob(){
	return date_of_birth;
}

int Person::get_age(){
	return age;
}
	
Person :: ~Person ()
	{ }
