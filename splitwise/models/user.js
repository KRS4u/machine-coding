class User {
    #userId;
    #name;
    #email;
    #mobile;

    constructor(userId, name, email, mobile) {
        this.#userId = userId;
        this.#name = name;
        this.#email = email;
        this.#mobile = mobile;
    }

    get name() {
        return this.#name;
    }
    get userId() {
        return this.#userId;
    }
    get email() {
        return this.#email;
    }
    get mobile() {
        return this.#mobile;
    }
}
module.exports = User;
