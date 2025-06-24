class Address {
    constructor(zipCode, country, state, city,  street, houseNumber, complement) {
        this.zipCode = zipCode;
        this.country = country;
        this.state = state;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.complement = complement;
    }
}

export default class User {
    constructor(name, email, password, address, phoneNumber, profilePicture) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.address = address;
        this.profilePicture = profilePicture;
    }
}