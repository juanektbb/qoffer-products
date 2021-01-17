import path from 'path'
import app from './server.js'

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '/public', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log("Server running on port: " + app.get('port'))
})