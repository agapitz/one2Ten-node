import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
const app = express();
const port = 3000;
let conn


app.get('/:skip?/:limit?', async (req, res) => {
  const skip = parseInt(req.params.skip) - 1
  const limit = parseInt(req.params.limit)
  // const result = await mongoose.Collection.find().limit(10)
  let result: any = []
  await conn.collection('Shows').find().skip(skip * limit).limit(limit).forEach(element => {
    let nullBday = []
    const cast = element.cast.sort((a, b) => {
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

  res.send(result);

});

app.listen(port, () => {
  dbConnect()
  // callApi(1)
  return console.log(`Express is listening at http://localhost:${port}`);
});

async function dbConnect() {
  conn = await mongoose.createConnection('mongodb://localhost/one2Tens');
  callApi(1)
}

async function callApi(i) {
  const showsUrl = `https://api.tvmaze.com/shows/${i}?embed=cast`
  const showList: any = await axios.get(showsUrl).catch(() => { return { status: 404 } })
  if (showList.status === 200) {
    const data = showList.data
    const castList = data._embedded.cast
    let cast = []
    castList.filter(data => {
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
    console.log(showDetails)
    const res = await conn.collection('Shows').insertOne(showDetails)
    console.log(res)
  } else {
    console.log('Invalid ID')
  }
  i++
  callApi(i)
}
