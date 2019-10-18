var btnEnviar = document.getElementById('enviar');
btnEnviar.addEventListener('click', obtenerdatos);
    obtenerTotal();

    var salac = getAllUrlParams().sala;
    var EncuestaSala = `encuestas_${salac}`;
    
  if (localStorage.getItem(`encuestas_${salac}`) != null ) {
    contarEncuestas();
  }
//Obtener Datos
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
        fecha: fecha,
        sala: salac
    };

    if (localStorage.getItem(`encuestas_${salac}`) === null ) {
        var registros = [];

    } else {
        var registros = JSON.parse(localStorage.getItem(`encuestas_${salac}`));
    }

//Guardar Local Storage
    registros.push(data);
    localStorage.setItem(`encuestas_${salac}`,JSON.stringify(registros));
    
    Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Tu registro ha sido guardado',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("form").reset();
      document.getElementById("enviar").disabled = true;
      contarEncuestas();
}

//Subo encuestas Firebase
function subirEncuestas (){

    if (localStorage.getItem(`encuestas_${salac}`) === null ) {

        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ninguna encuesta guardada!',
            footer: ''
          })
          
    } else{
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
                subirEncuestasTodo();
                
                localStorage.removeItem(`encuestas_${salac}`);
                contarEncuestas();
                obtenerTotal();
                Swal.fire(
                    'Hecho!',
                    'Tu encuesta ha sido subida.',
                    'success'
                  )
            }
          })
    }
}

//Sube todas las encuestas
var db = firebase.firestore();
function subirEncuestasTodo () {

    var registros = JSON.parse(localStorage.getItem(`encuestas_${salac}`));
    registros.forEach(element => {

        
        db.collection(EncuestaSala).add({
            gerente: element.gerente,
            servicio: element.servicio,
            sugerencia: element.sugerencia,
            fecha: element.fecha,
            sala: element.sala
        })
    })
}

//Contar encuestas
  var eventoClick = function() {
    contarEncuestas(1);
  }

  function contarEncuestas(clic=0) {

    if (localStorage.getItem(`encuestas_${salac}`) != null) {
        var un_array = JSON.parse(localStorage.getItem(`encuestas_${salac}`));
        var cont = un_array.length+clic;
        document.getElementById("demo").innerHTML = cont;
    } else {
        document.getElementById("demo").innerHTML = '';
    }
    
  }

//Valida Boton para guardar
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
  //Total de encuestas
  function obtenerTotal() {
    var db = firebase.firestore();
    var salac = getAllUrlParams().sala;
    var EncuestaSala = `encuestas_${salac}`

    db.collection(EncuestaSala).get().then(function(querySnapshot) {
        var TotalID = querySnapshot.size;
        document.getElementById("TotalID").innerHTML = TotalID;
    });
  }

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

var salac = getAllUrlParams().sala;
var EncuestaSala = `encuestas_${salac}`