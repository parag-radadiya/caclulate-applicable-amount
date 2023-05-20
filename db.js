const mongoose = require("mongoose");



// Define the database connection string.
// const connectionString = "mongodb://localhost:27017/calculateRate";
const connectionString="mongodb://127.0.0.1:27017/calculateRate"

// Connect to the database.
mongoose.connect(connectionString).then(() => {
    console.log('data base connected')
}).catch((err) => {
    console.log('error from db connection', err)
})
