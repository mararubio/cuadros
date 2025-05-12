import {readFile,writeFile} from "fs";

export function cuadros(){ //buscar los datos de cuadros.json
    return new Promise((ok,ko) =>{
        readFile("./cuadros.json", (error,contenido) => {
            if(!error){
                return ok(JSON.parse(contenido.toString()));
            }
            ko();
        });
    });
}

export function creandoCuadro(ancho,alto,color){
    return new Promise((ok,ko) => {
        cuadros()
        .then( cuadros => {
            let id = cuadros.length > 0 ? cuadros[cuadros.length - 1].id + 1 : 1;
            cuadros.push({id,ancho,alto,color});
            writeFile("./cuadros.json", JSON.stringify(cuadros), error => {
                if(!error){
                    return ok(id);
                }
                ko();
            });
        })
        .catch(() => ko());
    });
}
//filter: a partir de un array crea otro filtrado para que el callback retorna true (se queda) o false (ese filtra, elimina). No altera el array original

export function deleteCuadrado(id){
    return new Promise((ok,ko) => {
        cuadros()
        .then( cuadros => {
            let antes = cuadros.length;
            cuadros = cuadros.filter(cuadro => cuadro.id != id);
            writeFile("./cuadros.json", JSON.stringify(cuadros), error => {
                if(!error){
                    return ok(antes - cuadros.length);
                }
                ko();
            });
        })
        .catch(() => ko());
    });
}

