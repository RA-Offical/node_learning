// making whitelist of applications that can access our beckend
const whitelist = ["https://www.google.com", "http:localhost:5500"];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
