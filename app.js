const cronometro = document.getElementById('cronometro');
const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');

let [horas, minutos, segundos] = [0, 0, 0]
let intervaloDeTiempo;
let estadoCronometro = 'pausado';

function actualizarCronometro(){
    // sumar 1 cada que se llame ala funcion hasta que llegue a 60
    segundos++;
    if(segundos / 60 === 1){ // 60/60 = 1 y cuando sea igual a 1 suman los minutos
        segundos = 0;
        minutos++;
        if(minutos / 60 === 1){  // 60/60 = 1 y cuando sea igual a 1 suman las horas
            minutos = 0;
            horas++;
        }
    }
    const segundosConFormato = asignarFormato(segundos); //01 02 03 04 .. 
    const minutosConFormato = asignarFormato(minutos); //01 02 03 04 .. 
    const horasConFormato = asignarFormato(horas); //01 02 03 04 .. 

    cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`; // 00:00:00
}
// hasta 9 se agregue un 0 a su lado 
function asignarFormato(unidadDeTiempo) {
    return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

// cuando se de click, hay una banderita que pasa a una instruccion y luego se da click pasa a otra instrucciones
// ejemplo basico:
// let bandera = true;
// daleClick.addEventListener('click', function(){
//     if(bandera == true){
//         console.log('primera instruccion');
//         bandera = false;
//     }
//     else{
//         console.log('segunda instruccion')
//         bandera = true;
//     }
// })
botonInicioPausa.addEventListener('click', function(){
    if(estadoCronometro === 'pausado'){
        intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000); // cada 1 seg se activa la funcion
        botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>'; // se agrega el icono pause
        botonInicioPausa.classList.remove('iniciar'); // se elimina la clase iniciar
        botonInicioPausa.classList.add('pausar'); // y se agrega la clase pausar
        estadoCronometro = 'andando'; // y ponemos la 'andando'
    }else{
        window.clearInterval(intervaloDeTiempo); // detenemos el intervalo 
        botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>'; // cambiamos el icono
        botonInicioPausa.classList.remove('pausar'); // elimina la clase pausar
        botonInicioPausa.classList.add('iniciar'); // agregamos la clase iniciar
        estadoCronometro = 'pausado'; // y lo ponemos 'pausado'
    }
})

botonReiniciar.addEventListener('click', function(){
    window.clearInterval(intervaloDeTiempo); // detenemos el intervalo 
    //reiniciamos a 0 todo 
    horas = 0; 
    minutos = 0;
    segundos = 0;
    // reiniciar
    cronometro.innerText = '00:00:00';
    // actualizar botones
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>'; //agregamos el icono
    botonInicioPausa.classList.remove('pausar'); // eliminamos una clase
    botonInicioPausa.classList.add('iniciar'); //agregamos otra clase
    estadoCronometro = 'pausado'; // y lo ponemos como pausado
})