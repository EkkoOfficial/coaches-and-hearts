module.exports = function (oldObject) {
    var newObject = {};
    Object.keys(oldObject).forEach(function (key) {
        var member = oldObject[key];
        if (['number', 'string', 'boolean'].includes(typeof member)) {
            newObject[key] = oldObject[key];
        }
    });
    return newObject;
};
