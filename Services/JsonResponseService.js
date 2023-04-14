const formatJsonResponse = (msg, statusCode, data = []) => {
    if (Array.isArray(data)) {
        return {'msg': msg, 'data': data, 'status': statusCode}
        } else {
            throw new Error('Data must be in array format')
    }
}

module.exports = formatJsonResponse
