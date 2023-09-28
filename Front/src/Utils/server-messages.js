const showServerMessage = (message, type) => {
	const serverMessageElement = document.getElementById("serverMessage");
	serverMessageElement.childNodes[0].innerHTML = message;


	if (type === "success") {
		serverMessageElement.className = "alert alert-success";
	} else if (type === "error") {
		serverMessageElement.className = "alert alert-error";
	}
		serverMessageElement.style.display = "block";

};

// Función para ocultar el mensaje del servidor

export { showServerMessage };
