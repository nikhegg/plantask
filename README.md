# About
Plantask is a simple task scheduler for Node.js. You can plan some tasks to be done in a specific time without setting any timeouts.

# Example

```js
const {Tasker, Time} = require('plantask');
const tasker = new Tasker();
const time = new Time();
time.setMinutes(30);
tasker.onTime(time, function() {
    console.log("This message will be printed after 30 minutes!");

    // You can refresh start date to use it further in your code
    time.refresh().setMinutes(15); 
});
```
