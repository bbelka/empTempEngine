// TODO: Write code to define and export the Employee clas

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        console.log(this.name);
        return this.name;
    }

    getId() {
        console.log(this.id);
        return this.id;
    }

    getEmail() {
       console.log(this.email);
        return this.email;
    }

    getRole() {
        return `Employee`
    }
}

// const Grace = new Employee("Grace", 30, "blah@blah.com");
// Grace.getName()
// Grace.getId()
// Grace.getEmail()
// Grace.getRole()

module.exports = Employee;