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

money = +prompt('Ваш месячный доход', '');
if(money === 0 || isNaN(money)) {
    alert('Видимо вы в поисках работы');
}

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
console.log(typeof addExpenses);
    if(addExpenses === null || Number(addExpenses)) {
        alert('Введите корректное значение');
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
    }

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов', '');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов', '');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = amount1 + amount2;

period = Math.ceil(mission / (money - budgetMonth));
budgetDay = Math.floor(money / 30 - budgetMonth / 30);



console.log(money);
console.log(income);
console.log(deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и Цель заработать ${mission} рублей`);
console.log(addExpenses.toLocaleLowerCase());
console.log(addExpenses.split(', '));
console.log(budgetDay);
console.log(budgetMonth);
console.log(period);

if(budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if(budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if(budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}
