const validateInput = (task) => {
    let strRegex = /^[a-z ,.'-]+$/

    return strRegex.test(task)
}

module.exports = validateInput