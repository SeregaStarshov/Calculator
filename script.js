
let money, income, addExpenses, deposit, mission, period;
let budgetDay;
let expenses = [];

income = 'Фриланс';
addExpenses = 'интернет, коммуналка, проезд, продукты';
deposit = false;
mission = 5e6;
// period = 7;

//доход за месяц===============================================================
let start = function() {
    money = prompt('Ваш месячный доход', '25000');
    while (!isNumber(money)) {
        money = prompt('Ваш месячный доход', '25000');
    }
};
start();

//возможные расходы=============================================================
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
    if(addExpenses === null || Number(addExpenses)) {
        alert('Введите корректное значение');
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
    }

//наличие депозита===============================================================
deposit = confirm('Есть ли у вас депозит в банке?');

//обязательные расходы в месяц====================================================
function getExpensesMonth() {
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', 'продукты');
        let amount = prompt('Во сколько это обойдется?', '7500');
        
        while (isNaN(parseFloat(amount))) {
            amount = prompt('Во сколько это обойдется?', '7500');
        }
        sum += +amount;
    }

    return sum;
}

let expensesAmount = getExpensesMonth();
console.log(`Расходы за месяц: ${expensesAmount}`);
console.log(expenses);

//свободные денежные средства в месяц=============================================
function getAccumulatedMonth() {
    return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();
console.log(`Свободные денежные средства: ${accumulatedMonth}`);


//чистый дневной доход==========================================================
budgetDay = Math.floor(money / 30 - expensesAmount / 30);
console.log(`Чистый дневной доход: ${budgetDay}`);

//время, за которое можно накопить нужную сумму===================================
function getTargetMonth() {
    
    return Math.ceil(mission / accumulatedMonth);
}
period = getTargetMonth();
if (period < 0) {
    console.log(`Цель в ${mission} не будет достигнута.`);
} else {
    console.log(`Цель в ${mission} будет достигнута`);
}

//уровень дохода=================================================================
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




function showTypeOf(item) {
    console.log(item, typeof(item));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Период равен ${period} месяцев и цель достигнуть ${mission} рублей`);
console.log(addExpenses.length);
console.log(addExpenses.toLocaleLowerCase());
console.log(addExpenses.split(', '));

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}