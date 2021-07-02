
const getArraySum = (array = []) => {
    return array.reduce((sum, current) => sum + current, 0);
}

module.exports = { getArraySum };
