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
            <b-form-input
              id="input-nome"
              aria-describedby="help-nome"
              placeholder="Nome e Sobrenome"
            ></b-form-input>
            <!-- Fim do Campo Nome -->
            <br />

            <!-- Campo Curso -->
            <label for="select-curso">Curso:</label>
            <b-form-select
              id="select-curso"
              :options="[
                { text: 'Escolha o Curso', value: null },
                { text: 'Português', value: 1 },
                { text: 'Matemática', value: 2 },
                { text: 'Informática', value: 3 },
              ]"
              :value="null"
            ></b-form-select>
            <!-- Fim do Campo Curso -->
            <br />
            <br />
            <b-button class="sm-10 md-10" variant="success"
              >Gerar Certificado</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Principal"
};
</script>

<style>
  .engloba-titulo { background: #e4efff; padding: 5em 0; margin-bottom: 2em; }
  .engloba-titulo h1 { color: #464646; }
  .engloba-titulo h4 { color: #9c9c9c; }
</style>