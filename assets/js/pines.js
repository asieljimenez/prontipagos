document.addEventListener("DOMContentLoaded", () => {
const contenedor = document.getElementById("prestamos_prontipagos_360");

function generarPin() {
    const img = document.createElement("img");
    img.src = "./assets/img/pin.webp";
    img.classList.add("pin-animado");

    // tamaño aleatorio entre 30px y 80px
    const size = Math.floor(Math.random() * 50) + 30;
    img.style.width = size + "px";

    // posición aleatoria dentro del section
    const maxX = contenedor.clientWidth - size;
    const maxY = contenedor.clientHeight - size;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    contenedor.appendChild(img);

    // eliminar después de la animación (3s)
    setTimeout(() => {
    img.remove();
    }, 3000);
}

// generar pins cada cierto intervalo
setInterval(generarPin, 800);
});