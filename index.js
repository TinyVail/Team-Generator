// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fileSystem = require('fs');

// TODO: Create an array of questions for user input
const managerPrompts = [{
    type: "input",
    name: "Name",
    message: "What is your name?",
}, {
    type: "input",
    name: "Id",
    message: "What is your Manager Id?",
}, {
    type: "input",
    name: "Email",
    message: "What is your email address?",
},
{
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
}];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data);
    fileSystem.writeFile(fileName, data, function (errorName) {
        console.log(errorName);
    });
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(managerPrompts)
        .then((answers) => {
            // step one : ask user about details for each employee
            const manager = new Manager(answers.Name, answers.Id, answers.Email, answers.officeNumber);
            const engineers = [];
            const interns = [];
            //step two: save details as a pretty HTML File
        });
}

function askEngineerQuestions(engineerList) {
    const engineerPrompts = [{
        type: "input",
        name: "Name",
        message: "What is your name?",
    }, {
        type: "input",
        name: "Id",
        message: "What is your Id?",
    }, {
        type: "input",
        name: "Email",
        message: "What is your email address?",
    },
    {
        type: "input",
        name: "Github",
        message: "What is your GitHub username?",
    }];
    inquirer.prompt(engineerPrompts).then((answers) => {
        const engineer = new Engineer(answers.Name, answers.Id, answers.Email, answers.Github);
        engineerList.push(engineer);
        // main menu function
    });
}

function askInternQuestions(internList) {
    const internPrompts = [{
        type: "input",
        name: "Name",
        message: "What is your name?",
    }, {
        type: "input",
        name: "Id",
        message: "What is your Id?",
    }, {
        type: "input",
        name: "Email",
        message: "What is your email address?",
    },
    {
        type: "input",
        name: "School",
        message: "What is the name of your school?",
    }];
    inquirer.prompt(internPrompts).then((answers) => {
        const intern = new Intern(answers.Name, answers.Id, answers.Email, answers.School);
        internList.push(intern);
        // main menu function
    });
}


// Function call to initialize app
init();
