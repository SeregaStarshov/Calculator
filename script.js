let money, income, addExpenses, deposit, mission, period;
let budgetDay;

money = 25000;
income = 'Фриланс';
addExpenses = 'интернет, коммуналка, проезд, продукты';
deposit = false;
mission = 5e6;
period = 7;

money = +prompt('Ваш месячный доход', '25000');
if(money === 0 || isNaN(money)) {
    alert('Видимо вы в поисках работы');
}

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
    if(addExpenses === null || Number(addExpenses)) {
        alert('Введите корректное значение');
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
    }

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов', 'продукты');
let amount1 = +prompt('Во сколько это обойдется?', '7500');
let expenses2 = prompt('Введите обязательную статью расходов', 'коммуналка');
let amount2 = +prompt('Во сколько это обойдется?', '5500');
let accumulatedMonth = getAccumulatedMonth();

budgetDay = Math.floor(money / 30 - getExpensesMonth() / 30);

function getStatusIncome() {
    if(budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if(budgetDay >= 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if(budgetDay < 600 && budgetDay > 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return('Что то пошло не так');
    }
}
console.log(getStatusIncome());


function getExpensesMonth() {
    return amount1 + amount2;
}
console.log(getExpensesMonth());


function getAccumulatedMonth() {
    return money - getExpensesMonth();
}
console.log(getAccumulatedMonth());

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}
console.log(getTargetMonth());

function showTypeOf(item) {
    console.log(item, typeof(item));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(addExpenses.length);
console.log(`Период равен ${getTargetMonth()} месяцев и Цель заработать ${mission} рублей`);
console.log(addExpenses.toLocaleLowerCase());
console.log(addExpenses.split(', '));
console.log(budgetDay);