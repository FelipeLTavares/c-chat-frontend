<template>
  <div class="FormContainer">
    <form @submit.prevent="submitForm()">
      <span class="formTitle">{{ formTitle }}</span>
      <input type="text" placeholder="Nome" v-model="userName" v-show="login" />
      <input type="email" required placeholder="E-mail" v-model="userEmail" />
      <input type="password" placeholder="Senha" v-model="userPassword" />
      <input
        type="password"
        placeholder="Confirma sua senha"
        v-model="userPasswordCheck"
        v-show="login"
      />
      <button
        type="submit"
        class="formButton"
        v-show="login"
        :disabled="createdUserInfo.isLoading"
      >
        <span
          ><LoadingComponent v-show="createdUserInfo.isLoading" />
          Cadastrar</span
        >
      </button>
      <button
        type="submit"
        class="formButton"
        v-show="!login"
        :disabled="userInfo.isLogedLoading"
      >
        <span
          ><LoadingComponent v-show="userInfo.isLogedLoading" /> Entrar</span
        >
      </button>
      <span class="formChange"
        >{{ formChange1 }}
        <span @click.prevent="changeTheForm()">{{ formChange2 }}</span></span
      >
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

import {
  createFormValidator,
  authFormValidator,
} from "../../functions/VerifyFunction";
import LoadingComponent from "../UI/Loading/LoadingComponent.vue";

export default defineComponent({
  name: "AuthenticationForms",
  data() {
    return {
      userName: "",
      userEmail: "",
      userPassword: "",
      userPasswordCheck: "",
      login: false,
      formTitle: "Acessar chat",
      formChange1: "Não é cadastrado?",
      formChange2: "Cadastre-se",
      createUserSubmetedForm: false,
      items: [{ title: "Teste1" }, { title: "Teste1" }, { title: "Teste1" }],
    };
  },

  components: { LoadingComponent },

  computed: {
    ...mapState(["createdUserInfo", "userInfo"]),
  },
  methods: {
    ...mapActions(["CREATE_USER", "SIGNIN"]),
    submitForm(): void {
      if (!this.login) {
        this.postAuthForm();
        return;
      }
      this.postCreateForm();
    },
    formWordsChange() {
      if (this.login) {
        this.formTitle = "Fazer Cadastro";
        this.formChange1 = "Já é cadastrado?";
        this.formChange2 = "Acessar";
      } else {
        this.formTitle = "Acessar chat";
        this.formChange1 = "Não é cadastrado?";
        this.formChange2 = "Cadastre-se";
      }
    },
    changeTheForm(): void {
      this.userName = "";
      this.userEmail = "";
      this.userPassword = "";
      this.userPasswordCheck = "";
      this.login = !this.login;
    },
    async postCreateForm() {
      if (
        createFormValidator(
          this.userName,
          this.userEmail,
          this.userPassword,
          this.userPasswordCheck
        )
      ) {
        let formData = {
          name: this.userName,
          email: this.userEmail,
          password: this.userPassword,
        };

        this.createUserSubmetedForm = true;
        await this.CREATE_USER(formData);
      }
    },
    async postAuthForm() {
      if (authFormValidator(this.userEmail, this.userPassword)) {
        let formData = {
          email: this.userEmail,
          password: this.userPassword,
        };

        await this.SIGNIN(formData);
      }
    },
  },
  updated() {
    this.formWordsChange();

    if (this.userInfo.isLoggedIn) {
      this.$router.push("/");
      return;
    }

    if (this.userInfo.isLoggedError) {
      window.alert(
        "Ocorreu um erro ao tentar realizar o login. Por Favor, tente novamente mais tarde."
      );
    }

    if (this.createUserSubmetedForm && !this.createdUserInfo.isLoading) {
      if (this.createdUserInfo.createdSuccess) {
        window.alert(
          "Usuário cadatrado com sucesso! Agora acessa sua conta usando login e senha."
        );
        this.changeTheForm();
      } else {
        window.alert(
          "Ocorreu um erro ao registrar o formulário. Por Favor, tente novamente mais tarde."
        );
      }
      this.createUserSubmetedForm = false;
    }
  },
});
</script>

<style scoped lang="scss">
@import "./AuthenticationForms.scss";
</style>