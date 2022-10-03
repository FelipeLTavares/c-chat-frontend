<template>
  <div class="containerCreateUserForm">
    <form v-show="false">
      <span class="formTitle">Fazer Cadastro</span>
      <input type="text" placeholder="Nome" v-model="userName">
      <input type="email" required placeholder="E-mail" v-model="userEmail">
      <input type="password" placeholder="Senha" v-model="userPassword">
      <input type="password" placeholder="Confirma sua senha" v-model="userPasswordCheck">
      <input type="button" class="formButton" value="Entrar" @click="sendData()">
      <span class="formChange" >Já é cadastrado? <a href="/">Acessar</a></span>
    </form>

    <form v-show="true">
      <span class="formTitle">Acessar chat</span>
      <input type="email" required placeholder="E-mail" v-model="userEmail">
      <input type="password" placeholder="Senha" v-model="userPassword">
      <input type="button" class="formButton" value="Entrar" @click="sendData()">
      <span class="formChange" >Já é cadastrado? <a href="/">Acessar</a></span>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

const hotmail = /@hotmail.com$/;
const gmail = /@gmail.com$/

export default defineComponent({
  name: 'FormCreateUser',
  data(){
    return{
      userName: '' as string,
      userEmail: '' as string,
      userPassword: '' as string,
      userPasswordCheck: '' as string,
      pwMatch: false as boolean,

      nameIsBlank: false as boolean,
      emailIsBlank: false as boolean,
      passwordIsBlank: false as boolean,
      passwordCheckIsBlank: false as boolean,

      passwordDontMatch: false as boolean,
      isNotEmail: false as boolean
    }
  },
  methods:{
    passWordMatch():boolean{
      return (this.userPassword === this.userPasswordCheck);
    },
    emailCheck():boolean{
      let isHotmail = hotmail.test(this.userEmail);
      let isGmail = gmail.test(this.userEmail);
      return isHotmail || isGmail? true : false;
    },
    sendData(){
      let isBlank:boolean[] = [];
      let passwordMatch:boolean, isEmail:boolean; 

      this.userName === ''? isBlank[0]=true: isBlank[0]=false;
      this.userEmail === ''? isBlank[1]=true: isBlank[1]=false;
      this.userPassword === ''? isBlank[2]=true: isBlank[2]=false;
      this.userPasswordCheck === ''? isBlank[3]=true: isBlank[3]=false;

      isBlank[0]? this.nameIsBlank=true:this.nameIsBlank=false;
      isBlank[1]? this.emailIsBlank=true:this.emailIsBlank=false;
      isBlank[2]? this.passwordIsBlank=true:this.passwordIsBlank=false;
      isBlank[3]? this.passwordCheckIsBlank=true:this.passwordCheckIsBlank=false;

      this.passWordMatch()? passwordMatch = true: passwordMatch = false;
      this.emailCheck()? isEmail = true: isEmail = false;

      if(isBlank[0]||isBlank[1]||isBlank[2]||isBlank[3]){
        window.alert('Preencha todos os campos para avançar');
        isBlank.forEach( e => console.log(e))
        return
      }
      if(!passwordMatch){
        this.passwordDontMatch = true;
        window.alert('Senhas inseridas não batem');
        return
      }
      if(!isEmail){
        this.isNotEmail = true;
        window.alert('E-mail inválido')
        return
      }

      console.log(`
        Cadastrando:
        Nome: ${this.userName},
        E-mail: ${this.userEmail},
        Senha: ${this.userPassword}
      `)

    },
    async sendFormData(){
      let formData = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword
      }
      await axios.post('/', formData)
    }
  }
})
</script>

<style scoped lang="scss">
  .flex-center{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .containerCreateUserForm{
    width: 100%;
    height: 100vh;
    @extend .flex-center
  }
  
  .formTitle{
    height: 32px;
    margin-top: 32px;
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 24px;
    color: $c-text-gray;
  }
  
  form{
    width: 350px;
    background: $c-lightblue;
    border-radius: 14px;
    
    @extend .flex-center;
    flex-direction: column;

    input{
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
    .formButton{
      font-weight: 600;
      font-size: 12px;
      color: $c-generalbg;
      background-color: $c-royalblue;
      padding: 0;
      border-radius: 14px;

      &:hover{
        opacity: 0.8;
      }
    }
  }
  .formChange{
    width: 266px;
    height: 16px;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    color: $c-text-gray;
    margin-bottom: 32px;
    margin-top: 24px;
  }
</style>