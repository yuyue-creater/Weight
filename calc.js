function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b
    }, 0)
}

module.exports.sum = sum

exports.add = function (x, y) { 
    return x + y; 
}; 
    
exports.sub = function (x, y) { 
    return x - y; 
}; 
    
exports.mult = function (x, y) { 
    return x * y; 
}; 
    
exports.div = function (x, y) { 
    return x / y; 
};