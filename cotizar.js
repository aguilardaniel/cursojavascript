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

*/



let valorPlanA = 30000;
let valorPlanB = 75000;
let valorPlanC = 125000;
let requiereSoporte;
let hayCantidad=false;
let planSugerido;

//----- Funciones--------

function noHayCantidad(){
    hayCantidad=false;
    alert("No definiste una cantidad de productos exacta");
}

//----- Fin Funciones -----



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
    planSugerido="A";    
}else if(cantidadDeProductos>=30 && requiereSoporte===false){
    planSugerido="B";
}else if(requiereSoporte===true){
    planSugerido="C";
}


//Muestra un mensaje correspondiente a cada situación
//incluso si no ingresó los datos que se le pidió

switch (planSugerido) {
    case "A":
        alert(`Te sugerimos contratar nuestro Plan Inicial\n Su valor es de: $${valorPlanA} por año`);
        break;
    
    case "B":
        alert(`Te sugerimos contratar nuestro Plan Medium\n Su valor es de: $${valorPlanB} por año`);
        break;
    
    case "C":
        alert(`Te sugerimos contratar nuestro Plan Premium\n Su valor es de: $${valorPlanC} por año`);
        break;

    default:
        alert(`Te sugerimos que nos contactes por WhatsApp\n para ayudarte a cotizar el mejor plan para vos`);
        break;
}



