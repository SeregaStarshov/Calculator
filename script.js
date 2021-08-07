
//доход за месяц===============================================================
let money, 
    start = function() {
        money = prompt('Ваш месячный доход', '25000');
            if(money === null) {
                return;
            } else if(!isNumber(money)) {
                alert('Некорректное значение, попробуйте снова.');
                start();
            }
            money = Number(money);
};
start();



let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 5e6,
    period: 7,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
                while (itemIncome === null || Number(itemIncome) || itemIncome.trim() === '') {
                    itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
                }
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '13000');
                while (!isNumber(cashIncome)) {
                    cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '13000');
                }
            this.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');

            while(addExpenses === null || Number(addExpenses) || addExpenses.trim() === '') {
                alert('Введите корректное значение');
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
            }
            this.addExpenses = addExpenses.toLowerCase().split(',');

        ///здесь был депозит

        for (let i = 0; i < 2; i++) {
            let requiredExpenses = prompt('Введите обязательную статью расходов', 'продукты');//проверить
                while (requiredExpenses === null || Number(requiredExpenses) || requiredExpenses.trim() === '') {
                    requiredExpenses = prompt('Введите обязательную статью расходов', 'продукты');
                }
            let amount = prompt('Во сколько это обойдется?', '7500');

                while (!isNumber(amount)) {
                    amount = prompt('Во сколько это обойдется?', '7500');
                }

            appData.expenses[requiredExpenses] = +amount;
            
                
        }
    },
    getExpensesMonth() {
        
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
        
        return this.expensesMonth;
    },
    getBudget() {
        
        this.budgetDay = Math.floor(appData.budget / 30 - expensesAmount / 30);
        this.budgetMonth = this.budget - this.expensesMonth;
    },
    getTargetMonth() {
    
        return Math.ceil(this.mission / this.budgetMonth);
    },
    getStatusIncome() {
        
        if(this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if(this.budgetDay >= 600 && this.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if(this.budgetDay < 600 && this.budgetDay > 0) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    },
    getInfoDeposit() {
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '7.9');//проверить
                while (!isNumber(appData.percentDeposit)) {
                    appData.percentDeposit = prompt('Какой годовой процент?', '7.9');
                }
            appData.moneyDeposit = prompt('Какая сумма заложена?', '11000');//проверить
                while (!isNumber(appData.moneyDeposit)) {
                    appData.moneyDeposit = prompt('Какая сумма заложена?', '11000');
                }
        }
    },
    calcSaveMoney() {
        return this.budgetMonth * this.period;
    },
};
appData.asking();
console.log(appData);


//обязательные расходы в месяц====================================================
let expensesAmount = appData.getExpensesMonth();
console.log(`Расходы за месяц: ${expensesAmount}`);


//свободные денежные средства в месяц=============================================
let accumulatedMonth = appData.getBudget();
console.log(`Свободные денежные средства: 
- за месяц - ${appData.budgetMonth} рублей;
- за день - ${appData.budgetDay} рублей`);


let target = appData.getTargetMonth();
    if (target < 0) {
        console.log(`Цель в ${appData.mission} рублей не будет достигнута.`);
    } else {
        console.log(`Цель в ${appData.mission} рублей будет достигнута`);
    }

//чистый дневной доход==========================================================
console.log(`Чистый дневной доход: ${appData.budgetDay} рублей`);

//уровень дохода=================================================================
console.log(appData.getStatusIncome());

//====депозит=====================================================================
appData.getInfoDeposit();

//====накопления за период========================================================
console.log(appData.calcSaveMoney());

//время, за которое можно накопить нужную сумму===================================
console.log(`Период равен ${target} месяцев(а) и цель достигнуть ${appData.mission} рублей`);


//=========addExpenses=============================================================
let newArray = appData.addExpenses.map((item) => {
    let key = item.trim();
        key = key.charAt(0).toUpperCase() + key.slice(1);
        
    return key;
});
let str = newArray.join(', ');
console.log(str);


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//========================== цикл для объекта appData================================
for (let key in appData ) {
    console.log(`Наша программа включает в себя данные: ключ ${key} и значение: ${appData[key]}`);
}