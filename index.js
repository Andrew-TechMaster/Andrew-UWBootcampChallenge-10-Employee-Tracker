const EmployeeService = require('./services/EmployeeService');

function init() {
    const es = new EmployeeService();
    es.getAllEmployee();
}

init();