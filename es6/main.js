import EmployeeCollection from './EmployeeCollection.js';
var employeeCollection = new EmployeeCollection();
var addEmployeesFromFile = new Promise((resolve, reject) => {
    employeeCollection.addFromFile("./data/employeesCollection.json", resolve, reject);
});
addEmployeesFromFile.then(
    result => {
    },
    error => {
        console.log(error);
    }
);

//Form submit listener
$('#saveForm').on('click', function (e) {
    e.preventDefault();
    var onResult = function (data) {
            emptyFields();
            console.log(data);
            alert('Saved');
        },
        onError = function (err) {
            alert(err);
        },
        data = validationForm('form');
    if(data) {
        employeeCollection.addFromForm(data, onResult, onError);
    }
});
$('.form-field').on('click', function (e) {
    e.preventDefault();
    clearErrorField();
});

function validationForm (form) {
    var validationForm = new tFormer(form, {
        fields: {
            id: '* num',
            name: '*',
            salary_type: '',
            salary: '* num'
        }
    });
    if (validationForm.valid == true) {
        return serializeDataFromForm();

    } else {
        errorValidation(validationForm);
    }
}
function serializeDataFromForm (e) {
    var formFields = {};
    var serializeFormsData = $('form').serializeArray();
    $.each(serializeFormsData, function () {
        if (formFields[this.name] !== undefined) {
            formFields[this.name].push(this.value || '');
        } else {
            formFields[this.name] = this.value || '';
        }
    });
    return JSON.stringify(formFields);
}
function errorValidation (data) {
    _.each(data.fields, function (item, index) {
        if (item.valid == false) {
            $('#' + index).addClass('error-field');
        }
    });
}
function clearErrorField () {
    var fieldValue = $('.form-field');
    fieldValue
        .removeClass('error-field');
}
function emptyFields () {
    var fieldValue = $('.form-field');
    fieldValue.val('');
}