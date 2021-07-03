class CovidZone {
    #zondId;
    #numCovidCases = 0;
    #zoneColour = 'GREEN';

    constructor(zoneId) {
        if (!zoneId) {
            throw Error('Please Provide a zone id');
        }
        this.#zondId = zoneId;
    }

    #setZoneColour = () => {
        if (this.#numCovidCases < 5) {
            this.#zoneColour = 'ORANGE';
        }
        else {
            this.#zoneColour = 'RED';
        }
    }

    get zoneId() {
        return this.#zondId;
    }

    get numCovidCases() {
        return this.#numCovidCases;
    }

    get zoneColour() {
        return this.#zoneColour;
    }

    addCovidCases(numCases) {
        this.#numCovidCases += Number(numCases);
        this.#setZoneColour();
    }

    removeCovidCases(numCases) {
        this.#numCovidCases -= Number(numCases);
        this.#setZoneColour();
    }
}

module.exports = CovidZone;
