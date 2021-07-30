let money, income, addExpenses, deposit, mission, period;
let budgetDay;

// alert('Home work');
// console.log('Hello my friend');

money = 25000;
income = 'Фриланс';
addExpenses = 'интернет, коммуналка, проезд, продукты';
deposit = false;
mission = 5e6;
period = 7;
budgetDay = Math.round(money / 30);

console.log(money);
console.log(income);
console.log(deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и Цель заработать ${mission} рублей`);
console.log(addExpenses.toLocaleLowerCase());
console.log(addExpenses.split(', '));
console.log(budgetDay);