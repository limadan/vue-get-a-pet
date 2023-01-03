<script setup>
import Swal from 'sweetalert2';
import api from '../api/config';
</script>
<template>
    <div>
        <div class="form">
            <h1>Configurações da conta</h1>
            <div class="form-container">
                <label for="profile-image">Foto de perfil</label>
                <br/>
                <img :src="this.profile_image"/>
            </div>
            
            <div class="form-container">
                <label for="name">Nome</label>
                <br/>
                <input type="name" v-model="this.name" disabled/>
            </div>


            <div class="form-container">
                <label for="email">E-mail</label>
                <br/>
                <input type="email" v-model="this.email" disabled/>
            </div>

            <h2>Opções</h2>
            <div class="form-container">
                <a>Editar dados</a>
                <br/>
                <a @click="this.logout()">Fazer logout</a>
                <br/>
                <a style="color: #FF0707" @click="this.deleteUser()">
                    <i class="fas fa-trash"></i>  Deletar minha conta
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Account",
    data(){
        return {
            editionEnabled: false,
            name: '',
            email: '',
            password: '',
            profile_image: '',
            imageFile: ''
        }
    },

    methods: {
        getUserData(){
            Swal.showLoading()

            const token = localStorage.getItem('TOKEN')

            api.get('user/getUserData', {
                headers: {
                    'Authorization': token? `Bearer ${token}` : ''
                }
            }).then((res)=>{
                this.name = res.data.name
                this.email = res.data.email
                this.password = res.data.password
                this.profile_image = res.data.profile_image
                Swal.close()
            }).catch(err=>{
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    text: `${err.response.data.message}`
                })
                this.$router.push('login')
            })
        },

        updateUser(){
            Swal.fire({
                icon: 'question',
                text: `Tem certeza de que deseja prosseguir com a alteração?`,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'ALTERAR',
                cancelButtonText: 'CANCELAR'
            }).then(result=>{
                if(result.isConfirmed){
                    Swal.showLoading()
                    const token = localStorage.getItem('TOKEN')
                    const dataObject = {
                        name: this.name,
                        email: this.email
                    }


                    api.put('user/updateUser', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }, dataObject).then(res=>{
                        console.log(res)
                    }).catch(err=>{
                        console.log(err)
                    })

                    Swal.close()
                }
            })
        },

        deleteUser(){
            Swal.fire({
                question: 'Deletar sua conta?',
                icon: 'warning',
                input: 'text',
                text: `Você está prestes a apagar sua conta. Todas as suas 
                       adoções e pets registrados serão apagados do sistema. 
                       Se deseja prosseguir, insira sua senha abaixo e clique em 'DELETAR'.`,
                inputPlaceholder: "Write something",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonColor: 'red',
                confirmButtonText: 'DELETAR',
                cancelButtonText: "CANCELAR"
            }).then(result=>{
                if(result.isConfirmed){
                    Swal.showLoading()
                    const token = localStorage.getItem('TOKEN')
                    const requestInfo = {
                        headers: {
                            'Authorization': token? `Bearer ${token}` : ''
                        },
                        data: {
                            password: result.value
                        }
                    }
                    api.delete('user/deleteUser', requestInfo).then(()=>{
                        Swal.fire({
                            icon: 'success',
                            text: 'Perfil deletado do sistema.'
                        })

                        localStorage.removeItem('TOKEN')
                        this.$router.push('login')
                    }).catch(err=>{
                        const message = err.response.data.message

                        Swal.fire({
                            icon: 'error',
                            text: `${message}`
                        })

                    })
                }
            })
        },

        logout(){
            localStorage.removeItem('TOKEN')
            this.$router.push('login')
        }

    },

    mounted(){
        this.getUserData()
    }
}

</script>

<style scoped>
.form {
    background-color: #ffffff;
    padding: 2rem;
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 2rem;
    border:  #c5a100 solid 2px;
}

.form-container{
    width: 100%;
    margin: 1rem 0;
}

.form-container img{
    width: 15rem;
    height: 15rem;
    border-radius: 7.5rem;
    margin: 15px 0;
}

.form-container h1, .form-container h3{
    text-align: center;
}


.form-container input {
    width: 100%;
    height: 2rem;
    padding: 0 1rem;
    background-color: #cecece; 
    border: none;
    outline: none;
    transition: 0.2s all;
}

.form-container input:focus-within{
    background-color: #ebebeb;
    border-bottom: solid 2px #c5a100;
}

.form-container .edit, .form-container .delete{
    height: 4rem;
    width: 30%;
    border-radius: 2rem;
    font-family: Poppins;
    margin: 0 10%;
    border: none;
}

.form-container .delete{
    color: #ffffff;
    background-color: #e45353;
}

</style>