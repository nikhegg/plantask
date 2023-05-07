const Time = require(`./Time`)

class Tasker {
    // Frequency allows to restart timer often
    // This is useful in case of lags
    #frequency;
    #cycle;
    #plans;

    constructor(frequency) {
        if(frequency == undefined || frequency <= 0) frequency = 500;
        this.#frequency = frequency;
        this.#plans = new Array();
    }

    #doTask(task) { 
        try {
            task();
        } catch (error) {
            console.log(`\n[TASKER]: An error occured while doing the planned task`);
            console.log(error);
        }
    }
    #startCycle() {
        // Should be able to pause()?
        if(this.#cycle != undefined) clearInterval(this.#cycle);
        this.#cycle = setInterval(() => {
            let now = new Date();
            let todo = this.#plans.filter(x => x.time.toTimestamp() <= now.getTime());
            this.#plans = this.#plans.filter(x => x.time.toTimestamp() > now.getTime());
            todo.forEach((plan) => this.#doTask(plan.task));
            if(this.#plans.length == 0) clearInterval(this.#cycle);
        }, this.#frequency);
    }
    getFrequency() {return this.#frequency}
    setFrequency(frequency) {
        if(frequency <= 0) return false;
        this.#frequency = frequency;
        return true;
    }
    forceSetFrequency(frequency) {
        if(this.setFrequency(frequency)) {
            this.#startCycle();
            return true;
        } else return false;
    }
    /**
     * 
     * @param {Time} time 
     * @param {Function} task 
     */
    onTime(time, task) {
        let now = new Date();
        if(time.toTimestamp() <= now.getTime()) this.#doTask(task);
        else {
            this.#plans.push({time, task});
            if(this.#plans.length == 1) this.#startCycle();
        }
    }
}

module.exports = Tasker