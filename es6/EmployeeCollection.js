import FixedSalaryEmployee from './FixedSalaryEmployee.js';
import HourlySalaryEmployee from './HourlySalaryEmployee.js';
class EmployeeCollection{
    constructor() {
        this.list = [];
    }
    add(emp, callback) {
        if(!_.where(this.list, {id: emp.id}).length) {
            this.list.push(emp);
            if(callback && typeof callback === 'function') {
                callback(this.list);
            }
        } else if(callback && typeof callback === 'function') {
            callback(null, 'This ID exist!')
        }
    }
    addFromFile(src, res, rej) {
        let employee = null;
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
                res(true);
            },
            error: function (err) {
                rej(err);
            }
        });
    }
    addFromUrl(url, res, rej) {
        let employee = null;
        let self = this;
        let employeeTypes = {
            'HourlySalaryEmployee': HourlySalaryEmployee,
            'FixedSalaryEmployee': FixedSalaryEmployee
        };
        $.get(url, function(data) {
            _.each(data, function (val) {
                employee = new employeeTypes[val.type](val.id, val.name, val.salary);
                self.add(employee);
            });
            self.sortListSalaryNameDescending();
            res(true);
        });
    }
    addFromForm(data, success, error) {
        let emp = JSON.parse(data);
        let employeeTypes = {
            'hour': HourlySalaryEmployee,
            'fixed': FixedSalaryEmployee
        };
        let employee = new employeeTypes[emp.salary_type](+emp.id, emp.name, emp.salary);
        let callback = function (res, err) {
            if(res && success && typeof success === 'function') {
                success(res);
            } else if (!res && err && error && typeof error === 'function') {
                error(err);
            }
        };
        this.add(employee, callback);

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