export default class User {
    constructor(name, email, password, address, cep, phoneNumber, profilePicture) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cep = cep;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
    }

    authenticate(password) {
        return this.password === password;
    }

    getId() {
        return this.email.replace(/\./g, '_');
    }

    static fromRTDB(data) {
        return new User(
            data.name,
            data.email,
            data.password,
            data.address,
            data.cep,
            data.phoneNumber,
            data.profilePicture
        );
    }
}