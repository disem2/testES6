class Employee {
    constructor(id, name, salary) {
        if (this.constructor === Employee) {
            throw new TypeError('Abstract class "Employee" cannot be instantiated directly.');
        }

        if (this.getSalary === undefined) {
            throw new TypeError('Classes extending the Employee abstract class');
        }
    }
}

export default Employee;