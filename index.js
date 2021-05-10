// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const Engineer = require("./src/Engineer.js");
const Intern = require("./src/Intern.js");
const Manager = require("./src/Manager.js");
const fileSystem = require('fs');

const askMainMenuQuestion = (manager, engineers, interns) => {
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
            askInternQuestions(manager, engineers, interns);
        } else if (answersMainQuestions.answer === `Add an Engineer`) {
            askEngineerQuestions(manager, engineers, interns);
        } else {
            // Save results to an HTML file
            console.log("Saving data to HTML file...");

            const managerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${manager.getName()}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Manager</h6>
                        <p class="card-text">Email: ${manager.getEmail()}\nOffice Number:${manager.getOfficeNumber()}</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>`;
            // reduce takes in an arrow function with two arguments:
            // accumulator: the sum total so far of everything (runningTotalHTML)
            // currentValue: the current element to process (currentInternHTML)
            /* Exmaple:
            
            const numbers = [1, 2, 3, 4, 5];
            console.log(numbers.reduce((acc, val) => acc + val); // this logs 15

            */
            const internHTML = interns.reduce((runningTotalHTML, currentIntern) => {
                return runningTotalHTML + `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${currentIntern.getName()}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Intern</h6>
                        <p class="card-text">Email: ${currentIntern.getEmail()}\nSchool:${currentIntern.getSchool()}</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
                `;
            }, "");

            const template = `
                <html>
                    <head>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
                    </head>
                    <body>
                        <div id="container">
                            <div id="row">
                                <div id="col">
                                    ${managerHTML} 
                                </div>
                            </div>
                            <div id="row">
                                <div id="col">
                                    ☺
                                    ${JSON.stringify(engineers) /**TODO: convert engineers to html */} 
                                </div>
                            </div>
                            <div id="row">
                                <div id="col">
                                    ${internHTML} 
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            `;
            writeToFile("./dist/output.html", template);
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
            askMainMenuQuestion(manager, engineers, interns);
            //step two: save details as a pretty HTML File
        });
}

function askEngineerQuestions(manager, engineerList, internList) {
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

        askMainMenuQuestion(manager, engineerList, internList);
    });
}

function askInternQuestions(manager, engineerList, internList) {
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
        askMainMenuQuestion(manager, engineerList, internList);
    });
}


// Function call to initialize app
init();
