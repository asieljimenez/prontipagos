/*Función para tomar los parametros de la url*/
  // Cargar el contenido de footer.html y agregarlo al div con id="footer"
  fetch('/includes/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.cont-footer').innerHTML = data;
  })
  .catch(error => console.error('Error cargando el footer:', error));


