import EmployeeCollection from './EmployeeCollection.js';
var employeeCollection = new EmployeeCollection();
var callback = function () {
    console.log(employeeCollection.getIDsByQuantityFromTheEnd(5));
};
employeeCollection.addFromFile("./data/employeesCollection.json", callback);