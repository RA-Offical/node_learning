const { logEvents } = require("./logEvents");

const EventEmitter = require("events");

// extending class from event emitter
class Emitter extends EventEmitter {}

// making an object
const emitter = new Emitter();

// adding log event
emitter.on("log", (messsage) => logEvents(messsage));

// emitting event after two seconds
setTimeout(() => {
	emitter.emit("log", "Log Event emitted");
}, 2000);
