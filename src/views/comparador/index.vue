<template>
    <div class="card card-user">
        <div class="card-header">
            <h5 class="card-title">Preencha corretamente os campos para efetuar o cadastro</h5>
        </div>
        <div class="card-body">
            <template>
                <div>
                    <b-form-select v-model="selected" :options="itemsRegiao"></b-form-select>
                    
                </div>
            </template>
          
            <div class="card mt-3 p-4" v-if="selected">
                <p>Países da região <b>{{ selected }}</b></p>
                <ul>
                    <template v-for="(country, index) in countries">
                        <li :key="index">{{ country.name.common }}</li>
                    </template>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Comparador',

    data() {
        return {
            selected: "",
            itemsRegiao: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
            countries: []
        }
    },

    methods: {
        getCountries() {
            this.$api.get(`/region/${this.selected}`).then((response) => {
                console.log(response.data);
                this.countries = response.data
                
            });
        }
    },

    watch: {
        selected() {
            this.getCountries()
        }
    },

    mounted() {
        
    }
}

</script>

<style>

</style>