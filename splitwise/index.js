const prompt = require('prompt-sync')({ sigint: true });
const { get, isEmpty } = require('lodash');

const splitwise = require('./models/splitwise');

const createUsers = () => {
    splitwise.createUser('u1', 'User1', 'x@y.com', '12345678');
    splitwise.createUser('u2', 'User2', 'x2@y.com', '123456789');
    splitwise.createUser('u3', 'User3', 'x3@y.com', '123456780');
    splitwise.createUser('u4', 'User4', 'x4@y.com', '123456781');
}

const startApp = () => {
    while (true) {
        try {
            const input = prompt();
            if (input === 'exit') {
                return;
            }
            const inputArray = input.trim().split(' ');
            if (get(inputArray, '0') === 'SHOW') {
                if (!isEmpty(get(inputArray, '1'))) {
                    splitwise.showBalanceByUserId(inputArray[1]);
                }
                else {
                    splitwise.showBalances();
                }
            }
            else if (get(inputArray, '0') === 'EXPENSE') {
                const payerId = inputArray[1];
                const totalAmount = Number(inputArray[2]);
                const numUsers = Number(inputArray[3]);
                const users = inputArray.slice(4, 4 + numUsers);
                const transactionType = inputArray[4 + numUsers];
                const amounts = inputArray.slice(5 + numUsers).map((amount) => Number(amount));
                splitwise.transact(transactionType, payerId, totalAmount, users, amounts);
            }
            else {
                throw Error('Invalid input');
            }
        } catch (err) {
            console.log(err);
        }
    }
}
createUsers();
startApp();
