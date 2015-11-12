import Employee from './Employee.js'
class FixedSalaryEmployee extends Employee{
    constructor(id, name, salary) {
        super();
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    getSalary() {
        return this.salary;
    }
}

export default FixedSalaryEmployee;