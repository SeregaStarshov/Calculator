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
const expensesTitle = document.querySelector('.expenses-title[type="text"]');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const budgetMonthValue = document.querySelector('.budget_month-value');
const range = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
const blockInput = document.querySelectorAll('input[type="text"]');
const cancel = document.getElementById('cancel');


function AppData() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    AppData.prototype.check = function() {

        if(salaryAmount.value.trim() !== '') {
            calculate.removeAttribute('disabled');
        } 
    };
    AppData.prototype.start = function() {

        if(salaryAmount.value.trim() === '') {
            calculate.setAttribute('disabled', 'true');
            return;
        }
        this.budget = +salaryAmount.value;
        
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    };
    AppData.prototype.reset = function() {
        blockInput.forEach((item) => {
            item.value = '';
        });
        range.value = 1;
        periodAmount.textContent = 1;
        cancel.style.display = 'none';
        calculate.style.display = 'block';

        incomeItem.forEach((item, index) => {
            if(index > 0 && index < 3) {
                item.remove();
                incomeBtn.style.display = 'block';
            }
        });

        expensesItems.forEach((item, index) => {
            if(index > 0 && index < 3) {
                item.remove();
                expensesBtn.style.display = 'block';
            }
        });

        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

        blockInput.forEach((item) => {
            item.disabled = false;
        });
    };
    AppData.prototype.showResult = function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSaveMoney();
        range.addEventListener('input', () => {
            
            incomePeriodValue.value = this.calcSaveMoney();
        });
    };
    AppData.prototype.addExpensesBlock = function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesBtn.style.display = 'none';
        }
    };
    AppData.prototype.getExpenses = function() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
                
            }
        });
    };
    AppData.prototype.addIncomeBlock = function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeBtn);
        incomeItem = document.querySelectorAll('.income-items');

        if(incomeItem.length === 3) {
            incomeBtn.style.display = 'none';
        }
    };
    AppData.prototype.getIncome = function() {
        incomeItem.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };
    AppData.prototype.getAddExpenses = function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== '') {
                this.addExpenses.push(item);
            }
        });
    };
    AppData.prototype.getAddIncome = function() {
        
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    };
    AppData.prototype.getExpensesMonth = function() {
        
        for (let key in this.expenses) {
            
            this.expensesMonth += +this.expenses[key];
        }
        
        return this.expensesMonth;
    };
    AppData.prototype.getBudget = function() {
        this.budgetDay = Math.floor(this.budget / 30 - this.expensesMonth / 30);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    };
    AppData.prototype.getTargetMonth = function() {
    
        return Math.ceil(targetAmount.value / this.budgetMonth);
    };
    AppData.prototype.getStatusIncome = function() {
        
        if(this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if(this.budgetDay >= 600 && this.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if(this.budgetDay < 600 && this.budgetDay > 0) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    };
    AppData.prototype.getInfoDeposit = function() {
        console.log(this);
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if (this.deposit) {
            this.percentDeposit = prompt('Какой годовой процент?', '7.9');
                while (!isNumber(this.percentDeposit)) {
                    this.percentDeposit = prompt('Какой годовой процент?', '7.9');
                }
            this.moneyDeposit = prompt('Какая сумма заложена?', '11000');
                while (!isNumber(this.moneyDeposit)) {
                    this.moneyDeposit = prompt('Какая сумма заложена?', '11000');
                }
        }
    };
    AppData.prototype.calcSaveMoney = function() {
        
        return this.budgetMonth * range.value;
    };
    AppData.prototype.eventsListeners = function() {
        calculate.addEventListener('click', this.start.bind(this));
        
        calculate.addEventListener('click', () => {
            blockInput.forEach((item) => {
                item.disabled = true;
            });
            calculate.style.display = 'none';
            cancel.style.display = 'block';

            incomeItem.forEach((item, index) => {
                item.querySelectorAll('input[type="text"]').forEach((item) => item.disabled = true);
            });

            expensesItems.forEach((item, index) => {
                item.querySelectorAll('input[type="text"]').forEach((item) => item.disabled = true);
            });
           
        });
        salaryAmount.addEventListener('keyup', this.check.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesBtn.addEventListener('click', this.addExpensesBlock.bind(this));
        incomeBtn.addEventListener('click', this.addIncomeBlock.bind(this));
        range.addEventListener('input', () => {
            periodAmount.textContent = range.value;
        });
    };
}



const appData = new AppData();
appData.eventsListeners();




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
