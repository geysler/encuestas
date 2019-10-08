//Obtener campos de la BD
'use_sctrict';

window.addEventListener('DOMContentLoaded', listeners);

function listeners() {
    //obtenerCampo ();
    //obtenerCampoGerente ();
    //obtenerCampoServicio ();
    obtenerEncuestas();
    obtenerGraficaGerente();
    obtenerGraficaServicio();
}

function obtenerEncuestas() {
    var db = firebase.firestore();
    //leer documentos
    db.collection("encuestas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const contenedor = document.getElementById('contenedorEncuestas');
            contenedor.innerHTML += `
                <tr>
                    <td>${doc.data().sugerencia}</td>
                </tr>`
        });
    });
}

    /*var db = firebase.firestore();
    db.collection("encuestas").where('servicio', '==','Excelente').get().then((querySnapshot) => {
        console.log(querySnapshot._snapshot.docChanges.length);
    });

function obtenerCampoServicio (){
    var db = firebase.firestore();
    db.collection("encuestas").where('servicio', '==','Excelente').get().then((querySnapshot) => {
        var counterServicio1 = querySnapshot._snapshot.docChanges.length;
        console.log(counterServicio1);
    });

    db.collection("encuestas").where('servicio', '==','Bueno').get().then((querySnapshot) => {
        var counterServicio2 = querySnapshot._snapshot.docChanges.length;
        console.log(counterServicio2);
    });

    db.collection("encuestas").where('servicio', '==','Regular').get().then((querySnapshot) => {
        var counterServicio3 = querySnapshot._snapshot.docChanges.length;
        console.log(counterServicio3);
    });

    db.collection("encuestas").where('servicio', '==','Malo').get().then((querySnapshot) => {
        var counterServicio4 = querySnapshot._snapshot.docChanges.length;
        console.log(counterServicio4);
    });
}

function obtenerCampo (){
    var db = firebase.firestore();
    db.collection("encuestas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var un_array = `${doc.data().id}`;
            console.log(un_array.length+1);
        });
    });
}

    var gerenteSelect = "Bueno";
    var servicioSelect = "Bueno";

    var data = {
        gerente: gerenteSelect,
        servicio: servicioSelect
    };

    var gerenteSelect = "Excelente";
    var servicioSelect = "Bueno";

    var data2 = {
        gerente: gerenteSelect,
        servicio: servicioSelect
    };

    var gerenteSelect = "Regular";
    var servicioSelect = "Bueno";

    var data3 = {
        gerente: gerenteSelect,
        servicio: servicioSelect
    };

    //Excelente
    var CadenaExcelente = [data.gerente, data2.gerente, data3.gerente];
    var Search1 = "Excelente"
    var i = 0;
    var counterGerente1 = 0;
    while (i != -1)
    {
    var i = CadenaExcelente.indexOf(Search1,i);
    if (i != -1)
    {
    i++;
    counterGerente1++;
    }
    }
    console.log(counterGerente1);

    //Bueno
    var CadenaBueno = [data.gerente, data2.gerente, data3.gerente];
    var Search2 = "Bueno"
    var i2 = 0;
    var counterGerente2 = 0;
    while (i2 != -1)
    {
    var i2 = CadenaBueno.indexOf(Search2,i2);
    if (i2 != -1)
    {
    i2++;
    counterGerente2++;
    }
    }
    console.log(counterGerente2);
    
    //Regular
    var CadenaRegular = [data.gerente, data2.gerente, data3.gerente];
    var Search3 = "Regular"
    var i3 = 0;
    var counterGerente3 = 0;
    while (i3 != -1)
    {
    var i3 = CadenaRegular.indexOf(Search3,i3);
    if (i3 != -1)
    {
    i3++;
    counterGerente3++;
    }
    }
    console.log(counterGerente3);

    //Malo
    var CadenaMalo = [data.gerente, data2.gerente, data3.gerente];
    var Search4 = "Malo"
    var i4 = 0;
    var counterGerente4 = 0;
    while (i4 != -1)
    {
    var i4 = CadenaMalo.indexOf(Search4,i4);
    if (i4 != -1)
    {
    i4++;
    counterGerente4++;
    }
    }
    console.log(counterGerente4);

    
    
    //Excelente
    var CadenaServicioExcelente = [data.servicio, data2.servicio, data3.servicio];
    var SearchServicio1 = "Excelente"
    var iServicio = 0;
    var counterServicio1 = 0;
    while (iServicio != -1)
    {
    var iServicio = CadenaServicioExcelente.indexOf(SearchServicio1,iServicio);
    if (iServicio != -1)
    {
    iServicio++;
    counterServicio1++;
    }
    }
    console.log(counterServicio1);

    //Bueno
    var CadenaServicioBueno = [data.servicio, data2.servicio, data3.servicio];
    var SearchServicio2 = "Bueno"
    var iServicio2 = 0;
    var counterServicio2 = 0;
    while (iServicio2 != -1)
    {
    var iServicio2 = CadenaServicioBueno.indexOf(SearchServicio2,i2);
    if (iServicio2 != -1)
    {
    iServicio2++;
    counterServicio2++;
    }
    }
    console.log(counterServicio2);
    
    //Regular
    var CadenaServicioRegular = [data.servicio, data2.servicio, data3.servicio];
    var SearchServicio3 = "Regular"
    var iServicio3 = 0;
    var counterServicio3 = 0;
    while (iServicio3 != -1)
    {
    var iServicio3 = CadenaServicioRegular.indexOf(SearchServicio3,iServicio3);
    if (iServicio3 != -1)
    {
    iServicio3++;
    counterServicio3++;
    }
    }
    console.log(counterServicio3);

    //Malo
    var CadenaServicioMalo = [data.servicio, data2.servicio, data3.servicio];
    var SearchServicio4 = "Malo"
    var iServicio4 = 0;
    var counterServicio4 = 0;
    while (iServicio4 != -1)
    {
    var iServicio4 = CadenaServicioMalo.indexOf(SearchServicio4,iServicio4);
    if (iServicio4 != -1)
    {
    iServicio4++;
    counterServicio4++;
    }
    }
    console.log(counterServicio4);*/
    
    function obtenerGraficaGerente() {
        google.charts.load('current', {'packages':['corechart']});
              google.charts.setOnLoadCallback(drawChart);
        
              function drawChart() {
        
                var data = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  ['Exelente',     2],
                  ['Bueno',      2],
                  ['Regular',  5],
                  ['Malo', 5]
                ]);
        
                var options = {
                  title: ''
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        
                chart.draw(data, options);
              }
            }
        
            function obtenerGraficaServicio(){
              google.charts.load("current", {packages:["corechart"]});
              google.charts.setOnLoadCallback(drawChart2);
              function drawChart2() {
                var data = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  ['Exelente',     1],
                  ['Bueno',      1],
                  ['Regular',  1],
                  ['Malo', 1]
                ]);
        
                var options = {
                  title: '',
                  is3D: true,
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
                chart.draw(data, options);
              }
            }