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
        <span><LoadingComponent v-show="createdUserInfo.isLoading" /> Cadastrar</span>
      </button>
      <button
        type="submit"
        class="formButton"
        v-show="!login"
        :disabled="userInfo.isLogedLoading"
      >
        <span><LoadingComponent v-show="userInfo.isLogedLoading" /> Entrar</span>
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
import LoadingComponent from "../Loading/LoadingComponent.vue";

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
    };
  },

  components: { LoadingComponent },

  computed: {
    ...mapState(["createdUserInfo","userInfo"]),
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

    if(this.userInfo.isLoggedIn) {
      this.$router.push("/chat");
      return
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

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    @extend input;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;

      &:hover {
        opacity: 0.7;
      }
    }

    span {
      display: flex;
      align-items: center;
    }
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