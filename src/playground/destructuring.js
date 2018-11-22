// const person = {
//     name: 'Andrew',
//     age: 99,
//     location: {
//         city: 'SLC',
//         temp: 53
//     }
// };

// // const name = person.name;
// // const age = person.age;

// const { name: n = 'Anon', age } = person;

// console.log(`${n} is ${age}.`);



// const { city, temp: t } = person.location;

// if (person.location.city && person.location.temp){
//     console.log(`It's ${t} in ${city}.`)
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin',
//         year: '2003'
//     }
// }
// const { name: publisherName = 'Self-Published'} = book.publisher
// console.log(publisherName);


///ARRAY

const address = ['1299 S Juniper St.', 'Philadelphia', 'Pennsylvania', '19147'];

const [ , city, state = 'Nowhere'] = address;

console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (hot)','$2.00','$2.50','$2.75']; 

const [itemSale, smallP, medP, largeP] = item;
console.log(itemSale);








