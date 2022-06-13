import inquirer from "inquirer";
import Movie from "./interfaces/Movie";
import User from "./interfaces/User";
import MovieService from "./services/MovieService";

const users: User[] = [
    {
        id: 2,
        name: "Nicolas Magno",
        age: 20,
        myList: []
    }
]

const questions = [
    {
        type: "input",
        name: "option",
        message: "Choose an option: \n 1 - Download Movies \n 2 - Rating \n 3 - Show with Average \n 4 - Choose User \n 5 - Exit \n"
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
    SHOW_WITH_AVERAGE: '3',
    CHOOSE_USER: '4',
    EXIT: '5'
}

let movies: Movie[];
let signedUser: number;

async function run() {
    const answers = await inquirer.prompt(questions);

    const movieService = new MovieService();

    switch(answers.option) {
        case possibleAnswers.DOWNLOAD:
            try {
                console.log("Downloading movies...")
                movies = await movieService.listAll();
                console.log("Downloaded sucessfully.")
                movies.map(movie => console.log(`${movie.id} - ${movie.name}`))
            } catch (error) {
                console.error("Error while downloading :c")
            } finally {
                run()
            }

            break;
        case possibleAnswers.CHOOSE_USER:
            const whichUser = [
                {
                    type: "number",
                    name: "option",
                    message: "Type the user ID:"
                }
            ]

            users.map(user => console.log(`${user.id} - ${user.name}`))
            const answers = await inquirer.prompt(whichUser)

            if(answers.option) {
                signedUser = users.findIndex(user => user.id === answers.option)
                console.log(signedUser)
            }

            run()
            break

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