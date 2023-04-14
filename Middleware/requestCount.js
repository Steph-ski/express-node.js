const DBService = require("../Services/DBService")

const requestCount = async (req,res,next) => {

    const collection = await DBService('count')
    let data = await collection.findOne({})

    let count = data.count+1

    await collection.updateOne(data, {$set: {count:count}})
    next()
}

module.exports = requestCount

