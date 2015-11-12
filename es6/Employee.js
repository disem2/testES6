class Employee {
    constructor(id, name, salary) {
        if (this.constructor === Abstract) {
            throw new TypeError('Abstract class "Abstract" cannot be instantiated directly.');
        }

        if (this.getSalary === undefined) {
            throw new TypeError('Classes extending the Abstract abstract class');
        }
    }
}

export default Employee;
