// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const Engineer = require("./src/Engineer.js");
const Intern = require("./src/Intern.js");
const Manager = require("./src/Manager.js");
const fileSystem = require('fs');

const askMainMenuQuestion = (engineers, interns) => {
    // This will ask:
    // What would you like to do:
    // - Add an Intern
    // - Add an Engineer
    // - Finish
    const mainMenuPrompt = {
        type: 'list',
        name: 'answer',
        message: 'What do you want to do?',
        choices: [
            `Add an Intern`,
            `Add an Engineer`,

            new inquirer.Separator(),
            `finish!`
        ],
    };
    // run the program above
    inquirer.prompt(mainMenuPrompt).then((answersMainQuestions) => {
        // 5 == "5" TRUE
        // 5 === "5" F
        if (answersMainQuestions.answer === `Add an Intern`) {
            askInternQuestions(engineers, interns);
        } else if (answersMainQuestions.answer === `Add an Engineer`) {
            askEngineerQuestions(engineers, interns);
        } else {
            // Save results to an HTML file
            console.log("Saving data to HTML file...");
        }
    });

    // FLOW:
    /**
        mainMenuQuestion -> Intern/Engineer Question -> mainMenuQuestion
    */
};

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
            askMainMenuQuestion(engineers, interns);
            //step two: save details as a pretty HTML File
        });
}

function askEngineerQuestions(engineerList, internList) {
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

        askMainMenuQuestion(engineerList, internList);
    });
}

function askInternQuestions(engineerList, internList) {
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
        askMainMenuQuestion(engineerList, internList);
    });
}


// Function call to initialize app
init();
