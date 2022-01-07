<template>
  <div class="card card-user">
    <div class="card-header">
      <h5 class="card-title">Preencha corretamente os campos para efetuar o cadastro</h5>
    </div>
    <div class="card-body">
      <div class="col-md-8 mx-auto">
        <v-select v-model="selected" label="nome" @input="clearLanguages" :options="options"></v-select>
        <div class="card p-4 mt-3" v-if="selected">
            <p>País selecionado:</p>
            <p><b>{{ selected.nome }}</b></p>
            <p>Idiomas oficiais: </p>
            <ul>
              <template v-for="(nome, key) in selected.idiomas">
                <li :key="key" @click="searchLang(key)">{{ nome }}</li>
              </template>
            </ul>
        </div>
        <div class="card p-4" v-if="comomLanguages.length > 0">
          <p>Países que tem o <b>"{{ selectedLang }}"</b> como língua oficial:</p>
          <template v-for="(country, index) in comomLanguages">
            <p :key="index">{{ country.name.common }}</p>
          </template>
        </div>
      </div>
      
    </div>   
  </div>
</template>

<script>

export default {
    name: 'Busca',

    data() {
      return {
        selected: null,
        options: [],
        comomLanguages: [],
        selectedLang: "",
      }
    },

    methods: {
      clearLanguages() {
        this.comomLanguages = []
      },
      searchLang(lang) {
        this.selectedLang = lang
        console.log("lang: ", this.options)
        this.$api.get(`/lang/${lang}`).then((response) => {
          this.comomLanguages = response.data
          // console.log(response.data);
          
        });
      },
      getOptions() {
        let aux = [];
        this.dados.forEach((paises) => {
            if (paises.altSpellings[1]) {
            let pais = {
              nome: paises.altSpellings[1],
              idiomas: paises.languages
            }
            aux.push(pais)
            
            }
        });
        this.options = aux;
        },
    },

    computed: {
  
    },

    mounted() {
      this.$api.get("/region/americas").then((response) => {
        // console.log(response.data);
        this.dados = response.data;
        this.getOptions();
      });
    },
}
</script>

<style scoped>
.v-select {
    background: #fff;
}
.card ul li {
    color: #2525d7;
    text-decoration: underline;
    cursor: pointer;
}

</style>