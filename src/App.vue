<template>
  <div>
    Colección de libros:
    <form @submit.prevent="editar ? update() : addLibro()">
      <p>
        <input type="text" v-model="titulo" placeholder="Nombre">
        <input type="text" v-model="autor" placeholder="Escritor">
        <button type="submit">{{editar ? "Editar": "Añadir"}}</button>
        <button v-if="editar" @click="editar = false, titulo='', autor=''">Cancelar</button>
      </p>
    </form>
    <br/>
    <ul>
      <li v-for="libro in libros" :key="libro.titulo">
        {{libro.titulo}} - {{libro.autor}} - <button @click="deleteLibro(libro)">Eliminar</button>
        <button @click="select(libro)">Editar</button>
      </li>
    </ul>
  </div>
</template>
<script>
import {db} from './firebase'
export default {
  name: 'App',
  data(){
    return{
      libros:[],
      id:"",
      titulo:"",
      autor:"",
      cargando: false,
      editar: false,
    }
  },
  created(){
    this.listarLibros();
  },
  methods:{
    async listarLibros(){
        this.cargando = true;
        const data = await db.collection("libros").get();
        this.libros = data.docs.map(doc =>({
          id: doc.id, ... doc.data()
        }))
        this.cargando = false
    },
    async addLibro(){
      await db.collection('libros').add({
        titulo: this.titulo,
        autor: this.autor
      })
      this.titulo = "";
      this.autor = "";
      this.listarLibros();
    },
    async deleteLibro(libro){
      if(confirm(`Deseas eliminar ${libro.titulo}`)){
      await db.collection('libros').doc(libro.id).delete();
      this.listarLibros();
      }
    },
    async select(libro){
      this.editar = true;
      this.id = libro.id;
      this.titulo = libro.titulo;
      this.autor = libro.autor;
    },
    async update(){
      await db.collection('libros').doc(this.id).set({
        titulo: this.titulo,
        autor: this.autor
      })
      this.editar = false
      this.id = ''
      this.titulo = ''
      this.autor = ''
      this.listarLibros();
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  margin-top: 30px;
}
</style>
