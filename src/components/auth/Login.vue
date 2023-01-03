<script setup>
import api from '../../api/config';
import Swal from 'sweetalert2'
</script>

<template>
    <div class="page-container">
        <div class="form">
            <div class="form-container">
                <h1>Get a Pet!</h1>
                <h3>Faça login</h3>
            </div>
            
            <div class="form-container">
                <label for="email">E-mail</label>
                <br/>
                <input type="email" v-model="this.email"/>
            </div>

            <div class="form-container">
                <label for="password">Senha</label>
                <br/>
                <input id="password" type="password" v-model="this.password">
            </div>

            <div class="form-container">
                <button @click="this.doLogin()">LOGIN</button>
                <br/>
                <RouterLink to="/signup">Não tem login? Faça seu cadastro aqui.</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Login",
    data(){
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        doLogin(){
            Swal.showLoading()
            const dataObject = {
                email: this.email,
                password: this.password
            }
            api.post('auth/login', dataObject).then((res)=>{
                const token = res.data.token
                localStorage.setItem('TOKEN', token)
                Swal.fire({
                    icon: 'success',
                    text: 'Login realizado com sucesso!'
                }).then(()=>{
                    this.$router.push('/')
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


.form-container input:focus-within{
    border-bottom: solid 2px #c5a100;
}
</style>