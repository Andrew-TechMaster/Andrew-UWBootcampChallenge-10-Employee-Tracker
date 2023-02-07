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
            case "View Count Of Employees Group By...":
                this.handleViewCountEmployeesGroupBy();
                break;
            case "Add Employee":
                this.handleAddEmployee();
                break;
            case "Update Employee Role":
                this.handleUpdateEmployeeRole();
                break;
            case "Delete Employee":
                this.handleDeleteEmployee();
                break;
            case "View All Roles":
                this.handleViewAllRoles();
                break;
            case "Add Role":
                this.handleAddRole();
                break;
            case "Delete Role":
                this.handleDeleteRole();
                break;
            case "View All Departmens":
                this.handleViewAllDepartments();
                break;
            case "View The Total Utilized Budget Of A Department":
                this.handleViewTotalUtilizedBudgetDepartment();
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

    /**
    *  the following "handleXXX()" are Functions to handle different cases
    *  handlers will get called in decideWhatIsNextStep(aString)
    **/
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
                                            return this.#empService.addEmployeeAsync(empFirstName, empLastName, empRole.empRole, null);
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

    handleDeleteEmployee() {
        // console.log('handling');
        this.#promtpQuestions.promptDeletedEmployeeQuetions()
            .then((data) => {
                this.#empService.deleteEmployeeAsync(data.empId);
            })
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

    handleDeleteRole() {
        // console.log('handling');
        this.#promtpQuestions.promptDeletedRoleQuetions()
            .then((data) => {
                this.#roleService.deleteRoleAsync(data.roleTitle);
            })
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

    handleDeleteDepartment() {
        this.#promtpQuestions.promptDeletedDepartmentQuetions()
            .then((userInput) => {
                this.#deptService.deleteDepartmentAsync(userInput.deptName);
            })
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

    handleUpdateEmployeeRole() {
        this.#empService.getAllEmployeesAsync().then((data) => {
            const tempList = [];
            data.forEach(el => {
                const fullName = `${el.first_name} ${el.last_name}`
                tempList.push({ name: fullName, value: el.id })
            })
            return tempList;
        }).then((updatedEmpName) => {
            inquirer.prompt({
                type: 'list',
                message: "Which employee's role do you want to update?",
                choices: updatedEmpName,
                name: 'updatedEmp'
            }).then((updatedEmp) => {
                this.#roleService.getAllRolesAsync().then((data) => {
                    const tempList = [];
                    data.forEach(el => {
                        tempList.push({ name: el.title, value: el.id })
                    })
                    return tempList;
                }).then((tempList) => {
                    inquirer.prompt({
                        type: 'list',
                        message: "Which role do you want to assign the seleted employee?",
                        choices: tempList,
                        name: 'updatedRole'
                    }).then((updatedRole) => {
                        // console.log(updatedEmp, updatedRole);
                        this.#empService.updatedEmployeeRoleAsync(updatedEmp.updatedEmp, updatedRole.updatedRole);
                    }).then(() => this.#promtpQuestions.promptInitialQuestions()).then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                })
            })
        })
    }

    handleViewCountEmployeesGroupBy() {
        this.#promtpQuestions.promptViewCoutEmployeeBySthQuestions()
            .then(data => {
                // console.log(data);
                let keyWord = '';
                switch (data.groupBy) {
                    case 'Group By Manager':
                        keyWord = 'manager_id';
                        this.#empService.displayEmployeeGroupByAsync(keyWord)
                            .then(() => this.#promtpQuestions.promptInitialQuestions())
                            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                        break;
                    case 'Group By Department':
                        keyWord = 'roles.department_id';
                        this.#empService.displayEmployeeGroupByAsync(keyWord)
                            .then(() => this.#promtpQuestions.promptInitialQuestions())
                            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
                        break;
                    default:
                        break;
                }
            })
    }

    handleViewTotalUtilizedBudgetDepartment() {
        this.#deptService.displayTotalBudgetOfAnDepartment()
            .then(() => this.#promtpQuestions.promptInitialQuestions())
            .then((userInput) => this.decideWhatIsNextStep(userInput.userChoice));
    }

}

module.exports = App;