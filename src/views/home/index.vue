<template>
  <div class="col-md-12">
    <div class="card card-user">
      <div class="card-header">
        <h4 class="card-title">
          Preencha corretamente os campos para efetuar o cadastro
        </h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="onSubmit" @reset="onReset">
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
                <money
                  class="form-control"
                  min="1000"
                  v-model="cadastro.renda"
                  v-bind="money"
                  required
                ></money>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-1">
              <div class="form-group-lg">
                <label>Espécie do Pet</label>
                <select class="form-control" v-model="cadastro.especie" required>
                  <option value="cao">Cão</option>
                  <option value="gato">Gato</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 px-1">
              <div class="form-group-lg">
                <label>Raça do Pet</label>
                <select class="form-control" v-model="cadastro.raca" required>
                  <option :key="index" v-for="(raca, index) in racas[cadastro.especie]" :value="raca.value">{{ raca.label }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 pl-1">
              <div class="form-group">
                <label for="exampleInputEmail1">Outro</label>
                <input type="text" class="form-control" v-model="cadastro.outro" :disabled="cadastro.raca != 'Outro'" />
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
              <b-button class="btn-sm" type="submit" variant="success"
                >Enviar</b-button
              >
              <b-button class="btn-sm" type="reset" variant="danger"
                >Reset</b-button
              >
            </div>
          </div>
        </form>

        <b-modal id="modalForm" title="Dados Cadastrados">
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
import { Money } from "v-money";
export default {
  name: "Home",
  components: { Money },

  data() {
    return {
      errors: {
        renda: {
          status: false,
          message: "o valor mínimo deve ser R$ 1.000,00",
        },
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
      racas: {
        cao: [
          {
            value: "pug", label: "Pug"
          },
          {
            value: "basset", label: "Bassét"
          },
          {
            value: "shiba-inu", label: "Shiba Inu"
          },
          {
            value: "labrador", label: "Labrador"
          },
          {
            value: "Outro", label: "Outro"
          },
        ],
        gato: [
          {
            value: "persa", label: "Persa"
          },
          {
            value: "maine-coon", label: "Maine Coon"
          },
          {
            value: "siames", label: "Siamês"
          },
          {
            value: "siberiano", label: "Siberiano"
          },
          {
            value: "Outro", label: "Outro"
          },
        ],
      },
      selected: null,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },

  computed: {
    zipcode() {
      return this.cadastro.cep;
    },
    age() {
      var today = new Date();
      var birthDate = new Date(this.cadastro.data);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    cpf() {
      var Soma;
      var Resto;
      Soma = 0;
      if (this.cadastro.cpf == "00000000000") return false;

      for (let i = 1; i <= 9; i++)
        Soma =
          Soma + parseInt(this.cadastro.cpf.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(this.cadastro.cpf.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++)
        Soma =
          Soma + parseInt(this.cadastro.cpf.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(this.cadastro.cpf.substring(10, 11))) return false;
      return true;
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
    onSubmit() {
      this.checkForm()
    },
    checkForm() {
      const fullName = this.cadastro.nome.split(" ");
      // console.log("nome: ", fullName);
      let count = 0;
      if (this.cadastro.renda < 1000) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Erro",
          text: "A renda deve ser maior ou igual a R$ 1.000,00",
        });
        count++;
      }
      if (fullName.length <= 1) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Erro",
          text: "O campo deve conter pelo menos Nome e Sobrenome",
        });
        count++;
      }
      if (this.age < 18 || this.age > 65) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Erro",
          text: "A idade deve ser entre 18 e 65 anos",
        });
        count++;
      }
      if (!this.cpf) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Erro",
          text: "CPF inválido",
        });
        count++;
      }
      console.log("count: ", count)
      if (count == 0) {
        this.$root.$emit("bv::show::modal", "modalForm")
      }
      count = 0
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

  mounted() {},
};
</script>

<style>
</style>