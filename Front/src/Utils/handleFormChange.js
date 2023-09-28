import validacion from "./validacion";

function handleChange(e, Data, setData, error, setError) {
	if (error.length > 0) {
		const error = validacion(Data);
		setError(error);
	}
	if (e.target.name === "genres") {
		setData({
			...Data,
			genres: Array.from(e.target.selectedOptions, (item) => item.value),
		});
		return;
	}
	if (e.target.name === "platforms") {
		setData({
			...Data,
			platforms: Array.from(e.target.selectedOptions, (item) => item.value),
		});
		return;
	}
	if (e.target.name === "name") {
		setData({
			...Data,
			name: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
		});
		return;
	}

	if (e.target.name === "platforms") {
		setData({
			...Data,
			platforms: e.target.value.split(","),
		});
		return;
	}

	setData({
		...Data,
		[e.target.name]: e.target.value,
	});
}

export default handleChange;
