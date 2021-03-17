<template>
  <div>
    <div class="engloba-titulo">
      <b-container>
        <b-row>
          <b-col class="text-center">
            <h1>Área Administrativa</h1>
            <h4>Seguem tabelas com informações de Registro:</h4>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <template>
            <div>
              <h4><label for="tbl-alunos">Alunos Cadastrados:</label></h4>
              <b-table id="tbl-alunos" v-bind:items="alunos" v-bind:fields="camposAluno" striped bordered hover small></b-table>
            </div>
          </template>
          <br />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <template>
            <div>
              <h4><label for="tbl-cursos">Cursos Cadastrados:</label></h4>
              <b-table id="tbl-cursos" v-bind:items="cursos" v-bind:fields="camposCursos" striped bordered hover small></b-table>
            </div>
          </template>
          <br />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <template>
            <div>
              <h4><label for="tbl-relacao">Relação entre Alunos e Cursos:</label></h4>
              <b-table id="tbl-relacao" v-bind:items="relacao" v-bind:fields="camposRelacao" striped bordered hover small></b-table>
            </div>
          </template>
          <br />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <template>
            <div>
              <h4><label for="tbl-certificados-emitidos">Certificados Emitidos:</label></h4>
              <b-table id="tbl-certificados-emitidos" v-bind:items="certificadosemitidos" v-bind:fields="camposCertificadosEmitidos" striped bordered hover small></b-table>
            </div>
          </template>
          <br />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Admin",
  data() {
    return {
      inputnome: "",
      inputcurso: "",
      inputimagemcurso: "",
      selectaluno: null,
      selectcurso: null,
      alunos: null,
      cursos: null,
      relacao: null,
      certificadosemitidos: null,

      camposAluno: [
        { key: 'id', sortable: true },
        { key: 'nome', sortable: true }
      ],
      camposCursos: [
        { key: 'id', sortable: true },
        { key: 'nome', sortable: true },
        { key: 'imagem', sortable: false }
      ],
      camposRelacao: [
        { key: 'id', sortable: true },
        { key: 'aluno.nome', sortable: true },
        { key: 'curso.nome', sortable: true }
      ],
      camposCertificadosEmitidos: [
        { key: 'id', sortable: true },
        { key: 'aluno', sortable: true },
        { key: 'curso', sortable: true },
        { key: 'link', sortable: false }
      ]
    }
  },
  mounted() {
    axios.get('http://localhost:8081/carrega_alunos').then(response => (this.alunos = response.data));
    axios.get('http://localhost:8081/carrega_cursos').then(response => (this.cursos = response.data));
    axios.get('http://localhost:8081/carrega_relacoes').then(response => (this.relacao = response.data));
    axios.get('http://localhost:8081/carrega_pdfs_emitidos').then(response => (this.certificadosemitidos = response.data));
  }
};
</script>

<style>
  .engloba-titulo { background: #e4efff; padding: 5em 0; margin-bottom: 2em; }
  .engloba-titulo h1 { color: #464646; }
  .engloba-titulo h4 { color: #9c9c9c; }
</style>