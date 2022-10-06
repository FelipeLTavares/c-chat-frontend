<template>
  <div class="FormContainer">
    <form v-show="!login">
      <span class="formTitle">Fazer Cadastro</span>
      <input type="text" placeholder="Nome" v-model="userName" />
      <input type="email" required placeholder="E-mail" v-model="userEmail" />
      <input type="password" placeholder="Senha" v-model="userPassword" />
      <input
        type="password"
        placeholder="Confirma sua senha"
        v-model="userPasswordCheck"
      />
      <input
        type="button"
        class="formButton"
        value="Cadastrar"
        @click="teste()"
      />
      <span class="formChange"
        >Já é cadastrado?
        <span @click.prevent="choiceOne()">Acessar</span></span
      >
    </form>

    <form v-show="login">
      <span class="formTitle">Acessar chat</span>
      <input type="email" required placeholder="E-mail" v-model="userEmail" />
      <input type="password" placeholder="Senha" v-model="userPassword" />
      <input
        type="button"
        class="formButton"
        value="Entrar"
        @click="teste()"
      />
      <span class="formChange"
        >Não é cadastrado?
        <span @click.prevent="choiceOne()">Cadastre-se</span></span
      >
      <button @click="teste">TASDASDASDASD</button>
      <router-link to="/chat">TESTANDO</router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import axios from "axios";

import { passWordMatch, emailCheck, isSomethingBlank } from '../../functions/VerifyFunction'

const hotmail = /@hotmail.com$/;
const gmail = /@gmail.com$/;
const outlook = /@outlook.com$/;
const yahoo1 = /@yahoo.com.br$/;
const yahoo2 = /@yahoo.com$/;

interface UserInfo {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  token: string;
  isLoggedIn: boolean;
}

export default defineComponent({
  name: "AuthenticationForms",
  data() {
    return {
      userName: "" as string,
      userEmail: "" as string,
      userPassword: "" as string,
      userPasswordCheck: "" as string,
      pwMatch: false as boolean,

      login: true as boolean,

      apiUrl: process.env.VUE_APP_URL_TESTE
    };
  },

  computed:{
    ...mapState([
      'userInfo'
    ])
  },

  methods: {
    ...mapMutations(["SET_USER_INFO"]),

    choiceOne(): void {
      this.login = !this.login;
    },
    passWordMatch(): boolean {
      return this.userPassword === this.userPasswordCheck;
    },
    emailCheck(): boolean {
      let isHotmail = hotmail.test(this.userEmail);
      let isGmail = gmail.test(this.userEmail);
      let isOutlook = outlook.test(this.userEmail);
      let isYahoo1 = yahoo1.test(this.userEmail);
      let isYahoo2 = yahoo2.test(this.userEmail);

      return isHotmail || isGmail || isOutlook || isYahoo1 || isYahoo2
        ? true
        : false;
    },
    async postCreateUser() {
      try {
        let formData = {
          name: this.userName,
          email: this.userEmail,
          password: this.userPassword,
        };

        await axios.post(`${this.apiUrl}/users`, formData)
          .then((res) => {
            if (res.status === 201) {
              window.alert(
                "Usuário cadatrado com sucesso! Agora acessa sua conta usando login e senha."
              );
              this.choiceOne();
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
      } catch (error) {
        window.alert(
          "Ocorreu um erro ao tentar enviar o formulário. Por Favor, tente novamente mais tarde."
        );
      }
    },
    async postLoginUser() {
      try {
        let formData = {
          email: this.userEmail,
          password: this.userPassword,
        };

        await axios
          .post(`${this.apiUrl}/auth`, formData)
          .then((res) => {
            if (res.status === 200) {
              let userInfo: UserInfo = { ...res.data, isLoggedIn: true };

              this.SET_USER_INFO(userInfo);
            } else if (res.status === 400) {
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
      } catch (error) {
        window.alert(
          "Ocorreu um erro ao tentar realizar o login. Por Favor, tente novamente mais tarde."
        );
      }
    },
    isEverythingOk(){
      if( isSomethingBlank([ this.userName, this.userEmail, this.userPassword, this.userPasswordCheck]) ){ //Verify if something is missing
        window.alert('Preencha todos os campos!')
        return false
      } else if( !emailCheck( this.userEmail ) ){
        window.alert('E-mail inválido!')
        return false
      } else if( !passWordMatch( this.userPassword, this.userPasswordCheck) ){
        window.alert('As senhas inseridas não batem!')
        return false
      } else {
        return true
      }
    },
    teste(){
      if(this.isEverythingOk()){
        window.alert('Deu tudo Certo!')
      }
    }
    /* createFormCheck() {
      let isBlank: boolean[] = BlankVerify([
        this.userName,
        this.userEmail,
        this.userPassword,
        this.userPasswordCheck,
      ]);
      let passwordMatch: boolean, isEmail: boolean;

      this.passWordMatch() ? (passwordMatch = true) : (passwordMatch = false);
      this.emailCheck() ? (isEmail = true) : (isEmail = false);

      if (isBlank[0] || isBlank[1] || isBlank[2] || isBlank[3]) {
        window.alert("Preencha todos os campos para avançar");
        return;
      }
      if (!passwordMatch) {
        this.passwordDontMatch = true;
        window.alert("Senhas inseridas não batem");
        return;
      }
      if (!isEmail) {
        this.isNotEmail = true;
        window.alert("E-mail inválido");
        return;
      }
    }, */
/*     sendLoginForm() {
      let isBlank: boolean[] = BlankVerify([this.userEmail, this.userPassword]);
      let isEmail: boolean;

      isBlank[0] ? (this.nameIsBlank = true) : (this.nameIsBlank = false);
      isBlank[1] ? (this.emailIsBlank = true) : (this.emailIsBlank = false);

      this.emailCheck() ? (isEmail = true) : (isEmail = false);

      if (isBlank[0] || isBlank[1] || isBlank[2] || isBlank[3]) {
        window.alert("Preencha todos os campos para avançar");
        return;
      }
      if (!isEmail) {
        this.isNotEmail = true;
        window.alert("E-mail inválido");
        return;
      }
    },
    teste(){
      this.$router.push('chat')
    } */
  },
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