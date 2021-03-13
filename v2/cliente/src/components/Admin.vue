<template>
    <div>
        <div class="callout large primary">
            <div class="text-center">
                <h1>Acesso Administrativo</h1>
                <h4 class="subheader">Seguem as tabelas de Cadastros:</h4>
            </div>
        </div>
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div class="cell">
                    <h5>Tabela de Alunos:</h5>
                    <div class="engloba-tabela">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in tblAluno" v-bind:key="i">
                                    <td>{{ i.id }}</td>
                                    <td>{{ i.nome }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="grid-x">
                            <div class="cell auto">
                                <input type="text" placeholder="Nome e Sobrenome" v-model="inputNomeAluno" />
                            </div>
                            <div class="cell shrink">
                                <button id="btnCadastrarAluno" type="button" class="success button" v-on:click="registraAluno(inputNomeAluno)">Cadastrar Aluno</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div class="cell">
                    <h5>Tabela de Cursos:</h5>
                    <div class="engloba-tabela">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Curso</th>
                                    <th>Imagem do Certificado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in tblCurso" v-bind:key="i">
                                    <td>{{ i.id }}</td>
                                    <td>{{ i.nome }}</td>
                                    <td>{{ i.imagem }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="grid-x">
                            <div class="cell auto">
                                <input type="text" placeholder="Curso" />
                            </div>
                            <div class="cell auto">
                                <input type="text" placeholder="Imagem" />
                            </div>
                            <div class="cell shrink">
                                <button id="btnCadastrarAluno" type="button" class="success button">Cadastrar Curso</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div class="cell">
                    <h5>Tabela de relação entre Alunos e Cursos:</h5>
                    <div class="engloba-tabela">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Aluno</th>
                                    <th>Curso</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Content Goes Here</td>
                                    <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
                                    <td>Content Goes Here</td>
                                </tr>
                                <tr>
                                    <td>Content Goes Here</td>
                                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                    <td>Content Goes Here</td>
                                </tr>
                                <tr>
                                    <td>Content Goes Here</td>
                                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                    <td>Content Goes Here</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div class="cell">
                    <h5>Tabela Certificados Emitidos:</h5>
                    <div class="engloba-tabela">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome do Aluno</th>
                                    <th>Curso</th>
                                    <th>Certificado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
                                    <td>Content Goes Here</td>
                                    <td>Content Goes Here</td>
                                </tr>
                                <tr>
                                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                    <td>Content Goes Here</td>
                                    <td>Content Goes Here</td>
                                </tr>
                                <tr>
                                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                    <td>Content Goes Here</td>
                                    <td>Content Goes Here</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios/dist/axios";

    export default {
        name: 'Admin',
        data: function () {
            return {
                inputNomeAluno: "",
                tblAluno: [],
                tblCurso: []
            };
        },
        methods: {
            registraAluno(item) {
                axios({
                    url: "http://localhost:4000",
                    method: "post",
                    data: {
                        query: `
                            mutation ($aluno: AlunoInput) {
                                registraAluno(item: $aluno) {
                                    id
                                    nome
                                }
                            }
                        `,
                        variables: {
                            aluno: {
                                nome: item
                            }
                        }
                    }
                });
            }
        },
        created() {
            axios({
                url: "http://localhost:4000",
                method: "post",
                data: {
                    query: `
                        {
                            alunos {
                                id
                                nome
                            }
                            cursos {
                                id
                                nome
                                imagem
                            }
                        }
                    `
                }
            }).then(response => {
                const query = response.data;
                this.tblAluno = query.data.alunos;
                this.tblCurso = query.data.cursos;
            });
        }
    }
</script>
<style>
    h5 { font-weight: 900; }

    .engloba-tabela { max-width: 100%; max-height: 70vh; min-height: 12em; overflow: auto; margin-bottom: 3em; }
    .engloba-tabela > table { min-width: 55em; }
</style>