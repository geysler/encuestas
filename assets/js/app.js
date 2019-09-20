window.addEventListener('DOMContentLoaded', function() {
    // Constructor
        function encuesta(gerente, servicio, sugerencia){
        this.gerente = gerente;
        this.servicio = servicio;
        this.sugerencia = sugerencia;
    }
    
    //EventListener
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function(e){
        e.preventDefault();

        const gerente = document.getElementById('gerente');
        const gerenteSeleccionado = gerente.option[gerente.selectIndex].value;

        console.log('gerenteSeleccionado');
        console.log('presionado');
      });
});
