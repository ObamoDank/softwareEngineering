

#include "Person.h"

int main (){ //Person p;
	Person Dale('Dale', 'Dale', '14/07/1995', 24);
	Person Kurtis('Kale', 'Kurtis', '12/09/1882', 28);
	Person Teags('Teags', 'Nerman', '29/02/1982', 39);
	
	vector<Person> people = {Dale, Kurtis, Teags};
	
	for(int i = 0; i < 3; i++){
		cout << people[i].get_name << ' ' << people[i].get_lname << ' ' << people[i].get_dob << ' ' << people[i].get_age << ' ' <<;
}
