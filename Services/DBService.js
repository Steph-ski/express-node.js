const {MongoClient} = require("mongodb");
const url = "mongodb://root:password@localhost:27017"

const DBService = async (details) =>  {
    const connection = await MongoClient.connect(url)
    const db = connection.db('todos')
    const collection = db.collection(details)
    return collection
}

module.exports = DBService
