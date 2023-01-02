<script setup>
import api from '../../api/config';
import Swal from 'sweetalert2'
</script>


<template>
    <div class="page-container">
        <div class="form">
            <div class="form-container">
                <h1>Get a Pet!</h1>
                <h3>Faça seu cadastro</h3>
            </div>
            
            <div class="form-container">
                <label for="name">Nome</label>
                <br/>
                <input type="text" v-model="name"/>
            </div>

            <div class="form-container">
                <label for="email">E-mail</label>
                <br/>
                <input type="email" v-model="email"/>
            </div>

            <div class="form-container">
                <label for="password">Senha</label>
                <br/>
                <input id="password" type="password" v-model="password">
            </div>

            <div class="form-container">
                <label for="confirm-password">Confirmar senha</label>
                <br/>
                <input id="confirm-password" type="password" v-model="confirmPassword">
            </div>

            <div class="form-container">
                <button @click="this.signup()">CADASTRAR</button>
                <br/>
                <RouterLink to="/login">Já tem cadastro? Faça login aqui.</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Signup',
    data(){
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },

    methods: {
        signup(){
            if(this.password!==this.confirmPassword){
                Swal.fire({
                    icon: 'error',
                    text: `As senhas não conferem.`
                })

                return
            }

            Swal.showLoading()

            const dataObject = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            api.post('auth/signup', dataObject).then(res=>{
                Swal.fire({
                    icon: 'success',
                    text: 'Usuário cadastrado com sucesso!'
                }).then(()=>{
                    this.$router.push('login')
                })
            }).catch((err)=>{
                const error = err.response.data.message

                Swal.fire({
                    icon: 'error',
                    text: `${error}`
                })
            })
        }
    }
}

</script>

<style scoped>
.page-container{
    width: 100%;
    height: 100%;
    background-color: #ffd931;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form {
    background-color: #ffffff;
    padding: 2rem;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 2rem;
    border:  #c5a100 solid 2px;
}

.form-container{
    width: 100%;
}

.form-container h1, .form-container h3{
    text-align: center;
}


.form-container input {
    width: 100%;
    height: 2rem;
    padding: 0 1rem;
    background-color: #ebebeb;
    border: none;
    outline: none;
    transition: 0.2s all;
}

.form-container button {
    width: 100%;
    margin-bottom: 10px;
    height: 2.5rem;
    border-radius: 1.25rem;
    background-color: #ebebeb;
    color: #c5a100;
    border: #c5a100 solid 2px;
    transition: 0.2s all;
}


.form-container:focus-within{
    border-bottom: solid 2px #c5a100;
}
</style>