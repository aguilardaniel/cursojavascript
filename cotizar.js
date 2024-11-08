/*
El sistema es un cotizador para planes de 
Menús Digitales para restaurantes y casas de comidas.

La idea es que el usuario obtenga el valor del plan que
más le sirva según sus necesidades.

Hay tras planes con distintas características.

Plan A ("Inicial"):
    - Hasta 30 productos
    - Sin soporte personalizado

Plan B ("Medium"): 
    - Productos ilimitados
    - Sin soporte personalizado

Plan C ("Premium"):
    - Productos ilimitados
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

let botonVerHtml= document.getElementById("botonVer");
let cotizarHtml= document.getElementById("cotizar");
let cantidadString="lalala";
let soportePersonalizado;
let cantidadDeProductos;
console.log(cantidadString);



//----- Array y Array de Objetos--------

const planes=[
    {nombre:"Plan Inicial", precio: 30000},
    {nombre:"Plan Medium", precio: 75000},
    {nombre:"Plan Premium", precio: 125000},
];

localStorage.setItem("planes", JSON.stringify(planes));
//const planesJSON= JSON.stringify(planes);
//localStorage.setItem(planesJSON);

let planesConDescuento=[];

//----- Array y Array de Objetos -----



let requiereSoporte;
let hayCantidad=false;
let planSugerido;
let descuentoPorcentaje= 10;
let descuentoExtra;
let ofertaCompleta="";


//----- Funciones--------

function generarDescuentos(plan){
    

    let precioConDescuentoMinimo = planes[plan].precio - planes[plan].precio * (descuentoPorcentaje) / 100;
    planesConDescuento.push(precioConDescuentoMinimo);

}


function mostrarDescuentos(plan){

    ofertaCompleta += "- " + planes[plan].nombre + " = $" + planesConDescuento[plan] + "<br>";
    

}


function generarDescuentoFinal(plan){
    
    if(cantidadDeProductos<=30){
        descuentoExtra=20;
    }
    else if(cantidadDeProductos>30 && cantidadDeProductos<=150){
        descuentoExtra=15;
    }
    else if(cantidadDeProductos>150 && cantidadDeProductos<=500){
        descuentoExtra=10;
    }
    else if(cantidadDeProductos>500 && cantidadDeProductos<=3000){
        descuentoExtra=5;
    }else{
        descuentoExtra=0;
    }

    let precioConDescuento = planes[plan].precio - planes[plan].precio * (descuentoPorcentaje + descuentoExtra) / 100;
    return precioConDescuento;

}

function recomendarPlan(plan){

const valorFinalConDescuentos = generarDescuentoFinal(plan);
const descuentoTotalAplicado = descuentoPorcentaje + descuentoExtra;

recomendacion.innerHTML= `<p class="ml-3"> Te sugerimos contratar nuestro <strong> ${planes[plan].nombre} </strong><br><br> 
            Para la cantidad de productos que definiste <br>podemos hacerte <strong> un descuento de  ${descuentoTotalAplicado}% </strong> en el plan anual.
            <br><br> Su valor final es de: <strong> $${valorFinalConDescuentos} por año </strong></p>`;
/*
    alert(`Te sugerimos contratar nuestro ${planes[plan].nombre}\n 
            Para la cantidad de productos que definiste podemos hacerte un descuento de ${descuentoTotalAplicado}% en el plan anual\n
            Su valor final es de: $${valorFinalConDescuentos} por año`);
*/

}

function generarDescuentosYMostrar(vectorPlanes, funcionDefinida){
    
    /* La función de orden superior definida puede usarse con:
    generarDescuentos o mostrarDescuentos */
    
    for (let i = 0; i < vectorPlanes.length; i++) {
       funcionDefinida(i);
      }

        

    
}
   



//----- Fin Funciones -----


cotizarHtml.addEventListener("click", (event)=>{

    event.preventDefault();
    //operador logico para agregar la clase oculto a un boton en caso de que no la contenga
    !botonVerHtml.classList.contains('oculto')&&botonVerHtml.classList.add('oculto');
    console.log("entro al evento");
    cantidadString = cantidadProductosHtml.value;
    console.log(cantidadString);
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
            
            recomendacion.innerHTML= `<p class="bg-warning"><strong>Ingresá un número válido</strong> para generarte un descuento</p>
            <p>O mirá nuestros planes <strong>sin descuentos</strong></p> <br> 
            `;
            
            botonVerHtml.classList.remove('oculto');
            

            return;

            
            
            //cantidadDeProductos= parseInt(cantidadString);

        }

    //Evalúa si necesita soporte
    let pidioSoporte=0;
    let avisoSoporte="";
    while(pidioSoporte<=1){

        if(pidioSoporte==1){
            avisoSoporte="Ingresá un dato válido \n";
        }
        
        //let soportePersonalizado = prompt(`${avisoSoporte}¿Necesitás un plan con soporte personalizado via WhatsApp? \n Contesta con SI o NO`);

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

    recomendacion.innerHTML= `<p><strong>Te sugerimos que nos contactes por WhatsApp</strong><br>
    para ayudarte a definir el mejor plan para vos<br><br>${ofertaCompleta} <br>
    Nuestros vendedores podrán asignarte descuentos extras <br>
    dependiendo de la cantidad de productos que tengas </p>`;
    botonVerHtml.classList.add('oculto');
    
});