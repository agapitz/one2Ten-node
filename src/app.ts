import express from 'express';
import movieRoutes from './routes/movieRoutes'
import { Cast, Movie } from './models/movie'
import axios from 'axios';
import mongoose from 'mongoose';
const conn = dbConnect()
const app = express();

const listen = app.listen(() => {
    console.log(`Server Details ${JSON.stringify(listen.address())}`);
    console.log('Started scraping movies')
    callApi(0)
});
app.use(express.json());
app.use('/movies', movieRoutes);
async function dbConnect() {
    return await mongoose.createConnection('mongodb://localhost/one2Tens');
}

async function callApi(i: number) {
    const showsUrl = `https://api.tvmaze.com/shows/${i}?embed=cast`
    const showList: any = await axios.get(showsUrl).catch(() => { return { status: 404 } })

    if (showList.status === 200) {
        const data = showList.data
        const castList: any = data._embedded.cast
        let cast: any = []

        castList.forEach((data: any, index: number) => {
            cast.push({
                id: data.person.id,
                name: data.person.name,
                birthday: data.person.birthday
            })
        })

        const showDetails = {
            id: data.id,
            name: data.name,
            cast
        }
        await (await conn).collection('Shows').insertOne(showDetails)
    }
    i++
    callApi(i)
}
export default { app, conn } 