<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">Selecione um país para acessar a localização no Google Maps</h4>
    </div>
    <div class="card-body">
        <template v-for="(option, index) in options">
            <div class="row" :key="index">
              <div class="col-md-9 col-7 my-auto">
                {{ options[index] }}
              </div>
              <div class="col-md-3 col-3 text-right">
                <a target="_blank" :href="maps(paises[index])">
                  <btn class="btn btn-sm btn-outline-success btn-round btn-icon"><i class="fa fa-arrow-right"></i></btn>
                </a>
              </div>
            </div>
        </template>
      <!-- </ul> -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'Lista',

    data() {
      return {
        options: [],
        pageTitle: "Lista de Países"
      }
    },

    methods: {
      getOptions() {
        let comCap = [];
        let semCap = [];
        this.dados.forEach((paises) => {
          if (paises.altSpellings[1]) {
            let semCapital = paises.altSpellings[1]
            let comCapital = `${paises.altSpellings[1]} (${paises.capital[0]})`
            comCap.push(comCapital)
            semCap.push(semCapital)
          }
        });
        this.options = comCap;
        this.paises = semCap;
      },
      maps(pais) {
        return `https://www.google.com.br/maps/place/${pais}`
      }
    },

    computed: {
  
    },

    mounted() {
      this.$api.get("/region/americas").then((response) => {
        console.log(response.data);
        this.dados = response.data;
        this.getOptions();
      });
  },
}
</script>

<style>

</style>