var pop = require(`./population`)
var config = require(`./config`)
var utility = require(`./utility`)

var people = pop.BuildPopulation(config)

//infect a random person
var initialInfection = people[Math.floor(Math.random() * people.length)]
initialInfection.Infect()

var infectedPeople = new Set()
infectedPeople.add(initialInfection)
var severeCases = new Set()
var recoveredPeople = new Set()

console.log(`day, total population, number of infected people, number of severe cases, known cases (positive tests), number of recovered people`)
for (var day = 1; day < config.daysToSimulate; day++) {
    UpdateInfectedTime(infectedPeople, recoveredPeople)
    SpreadInfection(infectedPeople, config)
    severeCases = UpdateSevereCases(infectedPeople)

    var testsRemaining = TestSevereCases(severeCases, config.testsPerDay)
    var testsRemaining = TestSevereContacts(severeCases, testsRemaining)
    RandomTesting(people, testsRemaining)

    var knownCases = people.filter(p => p.hasBeenPositivelyTested)
    console.log(`${day}, ${people.length}, ${infectedPeople.size}, ${severeCases.size}, ${knownCases.length}, ${recoveredPeople.size}`)
}

function UpdateInfectedTime(infectedPeople, recoveredPeople) {
    var newRecoveries = new Set()
    for (var person of infectedPeople) {
        person.UpdateInfectionTime()
        if (person.isRecovered) {
            recoveredPeople.add(person)
            newRecoveries.add(person)
        }
    }

    for (var person of newRecoveries) {
        infectedPeople.delete(person)
    }
}

function UpdateSevereCases(infectedPeople) {
    var severeCases = new Set()
    for (var person of infectedPeople) {
        if (person.HasSevereSymptoms()) {
            severeCases.add(person)
        }
    }

    return severeCases;
}

function TestSevereCases(peopleToTest, numTests) {
    for( var person of peopleToTest) {
        if(numTests <= 0) {
            return 0
        }
        if(!person.hasBeenPositivelyTested) {
            person.Test()
            numTests--
        }
    }

    return numTests
}

function TestSevereContacts(sourcesToTest, numTests) {
    var contacts = new Set()
    for(var person of sourcesToTest) {
        for(var connection of person.connections) {
            if(!connection.hasBeenTested) {
                contacts.add(connection)
            }
        }
    }

    var howMany = Math.min(contacts.size, numTests)
    var peopleToTest = utility.getRandomSubarray(Array.from(contacts), howMany)
    for(var person of peopleToTest){
        person.Test()
        numTests--
    }

    return numTests
}

function RandomTesting(people, numTests) {
    var candidatesToTest = people.filter(p => !p.hasBeenTested)
    var peopleToTest = utility.getRandomSubarray(candidatesToTest, numTests)

    for(var person of peopleToTest) {
        if(numTests <= 0) {
            break
        }
        numTests--
        person.Test()
    }
}

function SpreadInfection(infectedPeople, config) {
    var infectionRate = config.infectionRate
    var peopleToInfect = new Set()
    for (var person of infectedPeople) {
        if (person.hasBeenPositivelyTested) {
            //people who have tested positive are successfully quarantined
            continue
        }
        var numContacts = Math.round(Math.random() * (config.contactsPerDay.hi - config.contactsPerDay.lo) + config.contactsPerDay.lo)
        var howMany = Math.min(person.connections.length, numContacts)
        var peopleContacted = utility.getRandomSubarray(person.connections, howMany)
        for (var contact of peopleContacted) {
            var infect = Math.random() < infectionRate
            if (infect && !contact.isInfected) {
                peopleToInfect.add(contact)
            }
        }
    }

    for (var person of peopleToInfect) {
        var isSevere = Math.random() < config.severeSymptomRate
        person.Infect(isSevere)
        infectedPeople.add(person)
    }
}