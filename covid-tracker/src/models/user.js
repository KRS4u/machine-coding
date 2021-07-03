class User {
    #userId;
    #mobile;
    #pincode;

    constructor(userId, mobile, pincode) {
        this.#userId = userId;
        this.#mobile = mobile;
        this.#pincode = pincode;
    }
    get userId() {
        return this.#userId;
    }
    get mobile() {
        return this.#mobile;
    }
    get pincode() {
        return this.#pincode;
    }
    set mobile(mobile) {
        this.#mobile = mobile;
    }
    set pincode(pincode) {
        this.#pincode = pincode;
    }
}
module.exports = User;
