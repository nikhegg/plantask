class Time {
    #createdAt;
    #time;

    constructor() {
        this.#createdAt = new Date();
        this.#time = {};
    }

    #set(number, cell) {
        if(isNaN(number) || number < 0) return;
        this.#time[cell] = number;
        if(this.#time[cell] <= 0) delete this.#time[cell];
        return this;
    }
    #increment(number, cell) {
        if(isNaN(number)) return;
        if(!this.#time[cell]) this.#time[cell] = 0;
        this.#time[cell] += number;
        if(this.#time[cell] <= 0) delete this.#time[cell];
    }
    #loadFromJSON(json) {
        if(!json) return this
        if(json.years) this.setYears(json.years)
        if(json.weeks) this.setWeeks(json.weeks)
        if(json.days) this.setDays(json.days)
        if(json.hours) this.setHours(json.hours)
        if(json.minutes) this.setMinutes(json.minutes)
        if(json.seconds) this.setSeconds(json.seconds)
        if(json.milliseconds) this.setMilliseconds(json.milliseconds)
        
    }
    setYears(years) {return this.#set(years, "years");}
    setWeeks(weeks) {return this.#set(weeks, "weeks");}
    setDays(days) {return this.#set(days, "days");}
    setHours(hours) {return this.#set(hours, "hours");}
    setMinutes(minutes) {return this.#set(minutes, "minutes");}
    setSeconds(seconds) {return this.#set(seconds, "seconds");}
    setMilliseconds(milliseconds) {return this.#set(milliseconds, "milliseconds");}
    /**
     * 
     * @param {Time} time 
     */
    copy(time) {
        this.#loadFromJSON(time.toJSON())
        return this
    }
    fromJSON(json) {
        this.#loadFromJSON(json)
        return this
    }
    toTimestamp() {
        let result = 0
        // 365 days with 24 hours with 60 minutes with 60 seconds with 1000 milliseconds
        if(this.#time.years) result += this.#time.years * 31536000000;
        
        // 7 days with 24 hours with 60 minutes with 60 seconds with 1000 milliseconds
        if(this.#time.weeks) result += this.#time.weeks * 604800000;
        
        // 24 hours with 60 minutes with 60 seconds with 1000 milliseconds
        if(this.#time.days) result += this.#time.days * 86400000;
    
        // 60 minutes with 50 seconds with 1000 milliseconds
        if(this.#time.hours) result += this.#time.hours * 3600000;

        // 60 seconds with 1000 milliseconds
        if(this.#time.minutes) result += this.#time.minutes * 60000;

        // 1000 milliseconds
        if(this.#time.seconds) result += this.#time.seconds * 1000;

        if(this.#time.milliseconds) result += this.#time.milliseconds;
        
        return (this.#createdAt.getTime() + result);
    }
    toJSON() {
        let copy = Object.assign({}, this.#time)
        copy.start = this.#createdAt
        return copy;
    }
    getDeclarationDate() {return this.#createdAt;}
    toDate() {
        return new Date(this.getTimestamp());
    }
    refresh() {
        this.#createdAt = new Date();
        return this;
    }
    clear() {
        this.#time = {};
        return this;
    }
}

module.exports = Time