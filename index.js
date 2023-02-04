// const EmployeeService = require('./services/EmployeeService');
// const PromptQuestions = require('./src/PromptQuestions');
const App = require('./src/App');

function init() {
    // const es = new EmployeeService();
    // es.getAllEmployee();
    // es.getAllEmployeesAsync();

    // const pq = new PromptQuestions();
    // pq.appStart();

    const app = new App();
    app.appStart();
}

init();