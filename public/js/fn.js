// Función para sanitizar entrada del usuario
const cleanData = (input) => {
    if (typeof input !== "string") {
        return input;
    }
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// Función que se ejecuta al enviar el formulario
const sendData = (event) => {
    
    /* event.preventDefault(); */ // Evitar que el formulario se envíe automáticamente
   
    // Obtener y sanitizar valores del formulario
    const nombre = cleanData(document.getElementById("nombre").value);
    const email = cleanData(document.getElementById("email").value);
    const equipoORefaccion = cleanData(document.getElementById("equipoORefaccion").value);
    const comentarios = cleanData(document.getElementById("comentarios").value);

    const data = {nombre, email, equipoORefaccion, comentarios};
    
    // Mostrar datos sanitizados para corroborar la limpieza
    console.log("Datos sanitizados:", { nombre, email, equipoORefaccion, comentarios });

    try {
        fetch('http://localhost:3500/sendData', {
            
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        
        }).then(res => res.json())
        .then(res => {
            console.log(res); 
            alert("¡Formulario enviado!");
        });
    
    } catch (error) {
        console.error("Error en la conexión:", error);
        alert("No se pudo enviar el formulario.");
    }
    
};
