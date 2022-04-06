// `use strict`;

/*
The 9 Commandments:

1. `use strict` everywhere. Everywhere.
2. DO NOT use var. Default to const. Use let when necessary.
3. Default to any style guides. If none, use camelCase for variables, functions, etc., and PascalCase for classes. 
4. Use IFFEs whenever it /makes sense/. They almost always make sense.
5. JS Magic&trade; is to be seen and played with, not practiced. Sloppy mode off. Question old standards.
6. Use a separate file for JS files.
7. ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
8. No assumptions. Be on the defense.
9. have fun you sloppy bastard

*/

// function strictFunc(){
//     `use strict`;
//     console.log('This is a strict function!');
// }

// (function(strictiffe){
//     `use strict`;
//     console.log('This is a strict IFFE!');
// })

// let y = 1;

// console.log(y);

// let x = 2;

// console.log(x+y);

// x -= y;

// x += 4;

// console.log(x);

// y += 1;

// y *= x;

// console.log(y);


// let isFalse = false;

// console.log(isFalse);
// console.log(!isFalse);

// let greet1 = 'Hello!';
// let greet2 = 'World!';

// console.log(`My message for you: ${greet1} ${greet2}`)

// let date1 = new Date();

// console.log(date1);

// const people = ['Terrell', 'Topaz', 'Niamh', 'Powdered Toast Man'];


// people.push('Monkee');

// console.log(people[4]);

// const lastPerson = people.pop();

// console.log(people);

// console.log(lastPerson);

// console.log(lastPerson.startsWith('M'));

// const coolPeople = people.filter(function(person){
//     return person.startsWith('T')
// })

// console.log(coolPeople);

// console.log(lastPerson.substring(1,4));

// const firstLetters = people.map(function(person){
//     return person.substring(0,1);
// });

// console.log(firstLetters);

// const firstName = 'Tor El';
// const lastName = 'Turner';

// if (firstName === 'Terrell' && lastName === 'Turner') {
//     console.log('Hello, sir.')
// } else if(firstName === 'Terrell'){
//     console.log('Cool name.')
// } else if(lastName === 'Turner'){
//     console.log('My long lost relative...?');
// }
// else{
//     console.log('Greetings.')
// };

// if (firstName === 'Terrell' || lastName === 'Turner'){
//     console.log('I like your name!');
// };

//  const day = 'Monday';

//  switch (day.toLowerCase()) {
//      case 'monday':
//          console.log('Looks like it\'s Monday.')
//          break;
//      case 'tuesday':
//          console.log('I guess it\'s Tuesday.');
//          break;
//      case 'wednesday':
//          console.log('It\'s Wednesday...');
//          break;
//      case 'thursday':
//          console.log("Thursday, almost Friday!");
//          break;
//      case 'friday':
//          console.log('FRIDAYYYYY!!! WHOOPEEEEE!!!!');
//          break;
//      default:
//          console.log('Not sure what day that is.');
//          break;
//  }
// const repeat = 5;
// const width = 8;
// const character = '$';

// for (let r = 0; r < repeat; r++) {
//     for (let c = character; c.length < width; c+= character) {
//         console.log(c);
//             if (c.length === width - 1) {
//                 for (let d = c.length - 1; d > 1; d--) {
//                     console.log(c.substring(0, d));
//                 }
//         }
//     }
// }

// const people = ['Maryssa', 'Tiridus', 'Niamh', 'Urdak'];

// const filtered = people.filter(p => p.substring(0,1) === 'T');

// const filtering = people.filter(function(p){
//     return p.substring(0,1) === 'T';
// })

// console.log('Whose room is the most lived in, but not dirty?');
// console.log(filtered);
// console.log('Who\'s the most likely to square off against the devil himself?');
// console.log(filtering);

// const filtwo = people.filter(p => p.substring(0,1) === 'U');

// console.log('Who\'s the class pet?');
// console.log(filtwo);

// const filthree = people.filter(function(p){
//     return p.substring(0,1) === 'N';
// })

// console.log('Who is fucked up beyond understanding?');
// console.log(filthree);

// const filfour = people.filter(p => p.substring(0,1) === 'N' || p.substring(0,1) === 'U');

// console.log('Who is most likely to snap under extreme stress?');
// console.log(filfour);

// const person = {
//     firstName: 'Terrell',
//     lastName: 'Turner',
//     address: {
//         city: 'Minneapolis',
//         state: 'Minnesota'
//     },
//     age: 30,
//     fullName: function(){
//         // console.log(this);
//         return `${this.firstName} ${this.lastName}`;
//     }
// };

// person.address.country = 'USA';

// console.log(person.fullName());

// function greetUser(p){
//     console.log(`Hello, ${p.fullName()}`);
// }

// greetUser(person);

// const {firstName:fName, age, address: {city}} = person;
// console.log(fName);

// for (const prop in person){
//     console.log(person[prop]);
// };

// delete person.fullName;

// console.log(person.fullName);

// const receivedInfo = JSON.stringify(person);

// console.log(receivedInfo);

// const parsedData = JSON.parse(receivedInfo)

// console.log(parsedData.age);

// class Character{

//     #social = '';

//     constructor(fn, ln){
//         this.firstName = fn;
//         this.lastName = ln;
//     }

//     getFullName(){
//         return `${this.firstName} ${this.lastName}`; 
//     }

//     // getFullName = () => `${this.firstName} ${this.lastName}`;
    
//     get ssn(){
//         return `***-**-${this.#social.substring(this.#social.length - 4)}`;
//     }
//     set ssn(social){
//         this.#social = social;
//     }
// }

// const character1 = new Character("Mad Dog", "Maryssa");
// const character2 = new Character('Tiridus', 'Greyfellow');
// const character3 = new Character('Niamh', '');
// const character4 = new Character('Urdak', '');

// character1.ssn = '123-56-7809';

// console.log(character1.ssn);
// console.log(character2.getFullName());

//IIFE
//Immediately Invoking Function Expression

// const fullName = `Terrell Turner`;

// (function(saturn){
//     saturn.greetUser = function() {
//         console.log('Hello, user.');
//     }
// })(window.saturn = window.saturn || {});

// (function(saturn){
//     saturn.helloUser = function(){
//         console.log('YO!!!');
//     }
    
// })(window.saturn = window.saturn || {});

// saturn.greetUser();
// saturn.helloUser();

// (function(mars, fullName){
//     mars.fullName = fullName;
//     mars.helloUser = function(){
//         console.log(`Hello ${mars.fullName}`);
//     }

//     mars.Person = new class{
//         constructor(firstName, lastName){
//             this.firstName = firstName;
//             this.lastName = lastName;
//         }
//     }
// })(window.mars = window.mars || {}, fullName);

// mars.helloUser();

// (function(app) {
//     app.greetingUser = function() {
//         console.log('Hello!');
//     };
    
//     app.Person = new class{
//         constructor(firstName, lastName){
//             this.firstName = firstName;
//             this.lastName = lastName;
//         }
//     }
// })(window.app = window.app || {});

// app.greetingUser();

///var is function scoped
///let, const block scoped

// var a = 4;

// var a = 5;

// var a = 6;

// console.log(a);

// function test(){
//     let a = 1;
//     console.log(a);
// }

// test();

// if (true) {
//     let a = 5;
//     console.log(a);
// }

// console.log(a);