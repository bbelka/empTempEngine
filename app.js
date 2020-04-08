const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "number",
        name: "id",
        message: "What is the employee's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?"
    },
    {
        type: "list",
        name: "title",
        message: "What is the employee's position title?",
        choices: [
            "Intern",
            "Engineer",
            "Manager"
        ]
    },
    {
        type: "input",
        name: "school",
        message: "What shool does the Intern go to?",
        when: (answers) => answers.title === "Intern"
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's github username?",
        when: (answers) => answers.title === "Engineer"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's office number?",
        when: (answers) => answers.title === "Manager"
    },
    {
        type: "confirm",
        name: "keepGoing",
        message: "Would you like to keep entering employees?"
    }
]

const empData = []

const ask = () => inquirer.prompt(questions).then(doStuff);

const doStuff = (answers) => {
    empData.push(answers);
    if (answers.keepGoing) {
        ask();
    } else {
        write(empData);
    }
}

const employees = [];

const write = () => {
    empData.forEach(employee => {
        let newEmp
        if (employee.title === "Manager") {
            let name = employee.name;
            let id = employee.id;
            let email = employee.email;
            let officeNumber = employee.officeNumber;
            newEmp = new Manager(name, id, email, officeNumber);
        } else if (employee.title === "Intern") {
            let name = employee.name;
            let id = employee.id;
            let email = employee.email;
            let school = employee.school;
            newEmp = new Intern(name, id, email, school);
        } else if (employee.title === "Engineer") {
            let name = employee.name;
            let id = employee.id;
            let email = employee.email;
            let github = employee.github;
            newEmp = new Engineer(name, id, email, github);
        };
        employees.push(newEmp);
        

    })
    console.log(employees);
    writeHTML(employees);
};

const writeHTML = (employees) => {
    const renderedHTML = render(employees);
    console.log(renderedHTML);

    fs.writeFile(outputPath, renderedHTML, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Successfully written!");

    })
}

ask();