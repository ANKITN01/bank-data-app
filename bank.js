"use state";

const account1 = {
  owner: "Mayank Rokade",
  movements: [200, 450, -100, 200, 800, -200],
  interestRate: 1.2, //%
  pin: 1111,
};

const account2 = {
  owner: "Bhavin Pandya",
  movements: [200, 10, -100, 200, 800, -200],
  interestRate: 1.2, //%
  pin: 1111,
};

const account3 = {
  owner: "Ankit Nakhale",
  movements: [400, 450, -100, -200, 800, -200],
  interestRate: 1.2, //%
  pin: 3333,
};

const accounts = [account1, account2, account3];

const containerMovements = document.querySelector(".conatinerMovements");
const balance = document.querySelector(".balance");
const deposit_data = document.querySelector(".deposit_data");
const withdraw_data = document.querySelector(".withdraw_data");
const intrest_rate = document.querySelector(".intrest_rate");

const btn_click = document.querySelector(".btn_click");
const inputLoginUsername = document.querySelector(".username");
const inputLoginPassword = document.querySelector(".password");
const mainContent = document.querySelector(".container");
const welcome_username = document.querySelector(".navbar_brand");

//tranfer amount
const btn_transfer = document.querySelector(".btn_transfer");
const transfer_amount = document.querySelector(".transfer_amount");
const transfer_to = document.querySelector(".transfer_to");

//Loan
const btnLoan = document.querySelector(".btnLoan");
const inpLoan = document.querySelector(".inpLoan");

//Close Account
const close_user = document.querySelector(".close_user");
const close_pin = document.querySelector(".close_pin");
const btn_close = document.querySelector(".btn_close");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (value, i) {
    const type = value > 0 ? "deposit" : "withdrawl";

    const html = `<tr>
        <td><span>${i}</span><span class="${type}">${type}</span></td>
       
        <td>${value}</td>
    </tr>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayBalance = function (acc) {
  console.log(acc);
  const total_balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.total_balance = total_balance;
  balance.textContent = `${total_balance}$`;
};

const username = function (accs) {
  console.log(accs);
  accs.forEach(function (acc) {
    console.log(acc);
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
username(accounts);

const input_data = function (inn) {
  const income = inn
    .filter((mov) => mov >= 0)
    .reduce((acc, mov) => acc + mov, 0);
  deposit_data.textContent = `${income}$`;

  const output = inn
    .filter((mov) => mov <= 0)
    .reduce((acc, mov) => acc + mov, 0);
  withdraw_data.textContent = `${Math.abs(output)}$`;

  const interest = inn
    .filter((mov) => mov > 0)
    .map((mov) => (mov * 1.2) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  intrest_rate.textContent = `${interest}`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);

  displayBalance(acc);

  input_data(acc.movements);
};

let currentAccount;

btn_click.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (mov) => mov.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPassword.value)) {
    welcome_username.textContent = `Welcome back,${
      currentAccount.owner.split(" ")[0]
    }`;
    mainContent.style.opacity = 100;

    //Clear input Value
    inputLoginUsername.value = inputLoginPassword.value = "";

    updateUI(currentAccount);
  }
});

btn_transfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(transfer_amount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === transfer_to.value
  );

  if (
    amount > 0 &&
    currentAccount.total_balance >= amount &&
    receiverAcc?.username !== currentAccount.username

    // receiverAcc &&
    // receiverAcc?.username !== currentAccount.username &&
    // amount > 0 &&
    // currentAccount.totalBalance >= amount
  ) {
    console.log("hel");
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amounts = Number(inpLoan.value);

  if (
    amounts > 0 &&
    currentAccount.movements.some((mov) => mov >= amounts * 0.1)
  ) {
    currentAccount.movements.push(amounts);
    updateUI(currentAccount);
  }
  inpLoan.value = "";
});

btn_close.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === close_user.value &&
    currentAccount.pin === Number(close_pin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    console.log(index);

    //delete account
    accounts.splice(index, 1);

    mainContent.style.opacity = 0;
  }
  close_user.value = close_pin = "";
});
