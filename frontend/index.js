function callback() {
	fetch("http://localhost:3500/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ username: "izzah", password: "Izzah786@%$" }),
	})
		.then((response) => response.json())
		.then((data) => {
			// Handle the fetched data here
			console.log("Data: ", data);
		})
		.catch((error) => {
			// Handle any errors that occurred during the fetch request
			console.log("Error: ", error);
		});
}

callback();
