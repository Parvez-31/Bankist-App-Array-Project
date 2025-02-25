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
// console.log(max);

const displayMovements = function (movments) {
  containerMovements.innerHTML = '';

  movments.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//* Display balance calculate
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

//* Balance summary
const calcBalanceSummary = function (acc) {
  // Total Deposits
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  // Total Withdrawal
  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  // Total Interest

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((mov, _, arr) => {
      // console.log(arr);
      return mov >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};

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

//* PIPELINE
const eurToUSD = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

//UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcBalanceSummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => {
    return acc.userName === inputLoginUsername.value;
  });

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Clear input fields
    inputLoginUsername.value = inputClosePin.value = '';

    // updateUI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    currentAccount.userName !== receiverAcc?.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // updateUI
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    console.log(index);

    // remove acc
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

/*
//* find() method
const getFind = movements.find(mov => mov < 0);
console.log(movements);
console.log(getFind);

const getAccount = accounts.find(mov => mov.owner === 'Jessica Davis');
// console.log(getAccount);

//* same things in for of loop
for (const account of accounts) {
  // console.log(account);
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}
*/

//* findLast() method

/*
const inventory = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'fish', quantity: 1 },
  { name: 'cherries', quantity: 5 },
];

//return true inventory stock is low
// Using arrow function and destructuring
const result = inventory.findLast(({ quantity }) => quantity < 2);
console.log(result);

//Another Example
function isPrime(element) {
  if (element % 2 === 0 || element < 2) {
    return false;
  }

  for (let i = 3; i <= Math.sqrt(element); i = i + 2) {
    if (element % i === 0) {
      return false;
    }
  }
  return true;
}

console.log([4, 6, 8, 12].findLast(isPrime));
console.log([4, 5, 7, 8, 9, 11, 12].findLast(isPrime));
*/

//* findLastIndex() method
/*
const arr = [5, 12, 50, 130, 44];
const lastIndex = item => item > 45;

console.log(arr.findLastIndex(lastIndex));
*/

//* includes() method
//EQUALITY

/*
console.log(movements);

console.log(movements.includes(-200));

//CONDITION
console.log(movements.some(item => item === -130));

const anyDeposite = movements.some(item => item > 5000);
console.log(anyDeposite);
*/
