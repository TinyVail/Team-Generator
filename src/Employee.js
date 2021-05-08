class Employee {
    name;
    id;
    email;

    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName = () => {
        return this.name;
    }

    getEmail = () => {
        return this.email;
    }

    getId = () => {
        return this.id;
    }

    getRole = () => {
        return this.constructor.name; // This is "Employee"
    }

}

module.exports = Employee;