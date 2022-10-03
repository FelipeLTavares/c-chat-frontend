<template>
  <form>
    <span id="formTitle">Fazer Cadastro</span>
    <input type="text" placeholder="Nome" v-model="userName">
    <input type="email" required placeholder="E-mail" v-model="userEmail">
    <input type="password" placeholder="Senha" v-model="userPassword">
    <input type="password" placeholder="Confirma sua senha" v-model="userPasswordCheck">
    <input type="button" class="formButton" value="Entrar" @click="sendData()">
    <span id="formChange" >Já é cadastrado? <a href="/">Acessar</a></span>

  </form>
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

      if(isBlank[0]&&isBlank[1]&&isBlank[2]&&isBlank[3]){
        console.log('Algo deu errado');
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
  form{
    width: 350px;
    height: 440px;
    background: #E3F6FC;
    border-radius: 14px;
    margin: 10vh auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #formTitle{
    width: 266px;
    height: 32px;
    margin-top: 32px;
    margin-bottom: 24px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    color: #52585D;
  }

  form > input {
    width: 252px;
    height: 40px;
    border-radius: 10px;

    background: #FDFDFD;
    border: 1px solid rgba(150, 169, 186, 0.7);
    border-radius: 14px;
    margin: 8px;
    padding-left: 17px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 18px;

    color: #96A9BA;
  }

  form > .formButton{
    padding: 0;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #FFFFFF;
    background-color: black;
    background-color: #6588DE;
    border-radius: 14px;
  }

  #formChange{
    width: 266px;
    height: 16px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #52585D;

    margin-bottom: 32px;
    margin-top: 24px;
  }
</style>