export class Person {
  // 1. fields
  firstName: string;
  lastName: string;
  middleName: string;
  // calculated field fullName: string;


  // 2. properties
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  get vietnameseFullName() {
    return this.firstName + ' ' + this.middleName + ' ' + this.lastName;
  }

  // 3. functions/methods
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  getVietnameseFullName() {
    return this.firstName + ' ' + this.middleName + ' ' + this.lastName;
  }


  getFormattedFullName(delimiter: string) {
    return this.lastName + delimiter + ' ' + this.firstName;
  }

  saySomething(sentence: string) {
    console.log(sentence);
  }

  add(tienHW: number, tienLoi: number){
    return tienHW + tienLoi;
  }
}







const huyen = new Person();
const chau = new Person();

huyen.firstName = 'Huyen';
huyen.middleName = 'Thi'
huyen.lastName = 'Tran';

chau.firstName = 'Chau';
chau.middleName = 'Khac'
chau.lastName = 'Nguyen';



const tienTC = chau.add(123, 23423);




// huyen.saySomething('fds');

console.log(huyen.firstName);
console.log(huyen.lastName);
console.log(huyen.fullName);
console.log(huyen.getFullName());
console.log(huyen.getFormattedFullName(','));
console.log(huyen.saySomething('Hello everyone'));
console.log(huyen.firstName);

console.log(huyen.add(1, 7));

console.log(huyen.firstName);
console.log(huyen.middleName);
console.log(huyen.lastName);
console.log(huyen.vietnameseFullName);
console.log(huyen.getFullName());
console.log(huyen.getVietnameseFullName());
console.log(huyen.getFormattedFullName(','));
console.log(huyen.saySomething('Hello everyone'));


console.log(chau.firstName);
console.log(chau.vietnameseFullName);





console.log();
console.log();
