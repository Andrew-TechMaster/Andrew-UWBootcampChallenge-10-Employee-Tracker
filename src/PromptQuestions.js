const inquirer = require('inquirer');
const Validator = require('./Validator');

class PromptQuestions {

    #validator;

    constructor() {
        this.#validator = new Validator();
    }

    /** 
    *  the following "promptXXXQuestions()" are Functions to promt questions
    *  Getting called in the App.js
    **/
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

    /**
    *  the following "getXXXQuestions()" are Functions to return list of questions, will get called and be prompted in the promptXXXQuestions() functions
    *  Questions type and validatation were implemented here
    **/
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

}

module.exports = PromptQuestions;