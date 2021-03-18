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
            <b-form-input id="input-nome" v-model="inputnome" aria-describedby="help-nome" placeholder="Nome e Sobrenome" v-on:focus="removeClassErro('input-nome')"></b-form-input>
            <!-- Fim do Campo Nome -->
            <br />
            <!-- Campo Curso -->
            <label for="select-curso">Curso:</label>
            <b-form-select v-model="selectcurso" id="select-curso" v-on:change="removeClassErro('select-curso')">
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
    <div id="modal-carregando" class="fundo-modal">
      <div class="modal-content">
        <div class="modal-body">
          <h5>Gerando Arquivo...</h5>
          <p>Aguarde, logo o seu Certificado será carregado!</p>
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
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
    axios.get('http://localhost:8081/carrega_cursos').then( response => (this.cursos = response.data));
  },
  methods: {
    geraCertificado(inputnome, selectcurso) {
      if (inputnome == "") {
        document.getElementById('input-nome').classList.add("bloco_erro");
      } else if (selectcurso == null) {
        document.getElementById('select-curso').classList.add("bloco_erro");
      } else {
        this.inputnome = null;
        this.selectcurso = null;
        
        document.getElementById('modal-carregando').classList.add("abre_modal");

        window.location.href = 'http://localhost:8081/gerar_pdf/' + inputnome + '/' + selectcurso;
      }
    },
    removeClassErro(blocoID) {
      document.getElementById(blocoID).classList.remove("bloco_erro");
    }
  }
};
</script>

<style>
  .engloba-titulo { background: #e4efff; padding: 5em 0; margin-bottom: 2em; }
  .engloba-titulo h1 { color: #464646; }
  .engloba-titulo h4 { color: #9c9c9c; }

  .bloco_erro { box-shadow: 0px 0px 7px 3px #f00; }
  
  .fundo-modal { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgb(0 0 0 / 55%); z-index: 1; display: none; opacity: 0; transition: opacity 0.5s linear; }
  .abre_modal { display: block !important; opacity: 100% !important; }
  
  .fundo-modal .modal-content { display: block; max-width: 35vw; margin: auto; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); box-shadow: 1px 1px 5px rgb(0 0 0 / 62%); }
  .fundo-modal .modal-body { text-align: center; }
  .fundo-modal .modal-body h5 { font-size: 2em; }
  .fundo-modal .modal-body p { font-size: 0.8em; color: #b1b1b1; }
</style>