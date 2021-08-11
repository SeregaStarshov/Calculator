'use strict';

//===========================получение элементов из верстки========================================================
const calculate = document.getElementById('start');
const incomeBtn = document.getElementsByTagName('button')[0];
const expensesBtn = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title[type="text"]');
//const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title[type="text"]');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const budgetMonthValue = document.querySelector('.budget_month-value');
const range = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');




let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start() {

        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSaveMoney();
        range.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcSaveMoney();
        });
    },
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesBtn.style.display = 'none';
        }
    },
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
                
            }
        });
    },
    addIncomeBlock() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeBtn);
        incomeItem = document.querySelectorAll('.income-items');

        if(incomeItem.length === 3) {
            incomeBtn.style.display = 'none';
        }
    },
    getIncome() {
        incomeItem.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth() {
        
        for (let key in this.expenses) {
            
            this.expensesMonth += +this.expenses[key];
        }
        
        return this.expensesMonth;
    },
    getBudget() {
        
        this.budgetDay = Math.floor(appData.budget / 30 - appData.expensesMonth / 30);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    },
    getTargetMonth() {
    
        return Math.ceil(targetAmount.value / this.budgetMonth);
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
            appData.percentDeposit = prompt('Какой годовой процент?', '7.9');
                while (!isNumber(appData.percentDeposit)) {
                    appData.percentDeposit = prompt('Какой годовой процент?', '7.9');
                }
            appData.moneyDeposit = prompt('Какая сумма заложена?', '11000');
                while (!isNumber(appData.moneyDeposit)) {
                    appData.moneyDeposit = prompt('Какая сумма заложена?', '11000');
                }
        }
    },
    calcSaveMoney() {
        return this.budgetMonth * range.value;
    },
};

calculate.setAttribute('disabled', 'true');
salaryAmount.addEventListener('input', () =>{
    if(salaryAmount.value.trim() === '') {
        calculate.disabled = true;
    } else {
        calculate.disabled = false;
    }
});
calculate.addEventListener('click', appData.start);
expensesBtn.addEventListener('click', appData.addExpensesBlock);
incomeBtn.addEventListener('click', appData.addIncomeBlock);
range.addEventListener('input', () => {
    periodAmount.textContent = range.value;
});



// let target = appData.getTargetMonth();
//     if (target < 0) {
//         console.log(`Цель в ${appData.mission} рублей не будет достигнута.`);
//     } else {
//         console.log(`Цель в ${appData.mission} рублей будет достигнута`);
//     }



// //уровень дохода=================================================================
// console.log(appData.getStatusIncome());

// //====депозит=====================================================================
// appData.getInfoDeposit();

// //====накопления за период========================================================
// console.log(appData.calcSaveMoney());


// //=========addExpenses=============================================================
// let newArray = appData.addExpenses.map((item) => {
//     let key = item.trim();
//         key = key.charAt(0).toUpperCase() + key.slice(1);
        
//     return key;
// });
// let str = newArray.join(', ');
// console.log(str);


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
