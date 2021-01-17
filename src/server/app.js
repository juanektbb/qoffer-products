import path from 'path'
import app from './server.js'

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '/public', 'index.html'));
});

app.listen(port, () => {
    console.log("Server running on port: " + port)
})