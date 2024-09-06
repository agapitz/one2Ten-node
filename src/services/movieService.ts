import { Movie } from '../models/movie';
import app from '../app';
let movies: Movie[] = [];

export const getMOvies = async (skip: number, limit: number): Promise<Movie[]> => {
    let result: any = []
    await (await app.conn).collection('Shows').find().skip(skip * limit).limit(limit).forEach(element => {
        const cast = element.cast.sort((a: any, b: any) => {
            if (a.birthday === null) {
                return 1;
            }
            if (b.birthday === null) {
                return -1;
            }
            return (+new Date(a.birthday) > +new Date(b.birthday)) ? -1 : 1;
        });
        result.push({
            id: element.id,
            name: element.name,
            cast
        })
    }).catch((err) => {
        console.log(err)
    })
    movies = result
    return movies;
};

