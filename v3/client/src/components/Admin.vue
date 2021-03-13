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
              <b-table id="tbl-alunos" striped hover :items="alunos" :fields="camposAluno"></b-table>
            </div>
          </template>
          <div class="input-group">
            <b-form-input class="form-control" type="text" v-model="inputNome" v-on:keyup.enter="addAluno(inputNome)" placeholder="Nome e Sobrenome"></b-form-input>
            <div class="input-group-append">
              <button class="btn btn-info" v-on:click="addAluno(inputNome)"><span class="fa fa-plus"></span></button>
            </div>
          </div>
          <br />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <template>
            <div>
              <h4><label for="tbl-cursos">Cursos Cadastrados:</label></h4>
              <b-table id="tbl-cursos" striped hover v-bind:items="cursos"></b-table>
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
              <b-table id="tbl-relacao" striped hover v-bind:items="relacao"></b-table>
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
              <b-table id="tbl-certificados-emitidos" striped hover v-bind:items="certificadosemitidos"></b-table>
            </div>
          </template>
          <br />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      inputNome: "",
      camposAluno: [
        { key: 'id', sortable: true },
        { key: 'nome', sortable: true }
      ],
      alunos: [
        { id: 1, nome: 'João Pedro da Silva' },
        { id: 2, nome: 'Maria Eduarda Gonzales' },
        { id: 3, nome: 'Enzo José Ribeiro Dantas da Cunha Barros' },
        { id: 4, nome: 'Raphaela Albuquerque Lima Ribeiro Dantas Junior' }
      ],
      cursos: [
        { id: 1, nome: 'Português', imagem: 'fundo.jpg' },
        { id: 2, nome: 'Matemática', imagem: 'fundo.jpg' },
        { id: 3, nome: 'Informática', imagem: 'fundo.jpg' },
        { id: 4, nome: 'Geografia', imagem: 'fundo.jpg' }
      ],
      relacao: [
        { id: 1, nomealuno: 'João Pedro da Silva', nomecurso: 'Português' },
        { id: 2, nomealuno: 'Maria Eduarda Gonzales', nomecurso: 'Informática' },
        { id: 3, nomealuno: 'Raphaela Albuquerque Lima Ribeiro Dantas Junior', nomecurso: 'Informática' },
        { id: 4, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Português' },
        { id: 5, nomealuno: 'João Pedro da Silva', nomecurso: 'Matemática' },
        { id: 6, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Geografia' }
      ],
      certificadosemitidos: [
        { id: 1, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Português', linkdownload: 'link.pdf' },
        { id: 2, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Geografia', linkdownload: 'link.pdf' }
      ]
    }
  },
  methods: {
    addAluno(inputNome) {
			this.$emit("addAluno", inputNome);
			this.item = "";
		}
  }
};
</script>

<style>
  .engloba-titulo { background: #e4efff; padding: 5em 0; margin-bottom: 2em; }
  .engloba-titulo h1 { color: #464646; }
  .engloba-titulo h4 { color: #9c9c9c; }
</style>