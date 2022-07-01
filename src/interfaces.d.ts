interface User {
    id: number;
    name: string;
    age: number;
    myList: Movie[]
}

interface Movie {
    id: number;
    name: string;
    ratings: number[];
    directedBy: string;
}