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
                this.handleViewAllEmployees();
                break;
            case "Add Employee":
                this.handleAddEmployee();
                break;
            case "View All Roles":
                this.handleViewAllRoles();
                break;
            case "Add Role":
                this.handleAddRole();
                break;
            case "View All Departmens":
                this.handleViewAllDepartments();
                break;
            case "Add Department":
                this.handleAddDepartment();
                break;
            case "Delete Department":
                this.handleDeleteDepartment();
                break;
            case "<---------------❌ Quit ❌--------------->":
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~ Thanks for using my app! Quitting... ~~~~~~~~~~~~~~~~~~~~~~~~ ");
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~ Please close the terminal or use 'control + c' to leave the application. ~~~~~~~~~~~~~~~~~~~~~~~~ ");
                break;
        }
    }

    handleViewAllEmployees() {
        this.#empService.displayAllEmployeesAsync()
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

    handleViewAllRoles() {
        this.#roleService.displayAllRolesAsync()
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

    handleViewAllDepartments() {
        this.#deptService.displayAllDepartmentsAsync()
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

    handleAddEmployee() {
        this.#promtpQuestions.promptInitialAddedEmployeeQuetions()
            .then(({ empFirstName, empLastName }) => {
                this.#roleService.getAllRolesAsync()
                    .then((rows) => {
                        const roleChoices = rows.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }));
                        return roleChoices;
                    }).then((roleChoices) => {
                        inquirer.prompt({
                            type: "list",
                            message: "What is the employee's role?",
                            choices: roleChoices,
                            name: "empRole"
                        }).then((empRole) => {
                            // console.log(empRole);
                            this.#empService.getAllEmployeesAsync()
                                .then((rows) => {
                                    // console.log(rows);
                                    const managerChoices = ["None"];
                                    rows.forEach(el => {
                                        const empManagerName = `${el.first_name} ${el.last_name}`;
                                        managerChoices.push({ name: empManagerName, value: el.id })
                                    });
                                    return managerChoices;
                                }).then((managerChoices) => {
                                    // console.log(managerChoices);
                                    inquirer.prompt({
                                        type: "list",
                                        message: "Who is the employee's manager?",
                                        choices: managerChoices,
                                        name: "empManager"
                                    }).then((data) => {
                                        // console.log(empManager);
                                        if (data.empManager === "None") {
                                            this.#empService.addEmployeeAsync(empFirstName, empLastName, empRole.empRole);
                                        }
                                        this.#empService.addEmployeeAsync(empFirstName, empLastName, empRole.empRole, data.empManager);
                                    }).then(() => this.#promtpQuestions.promptInitialQuestions()).then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                                })

                        })
                    })
            });
    }

    handleAddRole() {
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
    }

    handleAddDepartment() {
        this.#promtpQuestions.promptAddedDepartmentQuetions()
            .then((userInput) => {
                this.#deptService.addDepartmentAsync(userInput.deptName)
            })
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

    handleDeleteDepartment() {
        this.#promtpQuestions.promptDeletedDepartmentQuetions()
            .then((userInput) => {
                this.#deptService.deleteDepartmentAsync(userInput.deptName)
            })
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

}

module.exports = App;