import inquirer from "inquirer";
import User from "./interfaces/User";
import MovieService from "./services/MovieService";

const user: User = {
    name: "Nicolas Magno",
    age: 20,
    myList: []
}

const questions = [
    {
        type: "input",
        name: "option",
        message: "Choose an option: \n 1 - Download Movies \n 2 - Rating \n 3 - Exit"
    }
]

const chooseMovieQuestions = [
    {
        type: "input",
        name: "option",
        message: "What movie?"
    }
]

const rateQuestions = [
    {
        type: "input",
        name: "option",
        message: "What's your rating from 0 to 5?"
    }
]

const possibleAnswers = {
    DOWNLOAD: '1',
    RATE_MOVIE: '2',
    EXIT: '3'
}

async function run() {
    const answers = await inquirer.prompt(questions);

    const movieService = new MovieService();

    switch(answers.option) {
        case possibleAnswers.DOWNLOAD:
                const movies = movieService.listAll();
                console.log(movies);
            break;
        case possibleAnswers.RATE_MOVIE:
            let movieId;
            let rate;

            const chooseMovieAnswers = await inquirer.prompt(chooseMovieQuestions);
            movieId = chooseMovieAnswers.option;

            const rateAnswers = await inquirer.prompt(rateQuestions);
            rate = rateAnswers.option;

            console.log(movieId, rate);

        break;
        case possibleAnswers.EXIT:
            break;
    }
}

run()