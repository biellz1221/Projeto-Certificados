<template>
  <div>
    <div class="engloba-titulo">
      <b-container>
        <b-row>
          <b-col class="text-center">
            <h1>Gerador de Certificados</h1>
            <h4>Preencha os campos abaixo conforme solicitado:</h4>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <b-form>
            <!-- Campo Nome -->
            <label for="input-nome">Nome Completo:</label>
            <b-form-input id="input-nome" v-model="inputnome" aria-describedby="help-nome" placeholder="Nome e Sobrenome"></b-form-input>
            <!-- Fim do Campo Nome -->
            <br />
            <!-- Campo Curso -->
            <label for="select-curso">Curso:</label>
            <b-form-select v-model="selectcurso" id="select-curso">
              <b-form-select-option v-bind:value="null">Escolha um Curso</b-form-select-option>
              <b-form-select-option v-for="curso in cursos" v-bind:key="curso.id" v-bind:value="curso.nome">{{ curso.nome }}</b-form-select-option>
            </b-form-select>
            <!-- Fim do Campo Curso -->
            <br />
            <br />
            <b-button class="sm-10 md-10" variant="success" v-on:click="geraCertificado(inputnome, selectcurso)">Gerar Certificado</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Principal",
  data() {
    return {
      inputnome: "",
      selectcurso: null,
      cursos: null
    }
  },
  mounted() {
    axios.get('http://localhost:8081/carrega_cursos')
    .then( response => (this.cursos = response.data))
  },
  methods: {
    geraCertificado(inputnome, selectcurso) {
      if (inputnome != "" && selectcurso != null) {
        window.location.href = 'http://localhost:8081/gerar_pdf/' + inputnome + '/' + selectcurso;

        this.inputnome = null;
        this.selectcurso = null;
      }
    }
  }
};
</script>

<style>
  .engloba-titulo { background: #e4efff; padding: 5em 0; margin-bottom: 2em; }
  .engloba-titulo h1 { color: #464646; }
  .engloba-titulo h4 { color: #9c9c9c; }
</style>