module.exports = {
    camelize: string => string.replace(/_\w/g, snakePart =>
        snakePart[1].toUpperCase()
    ),
    camelizeKeys: obj => {
        const clone = {}
        for(let key in obj){
            clone[module.exports.camelize(key)] = obj[key]
        }
        return clone
    }
}