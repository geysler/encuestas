
var btnEnviar = document.getElementById('enviar');
btnEnviar.addEventListener('click', obtenerdatos);

function obtenerdatos(e) {
    e.preventDefault();
    
    var gerente = document.getElementById('gerente');
    var gerenteSelect = gerente.options[gerente.selectedIndex].value;
    
    var servicio = document.getElementById('servicio');
    var servicioSelect = servicio.options[servicio.selectedIndex].value;
    
    var sugerencia = document.getElementById('sugerencia').value;
    
    var data = {
        gerente: gerenteSelect,
        servicio: servicioSelect,
        sugerencia: sugerencia
    };

    if (localStorage.getItem("registros") === null ) {
        var registros = [];
    } else {
        var registros = JSON.parse(localStorage.getItem("registros"));
    }

    registros.push(data);
    localStorage.setItem("registros",JSON.stringify(registros));
}


var btnMostrar = document.getElementById('btnmostrar');
btnMostrar.addEventListener('click', function(e){
    e.preventDefault();

    var data = localStorage.getItem("registros");
    var encuesta = JSON.parse(data);
    console.log(encuesta);

});
