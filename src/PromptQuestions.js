const inquirer = require('inquirer');
const Validator = require('./Validator');
// const EmployeeService = require('../services/EmployeeService');
// const RoleService = require('../services/RoleService');
// const DepartmentService = require('../services/DepartmentService');

class PromptQuestions {

    // #empService;
    // #roleService;
    // #deptService;
    #validator;

    constructor() {
        // this.#empService = new EmployeeService();
        // this.#roleService = new RoleService();
        // this.#deptService = new DepartmentService();
        this.#validator = new Validator();
    }

    promptInitialQuestions() {
        const initialQuestion = this.getInitialQuestions();
        console.log("🎉{=========================== 👋 Welcome 👋 ===========================}🎉");
        return inquirer.prompt(initialQuestion);
    }

    promptAddedDepartmentQuetions() {
        const questions = this.getAddedDepartmentQuetions();
        return inquirer.prompt(questions);
    }

    promptDeletedDepartmentQuetions() {
        const questions = this.getDeletedDepartmentQuetions();
        return inquirer.prompt(questions);
    }

    promptInitialAddedRoleQuetions() {
        const questions = this.getInitialAddedRoleQuetions();
        return inquirer.prompt(questions);
    }

    promptInitialAddedEmployeeQuetions() {
        const questions = this.getInitialAddedEmployeeQuetions();
        return inquirer.prompt(questions);
    }

    // promptUpdatedEmployeeRoleQuestions() {
    //     const questions = this.getUpdatedEmployeeRoleQuestions();
    //     return inquirer.prompt(questions);
    // }

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
                    "Delete Department",
                    "<---------------❌ Quit ❌--------------->"
                ],
                name: "userChoice"
            }
        ];

        return initialQuestions;
    }

    getAddedDepartmentQuetions() {
        const questions = [
            {
                type: "input",
                message: "What is the name of the department?",
                name: "deptName"
            }
        ];

        return questions;
    }

    getDeletedDepartmentQuetions() {
        const questions = [
            {
                type: "input",
                message: "What is the name of the department you want to delete?",
                name: "deptName"
            }
        ];

        return questions;
    }

    getInitialAddedRoleQuetions() {
        const questions = [
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'roleTitle'
            },

            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'roleSalary',
                validate: (value) => this.#validator.checkIsNumber(value)
            }
        ];

        return questions;
    }

    getInitialAddedEmployeeQuetions() {
        const questions = [
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'empFirstName'
            },

            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'empLastName'
            }
        ];

        return questions;
    }

    // getUpdatedEmployeeRoleQuestions() {
    //     const questions = [
    //         {
    //             type: 'input',
    //             message: "Which employee's role do you want to update?",
    //             name: 'empFullName'
    //         },
    //         {
    //             type: 'input',
    //             message: "Which role do you want to assign the seleted employee?",
    //             name: 'empNewRole'
    //         }
    //     ];

    //     return questions;
    // }

    // decideWhatIsNextStep(aString) {
    //     switch (aString) {
    //         case "View All Empolyees":
    //             this.#empService.displayAllEmployeesAsync()
    //                 .then(() => this.promptInitialQuestions())
    //                 .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    //             break;
    //         case "Add Employee":

    //             break;
    //         case "View All Roles":
    //             this.#roleService.displayAllRolesAsync()
    //                 .then(() => this.promptInitialQuestions())
    //                 .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    //             break;
    //         case "Add Role":
    //             inquirer.prompt(this.getAddedRoleQuetions())
    //                 .then(({ roleTitle, roleSalary }) => {
    //                     this.#deptService.getAllDepartmentsAsync()
    //                         .then(([rows, fields]) => {
    //                             const deptChoices = rows.map(({ id, name }) => ({
    //                                 name: name,
    //                                 value: id
    //                             }));
    //                             return deptChoices;
    //                         }).then((deptChoices) => {
    //                             inquirer.prompt({
    //                                 type: "list",
    //                                 message: "Which department does the role belong to?",
    //                                 choices: deptChoices,
    //                                 name: "belongTo"
    //                             }).then((choice) => {
    //                                 this.#roleService.addRollAsync(roleTitle, roleSalary, choice.belongTo);
    //                             }).then(() => this.promptInitialQuestions()).then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    //                         });
    //                 });
    //             break;
    //         case "View All Departmens":
    //             this.#deptService.displayAllDepartmentsAsync()
    //                 .then(() => this.promptInitialQuestions())
    //                 .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    //             break;
    //         case "Add Department":
    //             this.promptAddedDepartmentQuetions()
    //                 .then((userInput) => {
    //                     this.#deptService.addDepartmentAsync(userInput.deptName)
    //                 })
    //                 .then(() => this.promptInitialQuestions())
    //                 .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    //             break;
    //         case "Delete Department":
    //             this.promptDeletedDepartmentQuetions()
    //                 .then((userInput) => {
    //                     this.#deptService.deleteDepartmentAsync(userInput.deptName)
    //                 })
    //                 .then(() => this.promptInitialQuestions())
    //                 .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    //             break;
    //         case "<---------------❌ Quit ❌--------------->":
    //             console.log("------------ Thanks for using my app! Quitting... ------------");
    //             console.log("------------ Please close the terminal or use 'control + c' to leave the application. ------------");
    //             break;
    //     }
    // }

    // appStart() {
    //     this.promptInitialQuestions()
    //         .then((userInput) => {
    //             // console.log(userInput.userChoice);
    //             this.decideWhatIsNextStep(userInput.userChoice);
    //         });
    // }

}

module.exports = PromptQuestions;