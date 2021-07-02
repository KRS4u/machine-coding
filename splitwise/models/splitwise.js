'use-strict';
const User = require('./user');
const { getArraySum } = require('../utils/utils');

class Splitwise {
    #users = new Map()
    #balances = new Map()

    #addBalance = (userId1, userId2, amount) => {
        if (userId1 === userId2) {
            return;
        }
        if (!this.#balances.get(userId1).has(userId2)) {
            this.#balances.get(userId1).set(userId2, { balance: 0 });
        }
        if (!this.#balances.get(userId2).has(userId1)) {
            this.#balances.get(userId2).set(userId1, { balance: 0 });
        }
        this.#balances.get(userId1).get(userId2).balance += Number(amount.toFixed(2));
        this.#balances.get(userId2).get(userId1).balance -= Number(amount.toFixed(2));
    }

    #checkUserExistence = (userId) => {
        if (!this.#balances.has(userId)) {
            throw Error(`User ${userId} doesn't exist`);
        }
    }

    #processExactTransactionType = (payerId, totalAmount, owerIds, amounts) => {
        if (totalAmount !== getArraySum(amounts)) {
            throw Error('total amount is not equal to sum of amounts provided');
        }
        if (owerIds.length !== amounts.length) {
            throw Error('Invalid length of owers and amounts');
        }
        this.#checkUserExistence(payerId);
        owerIds.map((owerId) => this.#checkUserExistence(owerId));
        for (let i = 0; i < owerIds.length; ++i) {
            this.#addBalance(payerId, owerIds[i], amounts[i]);
        }

    }

    #processPercentageTransactionType = (payerId, totalAmount, owerIds, percentages) => {
        if (100 !== getArraySum(percentages)) {
            throw Error('total percentage is not equal to 100');
        }
        if (owerIds.length !== percentages.length) {
            throw Error('Invalid length of owers and percentages');
        }
        this.#checkUserExistence(payerId);
        owerIds.map((owerId) => this.#checkUserExistence(owerId));
        const amounts = percentages.map((percent) => Number(((totalAmount * percent) / 100).toFixed(2)));
        const totalPercentageAmount = getArraySum(amounts);
        for (let i = 0; i < owerIds.length; ++i) {
            if (i == 0) {
                this.#addBalance(payerId, owerIds[i], Number(amounts[i] + (totalAmount - totalPercentageAmount)));
                continue;
            }
            this.#addBalance(payerId, owerIds[i], amounts[i]);
        }
    }

    #processEqualTransactionType = (payerId, totalAmount, owerIds) => {
        const totalUsers = owerIds.length;
        if (!totalUsers) {
            throw Error('No Owers are provided');
        }
        this.#checkUserExistence(payerId);
        owerIds.map((owerId) => this.#checkUserExistence(owerId));
        const perUserAmount = Number((totalAmount / totalUsers).toFixed(2));
        for (let i = 0; i < owerIds.length; ++i) {
            if (i == 0) {
                this.#addBalance(payerId, owerIds[i], perUserAmount + (totalAmount - perUserAmount * totalUsers));
                continue;
            }
            this.#addBalance(payerId, owerIds[i], perUserAmount);
        }
    }

    createUser(userId, name, email, mobile) {
        if (this.#users.has(userId)) {
            throw Error('User already exist');
        }
        this.#users.set(userId, new User(userId, name, email, mobile));
        this.#balances.set(userId, new Map());
    }

    showBalanceByUserId(userId) {
        if (!this.#balances.has(userId) || !this.#balances.get(userId).size) {
            console.log('No Balances');
            return;
        }
        for (const [user, balanceObj] of this.#balances.get(userId)) {
            const balance = Number(balanceObj.balance.toFixed(2));
            if (user === userId) {
                continue;
            }
            if (balance < 0) {
                console.log(`${this.#users.get(userId).name} owes ${this.#users.get(user).name}: ${(-1) * (balance)}`);
            }
            else if (balance > 0) {
                console.log(`${this.#users.get(user).name} owes ${this.#users.get(userId).name}: ${balance}`);
            }
        }
    }

    showBalances() {
        let noBalanceFlag = true;
        for (const [userId1, account] of this.#balances) {
            for (const [userId2, balanceObj] of account) {
                noBalanceFlag = false;
                const balance = Number(balanceObj.balance.toFixed(2));
                if (balance <= 0 || userId1 === userId2) {
                    continue;
                }
                console.log(`${this.#users.get(userId2).name} owes ${this.#users.get(userId1).name}: ${balance}`);
            }
        }
        if (noBalanceFlag) {
            console.log('No Balances');
        }
    }

    transact(transactionType, payerId, totalAmount, owerIds = [], divisions = []) {
        switch (transactionType) {
            case 'EXACT': this.#processExactTransactionType(payerId, totalAmount, owerIds, divisions);
                break;
            case 'PERCENT': this.#processPercentageTransactionType(payerId, totalAmount, owerIds, divisions);
                break;
            case 'EQUAL': this.#processEqualTransactionType(payerId, totalAmount, owerIds);
                break;
            default: throw Error('Invalid transaction type');
        }
        console.log('transaction finished');
    }
}

module.exports = new Splitwise();
