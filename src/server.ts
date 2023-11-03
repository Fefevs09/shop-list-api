import express from 'express';
import itemsRouter from './routes/Item';

const app = express()
const PORT = 3000


app.get('/', (req, res) => {
	res.send('hello World')
})

app.use(express.json())

app.use('/api', itemsRouter)

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})