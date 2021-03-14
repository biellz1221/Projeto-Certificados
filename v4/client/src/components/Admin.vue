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
          <div class="input-group">
            <b-form-input class="form-control" type="text" v-model="inputnome" v-on:keyup.enter="addAluno(inputnome)" placeholder="Nome e Sobrenome"></b-form-input>
            <div class="input-group-append">
              <button class="btn btn-info" v-on:click="addAluno(inputnome)"><b-icon-check2></b-icon-check2></button>
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
              <b-table id="tbl-cursos" v-bind:items="cursos" v-bind:fields="camposCursos" striped bordered hover small></b-table>
            </div>
          </template>
          <div class="input-group">
            <b-form-input class="form-control" type="text" v-model="inputcurso" v-on:keyup.enter="addCurso(inputcurso, inputimagemcurso)" placeholder="Nome do Curso"></b-form-input>
            <b-form-input class="form-control" type="text" v-model="inputimagemcurso" v-on:keyup.enter="addCurso(inputcurso, inputimagemcurso)" placeholder="Imagem .jpg, .png, .jpeg, etc"></b-form-input>
            <div class="input-group-append">
              <button class="btn btn-info" v-on:click="addCurso(inputcurso, inputimagemcurso)"><b-icon-check2></b-icon-check2></button>
            </div>
          </div>
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
          <div class="input-group">
            <b-form-select v-model="selectaluno">
              <b-form-select-option v-bind:value="null">Escolha um Aluno</b-form-select-option>
              <b-form-select-option v-for="aluno in alunos" v-bind:key="aluno.id" v-bind:value="aluno.id">{{ aluno.nome }}</b-form-select-option>
            </b-form-select>
            <b-form-select v-model="selectcurso">
              <b-form-select-option v-bind:value="null">Escolha um Curso</b-form-select-option>
              <b-form-select-option v-for="curso in cursos" v-bind:key="curso.id" v-bind:value="curso.id">{{ curso.nome }}</b-form-select-option>
            </b-form-select>
            <div class="input-group-append">
              <button class="btn btn-info" v-on:click="addRelacao(selectaluno, selectcurso)"><b-icon-check2></b-icon-check2></button>
            </div>
          </div>
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
export default {
  name: "Admin",
  data() {
    return {
      inputnome: "",
      inputcurso: "",
      inputimagemcurso: "",
      selectaluno: null,
      selectcurso: null,

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
      camposCursos: [
        { key: 'id', sortable: true },
        { key: 'nome', sortable: true },
        { key: 'imagem', sortable: false }
      ],
      cursos: [
        { id: 1, nome: 'Português', imagem: 'fundo_01.jpg' },
        { id: 2, nome: 'Matemática', imagem: 'fundo_02.jpg' },
        { id: 3, nome: 'Informática', imagem: 'fundo_03.jpg' },
        { id: 4, nome: 'Geografia', imagem: 'fundo_04.jpg' }
      ],
      camposRelacao: [
        { key: 'id', sortable: true },
        { key: 'nomealuno', sortable: true },
        { key: 'nomecurso', sortable: true }
      ],
      relacao: [
        { id: 1, nomealuno: 'João Pedro da Silva', nomecurso: 'Português' },
        { id: 2, nomealuno: 'Maria Eduarda Gonzales', nomecurso: 'Informática' },
        { id: 3, nomealuno: 'Raphaela Albuquerque Lima Ribeiro Dantas Junior', nomecurso: 'Informática' },
        { id: 4, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Português' },
        { id: 5, nomealuno: 'João Pedro da Silva', nomecurso: 'Matemática' },
        { id: 6, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Geografia' }
      ],
      camposCertificadosEmitidos: [
        { key: 'id', sortable: true },
        { key: 'nomealuno', sortable: true },
        { key: 'nomecurso', sortable: true },
        { key: 'linkdownload', sortable: false }
      ],
      certificadosemitidos: [
        { id: 1, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Português', linkdownload: 'link_1.pdf' },
        { id: 2, nomealuno: 'Enzo José Ribeiro Dantas da Cunha Barros', nomecurso: 'Geografia', linkdownload: 'link_2.pdf' }
      ]
    }
  },
  methods: {
    addAluno(inputnome) {
      if (inputnome != "") {
        this.alunos.push({id: this.alunos[this.alunos.length - 1].id + 1, nome: inputnome});
        this.inputnome = "";
      }
		},
    addCurso(inputcurso, inputimagemcurso){
      if (inputcurso != "" && inputimagemcurso != "") {
        this.cursos.push({id: this.cursos[this.cursos.length - 1].id + 1, nome: inputcurso, imagem: inputimagemcurso});
        this.inputcurso = "";
        this.inputimagemcurso = "";
      }
    },
    addRelacao(selectaluno, selectcurso) {
      if (selectaluno != null && selectcurso != null) {
        this.relacao.push({
          id: this.relacao[this.relacao.length - 1].id + 1,
          nomealuno: this.alunos[this.alunos.map(function(e){return e.id}).indexOf(selectaluno)].nome,
          nomecurso: this.cursos[this.cursos.map(function(e){return e.id}).indexOf(selectcurso)].nome
        });
        this.selectaluno = null;
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