export default class User {
    constructor(name, email, password, address, phoneNumber, profilePicture) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.address = address;
        this.profilePicture = profilePicture;
    }

    authenticate(password) {
        return this.password === password;
    }

    static fromRTDB(data) {
        return new User(
            data.name,
            data.email,
            data.password,
            data.address,
            data.phoneNumber,
            data.profilePicture
        );
    }
}