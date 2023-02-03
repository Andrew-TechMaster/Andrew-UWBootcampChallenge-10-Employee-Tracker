// const EmployeeService = require('./services/EmployeeService');
const PromptQuestions = require('./src/PromptQuestions');

function init() {
    // const es = new EmployeeService();
    // es.getAllEmployee();
    // es.getAllEmployeesAsync();
    const pq = new PromptQuestions();
    pq.start();

}

init();