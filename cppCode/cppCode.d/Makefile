main: main.o Person.o
	clang++  main.o Person.o -o main  
main.o: main.cpp Person.h
	clang++ -c main.cpp  
Person.o: Person.cpp Person.h
	clang++ -c Person.cpp  
