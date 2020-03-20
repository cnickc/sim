module.exports = class Person {
    constructor(x, y, recoveryTime, daysToShowSevereSymptoms) {
        this.x = x
        this.y = y
        this.connections = []
        this.isInfected = false
        this.hasSevereSymptoms = false
        this.isRecovered = false
        this.daysSinceInfection = 0
        this.hasBeenTested = false
        this.hasBeenPositivelyTested = false
        this.recoveryTime = recoveryTime
        this.daysToShowSevereSymptoms = daysToShowSevereSymptoms
    }

    Infect(isSevere) {
        if (!this.isInfected && !this.isRecovered) {
            if(isSevere) {
                this.hasSevereSymptoms = true
            }
            this.isInfected = true
            this.daysSinceInfection = 0
        }
    }

    UpdateInfectionTime() {
        if (this.isInfected && !this.isRecovered) {
            this.daysSinceInfection++
        }
        if (this.daysSinceInfection >= this.recoveryTime) {
            this.isRecovered = true
        }
    }

    HasSevereSymptoms() {
        return this.hasSevereSymptoms && this.daysSinceInfection > this.daysToShowSevereSymptoms
    }

    Test() {
        this.hasBeenTested = true
        if (this.isInfected && !this.isRecovered) {
            this.hasBeenPositivelyTested = true
        }
    }
}
