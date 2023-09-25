
const validacion = (data) => {
    let errores = [];
    let re;
    if (data.name.length > 50) errores.push("El nombre no puede tener más de 50 caracteres");
    if (data.description_raw.length > 500) errores.push("La descripción no puede tener más de 500 caracteres");
    if (data.genres.length <= 0) errores.push("Elegí almenos un género");
    data.name ? null : errores.push("El nombre no puede estar vacío");
    data.description_raw ? null : errores.push("La descripción no puede estar vacía");
    data.platforms ? null : errores.push("La plataforma no puede estar vacía");
    data.background_image ? null : errores.push("La imagen no puede estar vacía");
    data.released ? null : errores.push("La fecha de lanzamiento no puede estar vacía");
    data.rating ? null : errores.push("El rating no puede estar vacío");
    re = /^[a-zA-Z0-9\s]+$/;
    re.test(data.name) ? null : errores.push("El nombre no puede contener símbolos");
    re.test(data.plataform) ? null : errores.push("La plataforma no puede contener símbolos");
    re = /^[0-9]+$/;
    re.test(data.rating) ? null : errores.push("El rating solo puede contener numeros");
    data.background_image.includes("http") ? null : errores.push("La imagen debe ser una URL");
    data.rating > 5 ? errores.push("El rating no puede ser mayor a 5") : null;
    data.rating < 0 ? errores.push("El rating no puede ser menor a 0") : null;
    return errores;
};

export default validacion;
