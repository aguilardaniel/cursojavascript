/*
El sistema es un cotizador para planes de 
Menús Digitales para restaurantes y casas de comidas.

La idea es que el usuario obtenga el valor del plan que
más le sirva según sus necesidades.

Hay tras planes con distintas características.

Plan A ("Inicial"):
    - Hasta 30 productos (si o si)
    - Sin soporte personalizado

Plan B ("Medium"): 
    - Con distintas versiones (hasta 150, hasta 500, hasta 3000 o ilimitados productos) y distintos descuentos en cada uno
    - Sin soporte personalizado

Plan C ("Premium"):
    - Con distintas versiones (hasta 30, hasta 150, hasta 500, hasta 3000 o ilimitados productos) y distintos descuentos en cada uno
    - Soporte via WhatsApp 






Manejo del descuento:

Modificando la variable descuentoPorcentaje en el código
hacemos que el sistema aplique automáticamente el descuento
que esté activo en ese momento (Este es un descuento fijo)

Tambien se aplica un descuento que se suma al anterior dependiendo 
la cantidad de productos con la que quiera trabajar el usuario
A menor cantidad de productos, mayor es el descuento
esto se maneja con la variable descuentoExtra


*/

let recomendacion = document.getElementById("recomendacion");
let cantidadProductosHtml= document.getElementById("cantidadProductos");
let requiereSoporteHtml= document.getElementById("requiereSoporte");
let labelCantidad= document.getElementById("labelCantidad");
let listaDePlanesCotizados = document.getElementById("listaDePlanesCotizados");
let imagen2 = document.getElementById("imagen2");

let botonVerHtml= document.getElementById("botonVer");
let cotizarHtml= document.getElementById("cotizar");
let cantidadString="";
let soportePersonalizado;
let cantidadDeProductos;

let planYaCotizado;
let planesCotizados=[];


fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  .then((response) => response.json())
  .then((data) => {
    
    const dittoImage = data.sprites.front_default;
    console.log("Imagen de Ditto:", dittoImage);

    
    const imgElement = document.createElement("img");
    imgElement.src = dittoImage;
    imagen2.appendChild(imgElement);
  })
  .catch((error) => console.error("Error:", error));


const respuestaDelLocalStorage = (clave)=>{

    return new Promise((resolve, reject) => {

        
            
            respuesta= JSON.parse(localStorage.getItem(clave));
            

        if(respuesta && respuesta.length!==0){
            console.log(respuesta);
            resolve(respuesta);

        }else{
            console.log(respuesta);
            reject("No cotizaste ningún plan aún");

        }

    })

}



//----- Array y Array de Objetos--------

const planes=[
    {nombre:"Plan Inicial", precio: 30000},
    {nombre:"Plan Medium", precio: 75000},
    {nombre:"Plan Premium", precio: 125000},
];




let planesConDescuento=[];

//----- Array y Array de Objetos -----



let requiereSoporte;
let hayCantidad=false;
let planSugerido;
let descuentoPorcentaje= 10;
let descuentoExtra;
let ofertaCompleta="";



const limiteDeProductos1= 30;
const limiteDeProductos2= 150;
const limiteDeProductos3= 500;
const limiteDeProductos4= 3000;

//const fecha = luxon.DateTime.now();
const DateTime = luxon.DateTime;




//----- Funciones--------
function tomarFechaActual(){
    const now= DateTime.now();

const fechaActual = now.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
return fechaActual;
}

function filtrarElementosViejos(){

   planesCotizados = planesCotizados.filter((planCotizado) => planCotizado.tiempo < 1);
   guardarPlanes();
   

}

function generarDescuentos(plan){
    

    let precioConDescuentoMinimo = planes[plan].precio - planes[plan].precio * (descuentoPorcentaje) / 100;
    planesConDescuento.push(precioConDescuentoMinimo);

}


function guardarPlanes(){

    localStorage.setItem("Cotizaciones" , JSON.stringify(planesCotizados));

}

function mostrarCotizacionesAnteriores(){

   
        

    respuestaDelLocalStorage("Cotizaciones")
        .then((resp)=>{

            planesCotizados= resp;

        })
        .catch((resp)=>{

            listaDePlanesCotizados.innerHTML+= `
        
        <p><b>${resp}</b> </p>
        <hr>`;


        })

    listaDePlanesCotizados.innerHTML= ``;

    planesCotizados.forEach(planCotizado => {

        actualizarTiempoRestante(planCotizado);
        
        
        //Ejecuta la funcion para actualizar el tipo restante disponible de las cotizaciones ya hechas
        
        
        
    });
 

    filtrarElementosViejos();


    planesCotizados.forEach(planCotizado => {

       
        
        
        //Ejecuta la funcion para actualizar el tipo restante disponible de las cotizaciones ya hechas
        
        listaDePlanesCotizados.innerHTML+= `
        
        <h3>${planCotizado.plan}</h3>
        <p><b>¿Incluye Soporte via WhatsApp?: </b> ${planCotizado.SoporteViaWhatsApp}</p>
        <p><b>Cantidad Maxima de productos:</b> ${planCotizado.maximoDeProductos}</p>
        <p><b>Valor:</b> $${planCotizado.precio}</p>
        <p><b>Cotizado el día: </b>${ planCotizado.fecha}hs</p>
        <button type="button" class="btn btn-success">Lo Quiero...</button>
        <hr>`;
        
    });
    
}


function mostrarDescuentos(plan){


    ofertaCompleta += "- " + planes[plan].nombre + " = $" + planesConDescuento[plan] + "<br>";
    

}

function actualizarTiempoRestante(planCotizado){
    end = DateTime.fromFormat(tomarFechaActual(), "dd/MM/yyyy, HH:mm:ss");
    start = DateTime.fromFormat(planCotizado.fecha, "dd/MM/yyyy, HH:mm:ss");
    let diff = end.diff(start); // default unit is milliseconds
    let diferenciaEnMeses = diff.as('months');
    
    planCotizado.tiempo = diferenciaEnMeses;
    guardarPlanes();
    


    
   

}

function generarDescuentoFinal(plan){
    let limiteActual="Ilimitados";

    if(cantidadDeProductos<=limiteDeProductos1){
        descuentoExtra=20;
        limiteActual= limiteDeProductos1;
    }
    else if(cantidadDeProductos>limiteDeProductos1 && cantidadDeProductos<=limiteDeProductos2){
        descuentoExtra=15;
        limiteActual= limiteDeProductos2;
    }
    else if(cantidadDeProductos>limiteDeProductos2 && cantidadDeProductos<=limiteDeProductos3){
        descuentoExtra=10;
        limiteActual= limiteDeProductos3;
    }
    else if(cantidadDeProductos>limiteDeProductos3 && cantidadDeProductos<=limiteDeProductos4){
        descuentoExtra=5;
        limiteActual= limiteDeProductos4;
    }else{
        descuentoExtra=0;
    }

    let precioConDescuento = planes[plan].precio - planes[plan].precio * (descuentoPorcentaje + descuentoExtra) / 100;
    

    
    
   

    let cotizacionActual={
        plan: planes[plan].nombre,
        SoporteViaWhatsApp: requiereSoporte===true?"Si":"No",
        maximoDeProductos: limiteActual,
        precio: precioConDescuento,
        fecha:  tomarFechaActual(),
        tiempo: 0,
    };




    planesCotizados.forEach(planCotizado => {

        
       actualizarTiempoRestante(planCotizado);
       
        //Ejecuta la función para actualizar el tipo restante disponible de las cotizaciones ya hechas
        
        if(planCotizado.plan===cotizacionActual.plan 
            && planCotizado.maximoDeProductos=== cotizacionActual.maximoDeProductos
            && planCotizado.precio === cotizacionActual.precio)
        {

            
            planYaCotizado=true;
            planCotizado.fecha=  tomarFechaActual();
            guardarPlanes();
            
           
            mostrarCotizacionesAnteriores();

        }
        
    });
    

    
    if(!planYaCotizado===true){

    planesCotizados.unshift(cotizacionActual);
    guardarPlanes();
    //localStorage.setItem("Cotizaciones" , JSON.stringify(planesCotizados));
    mostrarCotizacionesAnteriores();

    }
    

    filtrarElementosViejos();
    //y despues filtra los elementos que hace más de un mes fueron cotizados
      
    
    
    return precioConDescuento;



}

function recomendarPlan(plan){

const valorFinalConDescuentos = generarDescuentoFinal(plan);
const descuentoTotalAplicado = descuentoPorcentaje + descuentoExtra;

recomendacion.innerHTML= `<p class="ml-3"> Te sugerimos contratar nuestro <strong> ${planes[plan].nombre} </strong><br><br> 
            Para la cantidad de productos que definiste <br>podemos hacerte <strong> un descuento de  ${descuentoTotalAplicado}% </strong> en el plan anual.
            <br><br> Su valor final es de: <strong> $${valorFinalConDescuentos} por año </strong></p>`;


}

function generarDescuentosYMostrar(vectorPlanes, funcionDefinida){
    
    /* La función de orden superior definida puede usarse con:
    generarDescuentos o mostrarDescuentos */
    ofertaCompleta="";
    //Reinicia los datos de ofertaCompleta para evitar que le queden datos anteriores guardados

    for (let i = 0; i < vectorPlanes.length; i++) {
       funcionDefinida(i);
      }

        

    
}
   



//----- Fin Funciones -----

mostrarCotizacionesAnteriores();

cotizarHtml.addEventListener("click", (event)=>{

    event.preventDefault();
    planYaCotizado=false;
    //operador logico para agregar la clase oculto a un boton en caso de que no la contenga
    !botonVerHtml.classList.contains('oculto')&&botonVerHtml.classList.add('oculto');
    cantidadString = cantidadProductosHtml.value;
    soportePersonalizado = requiereSoporteHtml.value;

    //Evalúa cuantos productos tiene
    
    cantidadDeProductos= parseInt(cantidadString);

    //utiliza la funcion de orden superior
    generarDescuentosYMostrar(planes, generarDescuentos);
    generarDescuentosYMostrar(planes, mostrarDescuentos);
    
        if(!isNaN(cantidadDeProductos) && cantidadDeProductos>=1){

            hayCantidad=true;   
        
        }else{
            
            //Muestra una advertencia para que se ingrese un numero válido en el form y sale de la ejecución de la función
            
            recomendacion.innerHTML= `<div class="mb-0"><p class="bg-warning"><strong>Ingresá un número válido</strong> para generarte un descuento</p>
            <p>O mirá nuestros planes <strong>sin descuentos</strong></p> <br> <div>
            `;
            
            botonVerHtml.classList.remove('oculto');
            

            return;

            
            
           

        }

    //Evalúa si necesita soporte
    let pidioSoporte=0;
    let avisoSoporte="";
    while(pidioSoporte<=1){

        if(pidioSoporte==1){
            avisoSoporte="Ingresá un dato válido \n";
        }
        
       
        if( soportePersonalizado ==="SI" || 
            soportePersonalizado ==="si" || 
            soportePersonalizado ==="Si" || 
            soportePersonalizado ==="sI"){
            requiereSoporte=true;
            break;

        }else if(soportePersonalizado ==="NO" || 
            soportePersonalizado ==="no" || 
            soportePersonalizado ==="No" || 
            soportePersonalizado ==="nO"){

            requiereSoporte=false;
            break;

        }else{
            pidioSoporte++;
        }


    }

    //Inteta ubicar al cliente en uno de los planes

    if(hayCantidad===true && cantidadDeProductos<=30 && requiereSoporte===false){
        planSugerido=0;    
    }else if(cantidadDeProductos>=30 && requiereSoporte===false){
        planSugerido=1;
    }else if(requiereSoporte===true){
        planSugerido=2;
    }


    //Muestra un mensaje correspondiente a cada situación
    //incluso si no ingresó los datos que se le pidió

    switch (planSugerido) {
        case 0:
            recomendarPlan(planSugerido);
            break;
        
        case 1:
            recomendarPlan(planSugerido);
            break;
        
        case 2:
            recomendarPlan(planSugerido);
            break;

        default:
            alert(`Te sugerimos que nos contactes por WhatsApp\npara ayudarte a definir el mejor plan para vos\n\n${ofertaCompleta} \nNuestros vendedores podrán asignarte descuentos extras \ndependiendo de la cantidad de productos que tengas `);
            break;
    }

    

});


botonVerHtml.addEventListener("click", (event)=>{

    recomendacion.innerHTML= `<div>
    <p class="mb-0"><strong>Te sugerimos que nos contactes por WhatsApp</strong></p>
    <p>para ayudarte a definir el mejor plan para vos</p>
    <div>
    <br>${ofertaCompleta}<br>
    <p>Nuestros vendedores podrán asignarte descuentos extras <br>
    dependiendo de la cantidad de productos que tengas </p>`;
    botonVerHtml.classList.add('oculto');
    
});
