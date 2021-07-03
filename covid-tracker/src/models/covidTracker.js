const User = require('./user');
const CovidZone = require('./covidZone');
const CovidUser = require('./covidUser');

class CovidTracker {
    #users = new Map();
    #covidZones = new Map();
    #adminUsers = new Map();

    #createZone = (zoneId) => {
        if (!this.#covidZones.has(zoneId)) {
            this.#covidZones.set(zoneId, new CovidZone(zoneId));
        }
    }

    checkUserExistence(userId) {
        if (!this.#users.has(userId)) {
            throw Error(`User ${userId} Doesn't exist`);
        }
        return true;
    }

    checkAdminUserExistence(userId) {
        if (!this.#adminUsers.has(userId)) {
            throw Error(`Admin User ${userId} Doesn't exist`);
        }
        return true;
    }

    registerUser(userId, mobile, pincode) {
        if (!this.#users.has(userId)) {
            this.#users.set(userId, new CovidUser(userId, mobile, pincode));
            this.#createZone(pincode);
        }
        else {
            throw Error(`User Already ${userId} Exist`);
        }
    }

    registerAdminUser(userId, mobile, pincode) {
        if (!this.#adminUsers.has(userId)) {
            this.#adminUsers.set(userId, new User(userId, mobile, pincode));
        }
        else {
            throw Error(`Admin User ${userId} Already Exist`);
        }
    }

    selfAssess(userId, isSymptom, isTravelHistory, isCovidContacted) {
        this.checkUserExistence(userId);
        const risk = this.#users.get(userId).calculateCovidRisk(isSymptom, isTravelHistory, isCovidContacted);
        return `Risk is ${risk}%`;
    }

    uploadCovidResult(adminUserId, userId, isCovidPositive) {
        this.checkAdminUserExistence(adminUserId);
        this.checkUserExistence(userId);
        const covidUser = this.#users.get(userId);
        const userZoneId = covidUser.pincode;
        if (covidUser.covidStatus && !isCovidPositive) {
            covidUser.covidStatus = isCovidPositive;
            this.#covidZones.get(userZoneId).removeCovidCases(1);
        }
        else if (!covidUser.covidStatus && isCovidPositive) {
            covidUser.covidStatus = isCovidPositive;
            this.#covidZones.get(userZoneId).addCovidCases(1);
        }
        return `Record of ${userId} saved successfully as ${isCovidPositive ? 'Positive' : 'Negative'}`;
    }

    getZone(zoneId) {
        if (!this.#covidZones.has(zoneId)) {
            throw Error(`Zone ${zoneId} doesn't exist`);
        }
        const zone = this.#covidZones.get(zoneId);
        return `No. of positive cases: ${zone.numCovidCases}\n${zone.zoneColour}`;
    }

}

module.exports = new CovidTracker();
