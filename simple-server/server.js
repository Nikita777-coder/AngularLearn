import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, function() {
    console.log(`server is running on port ${PORT}`);
});

app.post('/enroll', function(request, response) {
    console.log(request.body);
    response.status(200).send({ "message": "Data received" });
});
