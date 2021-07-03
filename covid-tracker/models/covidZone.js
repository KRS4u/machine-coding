class CovidZone {
    #availableColours = {
        GREEN: 'GREEN',
        ORANGE: 'ORANGE',
        RED: 'RED'
    };
    #zondId;
    #numCovidCases = 0;
    #zoneColour = this.#availableColours.GREEN;

    constructor(zoneId) {
        if (!zoneId) {
            throw Error('Please Provide a zone id');
        }
        this.#zondId = zoneId;
    }

    #setZoneColour = () => {
        if (this.#numCovidCases === 0) {
            this.#zoneColour = this.#availableColours.GREEN;
        }
        else if (this.#numCovidCases < 5) {
            this.#zoneColour = this.#availableColours.ORANGE;
        }
        else {
            this.#zoneColour = this.#availableColours.RED;
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
