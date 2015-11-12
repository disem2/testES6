import Employee from './Employee.js'
class HourlySalaryEmployee extends Employee {
    constructor(id, name, salary) {
        super();
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    getSalary() {
        return 20.8 * 8 * this.salary;
    }
}

export default HourlySalaryEmployee;
