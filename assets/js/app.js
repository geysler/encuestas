var btnEnviar = document.getElementById('enviar');
btnEnviar.addEventListener('click', obtenerdatos);

if (localStorage.getItem("registros") != null ) {
    contarEncuestas();
}


function obtenerdatos(e) {
    e.preventDefault();
    
    var gerente = document.getElementById('gerente');
    var gerenteSelect = gerente.options[gerente.selectedIndex].value;
    
    var servicio = document.getElementById('servicio');
    var servicioSelect = servicio.options[servicio.selectedIndex].value;
    
    var sugerencia = document.getElementById('sugerencia').value;
    
    var f = new Date();
    var fecha = ("0" + f.getDate()).slice(-2) + "/"+ ("0" + (f.getMonth() + 1)).slice(-2) + "/" + f.getFullYear() + "-"  + f.getHours() + ":" + ("0" + f.getMinutes ()).slice(-2) + ":" + ("0" + f.getSeconds ()).slice(-2);

    var data = {
        gerente: gerenteSelect,
        servicio: servicioSelect,
        sugerencia: sugerencia,
        fecha: fecha
    };

    if (localStorage.getItem("registros") === null ) {
        var registros = [];

    } else {
        var registros = JSON.parse(localStorage.getItem("registros"));
    }

    registros.push(data);
    localStorage.setItem("registros",JSON.stringify(registros));
    
    Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Tu registro ha sido guardado',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("form").reset();
      document.getElementById("enviar").disabled = true;
}

var btnMostrar = document.getElementById('btnmostrar');
btnMostrar.addEventListener('click', function(e){
    e.preventDefault();

        Swal.fire({
            title: '¿Estás seguro de subir los resultados?',
            text: "¡Recuerda tener mínimo 125 encuestas!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, subirlo!'
          }).then((result) => {
            if (result.value) {
                var data = localStorage.getItem("registros");
                var encuesta = JSON.parse(data);
                subirEncuestas(encuesta)
                .then(function(){
                    console.log('si');
                    localStorage.removeItem("registros");
                    contarEncuestas();
                    Swal.fire(
                        'Hecho!',
                        'Tu encuesta ha sido subida.',
                        'success'
                      )
                })
                .catch(error => {
                    console.log('no');
                    Swal.fire(
                        'Oops!',
                        'Error al subir las encuestas.',
                        'error'
                    );
                })
              
            }
          })
    
    .catch(err => console.log(err));
    
});

async function subirEncuestas (encuesta) {

    var db = firebase.firestore();
    encuesta.forEach(element => {

    db.collection("encuestas").add({
            gerente: element.gerente,
            servicio: element.servicio,
            sugerencia: element.sugerencia,
            fecha: element.fecha
        })
        .then(res => {
            console.log(res._key.path.segments[1]);
            promesa.push(res._key.path.segments[1]);
        })
        .catch(err => console.log('error'));
    });
    

};

  var eventoClick = function() {
    contarEncuestas(1);
    
  }

  function contarEncuestas(clic=0) {

    if (localStorage.getItem("registros") != null) {
        var un_array = JSON.parse(localStorage.getItem("registros"));
        var cont = un_array.length+clic;
        document.getElementById("demo").innerHTML = cont;
    } else {
        document.getElementById("demo").innerHTML = '';
    }
    
  }

  function validar(){
    var validado = true;
    elementos = document.getElementsByClassName("inputFormu");
    for(i=0;i<elementos.length;i++){
      if(elementos[i].value == "" || elementos[i].value == null){
      validado = false
      }
    }
    if (validado) {
    document.getElementById("enviar").disabled = false;
    
    } else {
       document.getElementById("enviar").disabled = true;   
    }
  }

