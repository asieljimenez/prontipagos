document.addEventListener("DOMContentLoaded", () =>{
    fetch("./assets/json/servicios.json")
    .then(objeto => objeto.json())
    .then(datos => {
        const contenedor = document.getElementById("id_contenedor_tarjetas_servicios");
        const subtitulo = document.getElementById("id_subtitulo_servicios");

        const duraciones = [1500, 2000, 2500];

        // Definimos las secciones a rotar
        const secciones = [
            { lista: datos.pines, titulo: "Pines de entretenimiento" },
            { lista: datos.recargas, titulo: "Recargas móviles" },
            { lista: datos.catalogo, titulo: "Ventas por catálogo" }
        ];

        let indice = 0; // iniciamos en pines

        // función para renderizar tarjetas
        function renderizarTarjetas(lista, titulo) {
            contenedor.innerHTML = ""; // limpiar antes de renderizar
            subtitulo.textContent = titulo; // cambiar subtítulo

            lista.forEach(item => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta-servicios");

                const duracionaleatoria = duraciones[Math.floor(Math.random() * duraciones.length)];
                tarjeta.setAttribute("data-aos", "zoom-in");
                tarjeta.setAttribute("data-aos-duration", duracionaleatoria);

                const tarjetaimagen = document.createElement("img");
                tarjetaimagen.classList.add("tarjeta-servicios-imagen");
                tarjetaimagen.src = item.imagen;
                tarjetaimagen.title = item.nombre;
                tarjetaimagen.alt = item.nombre;
                tarjetaimagen.setAttribute("loading", "lazy");

                tarjeta.appendChild(tarjetaimagen);
                contenedor.appendChild(tarjeta);
            });
        }

        // render inicial
        renderizarTarjetas(secciones[indice].lista, secciones[indice].titulo);

        // cada 10 segundos cambiar sección
        setInterval(() => {
            indice = (indice + 1) % secciones.length; // avanza y vuelve al inicio
            renderizarTarjetas(secciones[indice].lista, secciones[indice].titulo);
        }, 10000);
    });
});