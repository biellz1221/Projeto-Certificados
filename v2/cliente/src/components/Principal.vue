<template>
    <div>
        <div class="callout large primary">
            <div class="text-center">
                <h1>Gerador de Certificados</h1>
                <h4 class="subheader">Bem-vindo(a), informe seus dados abaixo:</h4>
            </div>
        </div>
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div class="cell small-12 medium-6">
                    <div class="grid-x grid-padding-x align-middle">
                        <div class="cell small-12 large-shrink">
                            <h5>Nome Completo:</h5>
                        </div>
                        <div class="cell small-12 large-auto">
                            <input type="text" placeholder="Nome e Sobrenome" />
                        </div>
                    </div>
                </div>
                <div class="cell small-12 medium-6">
                    <div class="grid-x grid-padding-x align-middle">
                        <div class="cell small-12 large-shrink">
                            <h5>Selecione o Curso:</h5>
                        </div>
                        <div class="cell small-12 large-auto">
                            <select>
                                <option>oi</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid-x grid-padding-x text-right">
                <div class="cell shrink">
                    <button id="btnGerarCertificado" type="button" class="success button">Gerar Certificado</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Principal'
    }
</script>
<style>
    #btnGerarCertificado { border-radius: 5px; }

    .align-middle { margin-bottom: 1em; }
    .align-middle > div > * { margin-bottom: 0px; }
</style>