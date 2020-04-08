const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const confirmString = async (input) => {
    if (input === "") {
        return 'Please provide an answer.';
    }
    return true;
};

const confirmNumber = async (input) => {
    if (isNaN(input)) {
        return 'Please provide a numerical id number.';
    }
    return true;
};

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        validate: confirmString
    },
    {
        type: "number",
        name: "id",
        message: "What is the employee's id number?",
        validate: confirmNumber
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?",
        validate: confirmString
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
        validate: confirmString,
        when: (answers) => answers.title === "Intern"
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's github username?",
        validate: confirmString,
        when: (answers) => answers.title === "Engineer"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's office number?",
        validate: confirmString,
        when: (answers) => answers.title === "Manager"
    },
    {
        type: "confirm",
        name: "keepGoing",
        message: "Would you like to keep entering employees?",
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
            newEmp = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);

        } else if (employee.title === "Intern") {
            newEmp = new Intern(employee.name, employee.id, employee.email, employee.school);

        } else if (employee.title === "Engineer") {
            newEmp = new Engineer(employee.name, employee.id, employee.email, employee.github);
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