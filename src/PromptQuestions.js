const inquirer = require('inquirer');
const EmployeeService = require('../services/EmployeeService');
const RoleService = require('../services/RoleService');
const DepartmentService = require('../services/DepartmentService');

class PromptQuestions {

    #empService;
    #roleService;
    #deptService;

    constructor() {
        this.#empService = new EmployeeService();
        this.#roleService = new RoleService();
        this.#deptService = new DepartmentService();
    }

    getInitialQuestions() {
        const initialQuestions = [
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Empolyees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departmens",
                    "Add Department",
                    "Quit"
                ],
                name: "userChoice"
            }
        ];

        return initialQuestions;
    }

    promptInitialQuestions() {
        const initialQuestion = this.getInitialQuestions();
        return inquirer.prompt(initialQuestion);
    }

    decideWhatIsNextStep(aString) {
        switch (aString) {
            case "View All Empolyees":
                this.#empService.getAllEmployeesAsync()
                    .then(() => this.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "View All Roles":
                this.#roleService.getAllRolesAsync()
                    .then(() => this.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "View All Departmens":
                this.#deptService.getAllDepartmentsAsync()
                    .then(() => this.promptInitialQuestions())
                    .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                break;
            case "Quit":
                console.log("------------ Thanks for using my app! Quitting... ------------");
                console.log("------------ Please close the terminal or use 'control + c' to leave the application. ------------");
                break;
        }
    }

    appStart() {
        this.promptInitialQuestions()
            .then((userInput) => {
                // console.log(userInput.userChoice);
                this.decideWhatIsNextStep(userInput.userChoice);
            });
    }

}

module.exports = PromptQuestions;