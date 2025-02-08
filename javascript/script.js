'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`Movement ${i + 1} : You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(mov)}`);
  }
}
  */

/*
console.log(`-----------------forEach-------------------`);

movements.forEach((mov, i) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1} : You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(mov)}`);
  }
});
*/

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

const currencie = new Set(['USD', 'RUPP', 'TAKA', 'DOLLER', 'RUPP', 'USD']);
// console.log(currencie);

currencie.forEach(function (value, _, set) {
  console.log(`${value} : ${value}`);
});
*/

//* map method practice
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUSD);
console.log(movementsUSD);
*/

//* For of loop
/*
let newArr = [];
for (const mov of movements) {
  newArr.push(mov * eurToUSD);
}
console.log(newArr);
*/

/*

//* Filter method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//* Deposit
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposit);

//* withdrawal
const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawal);

*/

//* Reduce method
//* Maximum value using Reduce
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);

const displayMovements = function (movments) {
  containerMovements.innerHTML = '';

  movments.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

//* Display balance calculate
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${balance}💸`;
};

calcDisplayBalance(account1.movements);

//* Add Username
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(mov => mov[0])
      .join('');
  });
};

createUsername(accounts);
