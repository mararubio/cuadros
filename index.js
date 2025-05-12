import express from "express";
import { cuadros, creandoCuadro, deleteCuadrado } from "./datos.js";

const servidor = express();

servidor.use(express.static("./front"));

servidor.use(express.json());

servidor.get("/cuadros", async (peticion,respuesta) => {
    try{
        respuesta.json(await cuadros());
    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en el servidor" });
    }
});


servidor.post("/nuevo", async (peticion,respuesta) => {
    
    try{
        let {ancho,alto,color} = peticion.body;
        let id = await creandoCuadro(ancho,alto,color);
        respuesta.json({id});
    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en el servidor" });
    }
});


servidor.delete("/borrar", async (peticion,respuesta) => {
    try{
        let {id} = peticion.body; 
        let cantidad = await deleteCuadrado(id)
    
        respuesta.json({resultado : cantidad ? "ok" : "ko"});
    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en el servidor" });
    }
});


servidor.listen(4000);