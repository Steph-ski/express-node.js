const formatJsonResponse = require("./Services/JsonResponseService");

describe('formatJsonResponse', () => {
    test('msg, statusCode and data displayed correctly', () => {
        expect(formatJsonResponse('somethings gone wrong, task not added', 406)).toStrictEqual({
            "msg": "somethings gone wrong, task not added",
            "data": [],
            "status": 406
        })
    })
    test('how function handles data param when its a string rather than an array', () => {
        expect(() => formatJsonResponse('somethings gone wrong, task not added', 406, 'silly')).toThrow(
            Error)
        })
})
