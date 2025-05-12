'use strict'

const medidas = document.querySelectorAll('input[type="text"]')
const formulario = document.querySelector("form");
let contenedor = document.querySelector(".cuadros");

function colorCuadro(){
    return `rgb(${[0,0,0].map(() => Math.floor(Math.random() * 256)).join(",")})`;
}


function crearCuadro({id,ancho,alto,color}){
    let cuadro = document.createElement("div");
    cuadro.classList.add("cuadro");
    cuadro.style.width = ancho + "px";
    cuadro.style.height = alto + "px";
    cuadro.style.backgroundColor = color;

   cuadro.addEventListener("click", () => {
        fetch("/borrar", {
            method : "DELETE",
            body : JSON.stringify({id}),
            headers : {
                "Content-type" : "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(({error,resultado}) => {
            if(!error && resultado == "ok"){
                return cuadro.remove();
            }
            console.log("error")
        })
    });
    return cuadro;
}


fetch("/cuadros")
.then(respuesta => respuesta.json())
.then(cuadros => {
    cuadros.forEach(objCuadro => {
        contenedor.appendChild(crearCuadro(objCuadro));
    })
});



formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    let ancho = Number(medidas[0].value);
    let alto =  Number(medidas[1].value);
    let color = colorCuadro();

    fetch("/nuevo", {
        method : "POST",
        body : JSON.stringify({ancho,alto,color}),
        headers : {
            "Content-type" : "application/json"
        }
    })
    .then(respuesta => respuesta.json())
    .then(({error,id}) => {
        if(!error){
            contenedor.appendChild(crearCuadro({id,ancho,alto,color}));

            return medidas.forEach( input => input.value = "");
        }
        console.log("error")
    });
});