import FixedSalaryEmployee from './FixedSalaryEmployee.js';
import HourlySalaryEmployee from './HourlySalaryEmployee.js';
class EmployeeCollection{
    constructor() {
        this.list = [];
    }
    add(emp) {
        if(!_.where(this.list, {id: emp.id}).length) {
            this.list.push(emp);
        } else {
        }
    }
    addFromFile(src, callback) {
        var employee = null;
        let self = this;
        let employeeTypes = {
            'HourlySalaryEmployee': HourlySalaryEmployee,
            'FixedSalaryEmployee': FixedSalaryEmployee
        };
        $.ajax({
            url: src,
            success: function(data) {
                _.each(data, function (val) {
                    employee = new employeeTypes[val.type](val.id, val.name, val.salary);
                    self.add(employee);
                });
                self.sortListSalaryNameDescending();
                callback();
            }
        });
    }
    addFromUrl(url) {
        let self = this;
        $.get(url, function(data) {
            _.each(data, function (val) {
                self.add(val);
            });
        });
    }
    sortListSalaryNameDescending() {
        Array.prototype.sort.call(this.list, function (e1, e2) {
            var salary1 = e1.getSalary(),
                salary2 = e2.getSalary();
            if(salary2 != salary1) {
                return salary2 - salary1;
            } else {
                return e2.name > e1.name;
            }
        });
    }
    getValues() {
        let result = [],
            employee = {};
        _.each(this.list, function (val) {
            employee = {
                id: val.id,
                name: val.name,
                salary: val.getSalary()
            };
            result.push(employee);
        });
        return result;
    }
    // Not just 5 names but custom quantity
    getNamesByQuantity(quantity) {
        let result = [];
        _.each(this.list, function (val) {
            result.push(val.name);
        });
        return result;
    }
    // Not just 3 IDs but custom quantity
    getIDsByQuantityFromTheEnd(quantity) {
        let result = [],
            array = this.list.slice(-quantity);
        _.each(array, function (val) {
            result.push(val.id);
        });
        return result;
    }
}

export default EmployeeCollection;