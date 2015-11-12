import FixedSalaryEmployee from './FixedSalaryEmployee.js';
import HourlySalaryEmployee from './HourlySalaryEmployee.js';
import EmployeeCollection from './EmployeeCollection.js';
var defaultEmployees = null,
    employeeCollection = new EmployeeCollection();
employeeCollection.addFromJSON("./data/employeesCollection.json").then(function () {
    console.log(employeeCollection);
});