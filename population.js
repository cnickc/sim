var Person = require(`./person`)
var utility = require(`./utility`)

function BuildPopulation(settings) {
    var people = []
    for (var i = 0; i < settings.population; i++) {
        var x = Math.round(Math.random() * 100) / 100
        var y = Math.round(Math.random() * 100) / 100
        var p = new Person(x, y, settings.recoveryTime, settings.daysToShowSevereSymptoms)
        people.push(p)
    }

    people.sort((p1, p2) => p2.x - p1.x + (p2.y - p1.y) / 100)

    for (var person of people) {
        var howMany = Math.round(Math.random() * (settings.connections.hi - settings.connections.lo) + settings.connections.lo)
        var contacts = GetSomePeopleInRange(person, people, settings.connections.range, howMany)
        person.connections = contacts
    }

    return people
};

function GetSomePeopleInRange(person, population, range, numToSelect) {
    //assume population is sorted.  Too expensive to do it on each function call
    var potentials = []
    for (var sample of population) {
        if (sample.x < person.x - range) {
            break
        }
        if (sample.x > person.x + range) {
            continue
        }
        if (Math.abs(sample.y - person.y) > range) {
            continue
        }
        potentials.push(sample)
    }

    var howMany = Math.min(numToSelect, potentials.length)
    var contacts = utility.getRandomSubarray(potentials, howMany)

    return contacts
}

exports.BuildPopulation = BuildPopulation