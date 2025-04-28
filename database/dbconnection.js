const mongoose = require('mongoose');

function dbconnection() {
    
mongoose.connect(`mongodb+srv://${process.env.DBUSER_NAME}:${process.env.DBUSER_PASSWORD}@cluster0.qeedw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('Database Connected!'));
}

module.exports = dbconnection