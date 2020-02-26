module.exports = function parseStringAsArray(stringToParse,chartToSplit){
    return stringToParse.split(chartToSplit).map(tech => tech.trim()); 
}

