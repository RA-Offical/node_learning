function verifyRoles(...allowedRoles) {
	return (req, res, next) => {
		if (!req?.roles) {
			return res.sendStatus(401);
		}

		const rolesArray = [...allowedRoles];
		console.log(rolesArray);
		console.log(req.roles);

		const isAllowed = rolesArray.some((role) => req.roles.includes(role));

		if (!isAllowed) {
			return res.sendStatus(401);
		}

		next();
	};
}

module.exports = verifyRoles;
