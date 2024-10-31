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


//----- Funciones--------

function generarDescuentos(plan){
    

    let precioConDescuentoMinimo = planes[plan].precio - planes[plan].precio * (descuentoPorcentaje) / 100;
    planesConDescuento.push(precioConDescuentoMinimo);

}


function mostrarDescuentos(plan){

    ofertaCompleta += "- " + planes[plan].nombre + " = $" + planesConDescuento[plan] + "\n";
    

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

function noHayCantidad(){
    hayCantidad=false;
    alert("No definiste una cantidad de productos exacta");
}

function recomendarPlan(plan){

const valorFinalConDescuentos = generarDescuentoFinal(plan);
const descuentoTotalAplicado = descuentoPorcentaje + descuentoExtra;

    alert(`Te sugerimos contratar nuestro ${planes[plan].nombre}\n 
            Para la cantidad de productos que definiste podemos hacerte un descuento de ${descuentoTotalAplicado}% en el plan anual\n
            Su valor final es de: $${valorFinalConDescuentos} por año`);


}

function generarDescuentosYMostrar(vectorPlanes, funcionDefinida){
    
    /* La función de orden superior definida puede usarse con:
    generarDescuentos o mostrarDescuentos */
    
    for (let i = 0; i < vectorPlanes.length; i++) {
       funcionDefinida(i);
      }

        

    
}
   



//----- Fin Funciones -----






//utiliza la funcion de orden superior
generarDescuentosYMostrar(planes, generarDescuentos);
generarDescuentosYMostrar(planes, mostrarDescuentos);



//Evalúa cuantos productos tiene
let cantidadString= prompt("¿Cuantos productos hay en tu carta?");
let cantidadDeProductos= parseInt(cantidadString);


   
    if(!isNaN(cantidadDeProductos) && cantidadDeProductos>=1){

        hayCantidad=true;   
    
    }else{
        
        //pide por segunda vez que ingrese un número
        cantidadString= prompt("Ingresá un número válido \n ¿Cuantos productos hay en tu carta?");
        cantidadDeProductos= parseInt(cantidadString);


        if(cantidadString===""){
            noHayCantidad();
        }
        else if(cantidadString===null){
            noHayCantidad();
        }
        else if(cantidadDeProductos<=1){
            noHayCantidad();
        }
        else{
            hayCantidad=true;
        }


    }

//Evalúa si necesita soporte
let pidioSoporte=0;
let avisoSoporte="";
while(pidioSoporte<=1){

    if(pidioSoporte==1){
        avisoSoporte="Ingresá un dato válido \n";
    }
    
    let soportePersonalizado = prompt(`${avisoSoporte}¿Necesitás un plan con soporte personalizado via WhatsApp? \n Contesta con SI o NO`);

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



