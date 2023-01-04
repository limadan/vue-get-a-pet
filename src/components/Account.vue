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
                <img v-if="this.profile_image" :src="this.profile_image"/>
                <img v-else src="../assets/blank-profile.svg"/>
            </div>
            
            <div class="form-container">
                <label for="name">Nome</label>
                <br/>
                <input type="name" v-model="this.nameEdit" :disabled="!this.editionEnabled"/>
            </div>


            <div class="form-container">
                <label for="email">E-mail</label>
                <br/>
                <input type="email" v-model="this.emailEdit" :disabled="!this.editionEnabled"/>
            </div>
            <div class="form-container">
                <button @click="this.editUserData()">Editar</button>
                <button v-if="editionEnabled" @click="this.cancelEdit()">Cancelar</button>
            </div>
            
            <div class="form-container">
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
            user: {
                name: '',
                email: '',
                profile_image: ''
            },
            nameEdit: '',
            emailEdit: '',
            imageFile: '',
            editionEnabled: false
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
                this.user.name = res.data.name
                this.user.email = res.data.email
                this.user.password = res.data.password
                this.user.profile_image = res.data.profile_image

                this.nameEdit = this.user.name
                this.emailEdit = this.user.email
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
        },

        editUserData(){
            if(!this.editionEnabled){
                //Salvar dados no banco
                this.editionEnabled = !this.editionEnabled
                return
            }

            Swal.fire({
                icon: "warning",
                text: "Tem certeza de que deseja alterar suas informações de nome e e-mail? O seu cadastro será alterado da próxima vez que fazer login.",
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: "CANCELAR",
                confirmButtonText: "ALTERAR"
            }).then((result)=>{
                console.log(result)
                if(!result.isConfirmed){
                    this.cancelEdit()
                }else{
                    Swal.showLoading()
                    const dataObject = {
                            name: this.nameEdit,
                            email: this.emailEdit
                        }

                    api.put('user/updateUser', dataObject).then(res=>{
                        Swal.fire({
                            icon: 'success',
                            text: 'Dados alterados com sucesso!'
                        })

                        this.getUserData()
                    }).catch(err=>{
                        Swal.fire({
                            icon: 'error',
                            text: 'Houve algum erro ao tentar editar os seus dados. Tente novamente mais tarde.'
                        })

                        this.getUserData()
                        console.log(err)
                    })

                    Swal.close()
                }

                this.editionEnabled = false
            })
            
        },

        cancelEdit(){
            this.nameEdit = this.user.name
            this.emailEdit = this.user.email
            this.editionEnabled = false
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
    background-color: #ebebeb;
    border: none;
    outline: none;
    transition: 0.2s all;
}

.form-container input[disabled]{
    background-color: #cecece; 
}

.form-container input:focus-within{
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