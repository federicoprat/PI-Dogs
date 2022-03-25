
exports.alfabeticamente = (array, ascOrDesc) => {
    if (ascOrDesc === 'asc')
    return array.sort((a, b) => {
        if (a.name + a.name > b.name + b.name) return 1
        else if (a.name + a.name < b.name + b.name) return - 1
        else return 0
    })
    if (ascOrDesc === 'desc')
    return array.sort((a, b) => {
        if (a.name + a.name > b.name + b.name) return -1
        else if (a.name + a.name < b.name + b.name) return 1
        else return 0
    })
}