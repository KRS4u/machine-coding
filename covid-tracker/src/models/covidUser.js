const User = require('./user');

class CovidUser extends User {
    #covidStatus = false;
    #riskPercentage = 0;

    constructor(userId, mobile, pincode) {
        super(userId, mobile, pincode);
    }

    get covidStatus() {
        return this.#covidStatus;
    }

    set covidStatus(status) {
        return this.#covidStatus = status;
    }

    get riskPercentage() {
        return this.#riskPercentage;
    }

    calculateCovidRisk(isSymptom, isTravelHistory, isCovidContacted) {
        const numCovidFactors = Number(isSymptom) + Number(isTravelHistory) + Number(isCovidContacted);
        if (numCovidFactors === 0) {
            this.#riskPercentage = 5;
        }
        else if (numCovidFactors === 1) {
            this.#riskPercentage = 50;
        }
        else if (numCovidFactors === 2) {
            this.#riskPercentage = 75;
        }
        else {
            this.#riskPercentage = 95;
        }
        return this.#riskPercentage;
    }
}

module.exports = CovidUser;
