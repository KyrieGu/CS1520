// Looging something on the console
var person = {
    name: 'Tianrun',
    age: 22
};
//Dot notation
person.name = 'boy';
//Bracket Notation
person['name'] = 'Gu';

function greet(name){
    console.log('Hello ' + name);
}

function square(number){
    return number * number;
}


greet('Kyrie');

let number = square(2);
console.log(number); 
