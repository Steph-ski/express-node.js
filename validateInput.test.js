const validateInput = require('./Services/ValidationService')

describe('formatJsonResponse', () => {
    test('validates a string against a bespoke REGEX and returns true', () => {
        expect(validateInput('feed fish')).toStrictEqual(true)
    })
    test('validates a string against a bespoke REGEX and returns false', () => {
        expect(validateInput('FEED FISH')).toStrictEqual(false)
    })
    test('validates an array as false as incorrect data type', () => {
        expect(validateInput([])).toStrictEqual(false)
    })
})