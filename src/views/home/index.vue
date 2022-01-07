<template>
  <div class="col-md-12">
    <div class="card card-user">
      <div class="card-header">
        <h4 class="card-title">Preencha corretamente os campos para efetuar o cadastro</h4>
      </div>
      <div class="card-body">
        <form @submit="onSubmit" @reset="onReset" v-if="show">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Nome completo</label>
                <b-form-input
                    id="nome"
                    v-model="cadastro.nome"
                    required
                  ></b-form-input>
              </div>
            </div>
            <!-- <div class="col-md-6 pl-1">
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" value="Faker">
              </div>
            </div> -->
          </div>
          <div class="row">
            <div class="col-md-5 pr-1">
              <div class="form-group">
                <label>Data de nascimento</label>
                <b-form-input
                    id="data"
                    type="date"
                    v-model="cadastro.data"
                    required
                  ></b-form-input>
              </div>
            </div>
            <div class="col-md-3 px-1">
              <div class="form-group">
                <label>CPF</label>
                <the-mask
                    name="cpf"
                    id="cpf"
                    class="form-control"
                    :mask="['###.###.###-##']"
                    v-model="cadastro.cpf"
                    required
                  />
              </div>
            </div>
            <div class="col-md-4 pl-1">
              <div class="form-group">
                <label for="exampleInputEmail1">Renda mensal</label>
                <money class="form-control" min="1000" v-model="renda" v-bind="money" required></money>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-1">
              <div class="form-group-lg">
                <label>Espécie do Pet</label>
                <select class="form-control" v-model="especie" required>
                  <option>Cão</option>
                  <option>Gato</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 px-1">
              <div class="form-group">
                <label>Raça do Pet</label>
                <select class="form-control" v-model="raca" required>
                  <option>Cão 1</option>
                  <option>Gato 2</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 pl-1">
              <div class="form-group">
                <label for="exampleInputEmail1">Outro</label>
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-1">
              <div class="form-group">
                <label>CEP</label>
                <the-mask
                    name="cep"
                    id="cep"
                    class="form-control"
                    :mask="['#####-###']"
                    v-model="cadastro.cep"
                    required
                    placeholder="00.000-000"
                  />
              </div>
            </div>
            <div class="col-md-8 pl-1">
              <div class="form-group">
                <label>Endereço</label>
                <b-form-input
                    id="rua"
                    v-model="cadastro.rua"
                    required
                  ></b-form-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-1">
              <div class="form-group">
                <label>Bairro</label>
                <b-form-input
                    id="bairro"
                    v-model="cadastro.bairro"
                    required
                  ></b-form-input>
              </div>
            </div>
            <div class="col-md-4 px-1">
              <div class="form-group">
                <label>Cidade</label>
                <b-form-input
                    id="cidade"
                    v-model="cadastro.cidade"
                    required
                  ></b-form-input>
              </div>
            </div>
            <div class="col-md-4 pl-1">
              <div class="form-group">
                <label>Bairro</label>
                <b-form-input
                  id="estado"
                  v-model="cadastro.estado"
                  required
                ></b-form-input>
              </div>
            </div>
            
          </div>
          <div class="row">
            <div class="update ml-auto mr-auto">
              <b-button class="btn-sm" type="submit" variant="success">Enviar</b-button>
              <b-button class="btn-sm" type="reset" variant="danger">Reset</b-button>
            </div>
          </div>
        </form>

        <b-modal id="modalForm" title="Dados cadastrados">
            <p>Nome completo: {{ cadastro.nome }}</p>
            <p>Data de nascimento: {{ cadastro.data }}</p>
            <p>CPF: {{ cadastro.cpf }}</p>
            <p>Renda mensal: {{ cadastro.renda }}</p>
            <p>Espécie do Pet: {{ cadastro.especie }}</p>
            <p>Raça do Pet: {{ cadastro.raca }}</p>
            <p>Outro: {{ cadastro.outro }}</p>
            <p>CEP: {{ cadastro.cep }}</p>
            <p>Rua: {{ cadastro.rua }}</p>
            <p>Bairro: {{ cadastro.bairro }}</p>
            <p>Cidade: {{ cadastro.cidade }}</p>
            <p>Estado: {{ cadastro.estado }}</p>
          </b-modal>
      </div>
    </div>


  </div>

 

</template>

<script>
import {Money} from 'v-money'
export default {
  name: "Home",
  components: {Money},

  data() {
    return {
      errors: {
        renda: {
          status: false,
          message: "o valor mínimo deve ser R$ 1.000,00"
        }
      },
      show: true,
      dados: "",
      cadastro: {
        nome: "",
        data: "",
        cpf: "",
        renda: "",
        especie: "",
        raca: "",
        outro: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
      selected: null,
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false
        }
    };
  },

  computed: {
    zipcode() {
      return this.cadastro.cep;
    },
  },

  watch: {
    zipcode() {
      if (this.zipcode.length == 8) {
        this.$viaCep.buscarCep(this.zipcode).then((response) => {
          console.log(response);
          this.cadastro.cidade = response.localidade;
          this.cadastro.estado = response.uf;
          this.cadastro.rua = response.logradouro;
          this.cadastro.bairro = response.bairro;
        });
      }
    },
  },

  methods: {
    onSubmit(event) {
      
      this.checkForm(event);
        // event.preventDefault();

        // this.$root.$emit("bv::show::modal", "modalForm");
      
    },
    checkForm(event) {
      let regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
      if (this.renda < 1000) {
        this.$notify({ 
          group: 'foo', 
          type: 'error',
          title: 'Erro',
          text: 'A renda deve ser maior ou igual a R$ 1.000,00'
        })
        event.preventDefault();
      }
      if (!regexp.test(this.nome)) {
        console.log("regex: ", regexp)
        this.$notify({ 
          group: 'foo', 
          type: 'error',
          title: 'Erro',
          text: 'O campo deve conter pelo menos Nome e Sobrenome'
        })
        event.preventDefault();
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.cadastro.cep = "";
      this.cadastro.rua = "";
      this.cadastro.cidade = "";
      this.cadastro.estado = "";
      this.cadastro.bairro = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },

  mounted() {
  },
};
</script>

<style>
</style>