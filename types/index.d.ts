export interface Plan {
    time: Time,
    task: Function
}

export class Tasker {
    public constructor(frequency?: number)
    private frequency: number
    private cycle: ReturnType<typeof setInterval>
    private plans: Array<Plan>

    /** This method can do any function as it catches errors */
    private doTask(task: Function): void
    /** Starts new Tasker cycle interrupting the current one (if exists) */
    private startCycle(): void
    /** Returns frequency of the Tasker cycle in milliseconds */
    public getFrequency(): number
    /** Sets new frequency of the Tasker cycle (in milliseconds) without restarting the cycle */
    public setFrequency(frequency: number): boolean
    /** Sets new frequency of the Tasker cycle (in milliseconds) and restarts the cycle */
    public forceSetFrequency(frequency: number): boolean
    /** Adds a task to be completed in a specified time */
    public onTime(time: Time, task: Function): void
}

export interface TimeParams {
    years: number | undefined,
    weeks: number | undefined,
    days: number | undefined,
    hours: number | undefined,
    minutes: number | undefined,
    seconds: number | undefined,
    milliseconds: number | undefined
}

export interface TimeJSON extends TimeParams {
    start: Date
}

export class Time {
    public constructor()
    private createdAt: Date
    private time: TimeParams

    private set(): Time
    private increment(): undefined
    private loadFromJSON(): void
    /** Set amount of years
     * 
     * @param years 
     */
    public setYears(years: number): Time
    /** Set amount of weeks
     * 
     * @param weeks 
     */
    public setWeeks(weeks: number): Time
    /** Set amount of days
     * 
     * @param days 
     */
    public setDays(days: number): Time
    /** Set amount of days
     * 
     * @param hours 
     */
    public setHours(hours: number): Time
    /** Set amount of minutes
     * 
     * @param minutes 
     */
    public setMinutes(minutes: number): Time
    /** Set amount of seconds
     * 
     * @param seconds 
     */
    public setSeconds(seconds: number): Time
    /** Set amount of milliseconds
     * 
     * @param milliseconds 
     */
    public setMilliseconds(milliseconds: number): Time
    /** Copies all parameters of an existing Time()*/
    public copy(time: Time): Time
    public fromJSON(json: TimeJSON): Time
    /** Date() from which the selected time will be calculated */
    public getDeclarationDate(): Date
    /** Returns the timestamp of the selected time */
    public toTimestamp(): number
    /** Returns Object with years, weeks, days, hours, minutes, seconds, milliseconds and start time fields */
    public toJSON(): TimeJSON
    /** Returns Date() instance from Time() */
    public toDate(): Date
    /** By default, Time() saves the time it was declared in order to calculate the selected time for Tasker. This method overrides sets the declaration time to current*/
    public refresh(): Time
    /** Undoes all 'set' actions */
    public clear(): Time
}