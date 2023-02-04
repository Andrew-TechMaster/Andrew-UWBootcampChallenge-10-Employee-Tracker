const inquirer = require('inquirer');
const PromptQuestions = require('./PromptQuestions');
const EmployeeService = require('../services/EmployeeService');
const RoleService = require('../services/RoleService');
const DepartmentService = require('../services/DepartmentService');

class App {

    #promtpQuestions;
    #empService;
    #roleService;
    #deptService;

    constructor() {
        this.#promtpQuestions = new PromptQuestions();
        this.#empService = new EmployeeService();
        this.#roleService = new RoleService();
        this.#deptService = new DepartmentService();
    }

    appStart() {
        this.#promtpQuestions.promptInitialQuestions()
            .then((userInput) => { this.decideWhatIsNextStep(userInput.userChoice); });
    }

    decideWhatIsNextStep(aString) {
        switch (aString) {
            case "View All Empolyees":
                this.#empService.displayAllEmployeesAsync()
                    .then(() => this.#promtpQuestions.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "Add Employee":

                break;
            case "View All Roles":
                this.#roleService.displayAllRolesAsync()
                    .then(() => this.#promtpQuestions.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "Add Role":
                this.#promtpQuestions.promptInitialAddedRoleQuetions()
                    .then(({ roleTitle, roleSalary }) => {
                        this.#deptService.getAllDepartmentsAsync()
                            .then(([rows, fields]) => {
                                const deptChoices = rows.map(({ id, name }) => ({
                                    name: name,
                                    value: id
                                }));
                                return deptChoices;
                            }).then((deptChoices) => {
                                inquirer.prompt({
                                    type: "list",
                                    message: "Which department does the role belong to?",
                                    choices: deptChoices,
                                    name: "belongTo"
                                }).then((choice) => {
                                    this.#roleService.addRollAsync(roleTitle, roleSalary, choice.belongTo);
                                }).then(() => this.#promtpQuestions.promptInitialQuestions()).then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                            });
                    });
                break;
            case "View All Departmens":
                this.#deptService.displayAllDepartmentsAsync()
                    .then(() => this.#promtpQuestions.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "Add Department":
                this.#promtpQuestions.promptAddedDepartmentQuetions()
                    .then((userInput) => {
                        this.#deptService.addDepartmentAsync(userInput.deptName)
                    })
                    .then(() => this.#promtpQuestions.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "Delete Department":
                this.#promtpQuestions.promptDeletedDepartmentQuetions()
                    .then((userInput) => {
                        this.#deptService.deleteDepartmentAsync(userInput.deptName)
                    })
                    .then(() => this.#promtpQuestions.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "<---------------❌ Quit ❌--------------->":
                console.log("------------ Thanks for using my app! Quitting... ------------");
                console.log("------------ Please close the terminal or use 'control + c' to leave the application. ------------");
                break;
        }
    }

}

module.exports = App;