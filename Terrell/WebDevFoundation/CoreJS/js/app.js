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

const people = ['Terrell', 'Topaz', 'Niamh', 'Urdak'];

const filtered = people.filter(p => p.substring(0,1) === 'T');

const filtering = people.filter(function(p){
    return p.substring(0,1) === 'T';
})

console.log(filtered);
console.log(filtering);