<template>
  <div class="FormContainer">
    <form>
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
      <input
        type="button"
        class="formButton"
        value="Cadastrar"
        @click="postCreateForm()"
        v-show="login"
      />
      <input
        type="button"
        class="formButton"
        value="Entrar"
        @click="postAuthForm()"
        v-show="!login"
      />
      <span class="formChange"
        >{{ formChange1 }}
        <span @click.prevent="changeTheForm()">{{ formChange2 }}</span></span
      >
    </form>
    <TesteComp></TesteComp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import axios from "axios";

import { UserInfo } from "@/types";
import {
  createFormValidator,
  authFormValidator,
} from "../../functions/VerifyFunction";
import TesteComp from "../TesteComp.vue";

export default defineComponent({
  name: "AuthenticationForms",
  data() {
    return {
      userName: "" as string,
      userEmail: "" as string,
      userPassword: "" as string,
      userPasswordCheck: "" as string,
      login: true as boolean,
      formTitle: "Fazer Cadastro" as string,
      formChange1: "Já é cadastrado?" as string,
      formChange2: "Acessar" as string,
      apiUrl: process.env.VUE_APP_URL_TESTE,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
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
        await axios
          .post(`${this.apiUrl}users`, formData)
          .then((res) => {
            if (res.status === 201) {
              window.alert(
                "Usuário cadatrado com sucesso! Agora acessa sua conta usando login e senha."
              );
              this.changeTheForm();
            } else {
              window.alert(
                "Ocorreu um erro ao registrar o formulário. Por Favor, tente novamente mais tarde."
              );
            }
          })
          .catch(() => {
            window.alert(
              "Ocorreu um erro ao tentar enviar o formulário. Por Favor, tente novamente mais tarde."
            );
          });
      }
    },
    async postAuthForm() {
      if (authFormValidator(this.userEmail, this.userPassword)) {
        let formData = {
          email: this.userEmail,
          password: this.userPassword,
        };
        await axios
          .post(`${this.apiUrl}auth`, formData)
          .then((res) => {
            if (res.status === 200) {
              let userInfo: UserInfo = { ...res.data, isLoggedIn: true };
              this.SET_USER_INFO(userInfo);
              this.$router.push("/chat");
            } else if (res.status === 204) {
              window.alert("Login ou senha inválidos!");
            } else {
              window.alert(
                "Ocorreu um erro ao tentar realizar o login. Por Favor, tente novamente mais tarde."
              );
            }
          })
          .catch(() => {
            window.alert(
              "Ocorreu um erro ao tentar realizar o login. Por Favor, tente novamente mais tarde."
            );
          });
      }
    },
  },
  updated() {
    this.formWordsChange();
  },
  components: { TesteComp },
});
</script>

<style scoped lang="scss">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.FormContainer {
  width: 100%;
  height: 100vh;
  @extend .flex-center;
}

.formTitle {
  height: 32px;
  margin-top: 32px;
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 24px;
  color: $c-text-gray;
}

form {
  width: 350px;
  background: $c-lightblue;
  border-radius: 14px;

  @extend .flex-center;
  flex-direction: column;

  input {
    width: 252px;
    height: 40px;
    border-radius: 10px;
    margin: 8px;
    padding-left: 17px;

    background: $c-generalbg;
    outline-color: $c-royalblue;
    border: 1px solid $c-border-gray;

    font-size: 12px;
    color: $c-input-gray;
  }
  .formButton {
    font-weight: 600;
    font-size: 12px;
    color: $c-generalbg;
    background-color: $c-royalblue;
    padding: 0;
    border-radius: 14px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
}
.formChange {
  width: 266px;
  height: 16px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  color: $c-text-gray;
  margin-bottom: 32px;
  margin-top: 24px;
  cursor: pointer;

  span {
    color: $c-royalblue;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>