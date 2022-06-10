import IndicativeRating from "../enums/IndicativeRating";

interface Movie {
    id: number;

    name: string;

    ratings: number[];

    directedBy: string;

    indicativeRating: IndicativeRating;

}

export default Movie