<script setup>
import Swal from 'sweetalert2';
import api from '../api/config';
</script>
<template>
    <div style="padding: 2rem;">
        <div class="form">
            <h1>{{!this.$route.params.id?"Registrar novo pet":"Atualizar pet"}}</h1>

            <div class="form-container">
                <label for="name">Imagem do pet</label>
                <br/>
                <br/>
                <img v-if="this.petImagePreview" :src="this.petImagePreview"/>
                <img v-else src="../assets/blank-pet.svg"/>
                <input type="file" ref="file" v-on:change="this.uploadImage()"/>
            </div>

            <div class="form-container">
                <label for="name">Nome do pet</label>
                <br/>
                <input type="name" v-model="this.name"/>
            </div>


            <div class="form-container">
                <label for="age">Idade do pet</label>
                <br/>
                <input type="number" v-model="this.age"/>
            </div>

            <div class="form-container">
                <label for="weight">Peso do pet</label>
                <br/>
                <input type="number" v-model="this.weight"/>
            </div>

            <div class="form-container">
                <label for="color">Cor do pet</label>
                <br/>
                <input type="text" v-model="this.color"/>
            </div>

            <div class="form-container">
                <button v-if="!this.$route.params.id" @click="this.saveNewPet()">CADASTRAR PET</button>
                <button v-else @click="this.updatePet()">ATUALIZAR PET</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "saveNewPet",
        props: ['id'],
        data(){
            return {
                name: '',
                age: 0,
                weight: 0,
                description: '',
                petImageFile: '',
                petImagePreview: ''
            }
        },

        methods: {
            uploadImage(){
                this.petImageFile = this.$refs.file.files[0];
                this.petImagePreview = URL.createObjectURL(this.petImageFile)
            },

            saveNewPet(){
                Swal.fire({
                    icon: 'question',
                    text: 'Tem certeza de que deseja cadastrar este pet?',
                    showConfirmButton: true,
                    confirmButtonText: 'CADASTRAR PET',
                    showCancelButton: true,
                    cancelButtonText: 'CANCELAR'
                }).then(result=>{
                    if(result.isConfirmed){
                        Swal.showLoading()
                        const formData = new FormData()
                        formData.append('name', this.name)
                        formData.append('age', this.age)
                        formData.append('weight', this.weight)
                        formData.append('color', this.color)
                        formData.append('pet_image', this.petImageFile)

                        const headers = {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        }

                        api.post('pet/registerNewPet', formData, headers).then(res=>{
                            Swal.fire({
                                icon: 'success',
                                text: 'Parabéns! Você acabou de cadastrar um pet'
                            }).then(()=>{
                                this.$router.push('pets')
                            })
                        }).catch((err)=>{
                            Swal.fire({
                                icon: 'error'
                            })
                        })
                    }
                })
            },

            updatePet(){
                Swal.fire({
                    icon: 'question',
                    text: 'Tem certeza de que deseja atualizar este pet?',
                    showConfirmButton: true,
                    confirmButtonText: 'ATUALIZAR PET',
                    showCancelButton: true,
                    cancelButtonText: 'CANCELAR'
                }).then(result=>{
                    if(result.isConfirmed){
                        Swal.showLoading()
                        const id = this.$route.params.id
                        const formData = new FormData()
                        formData.append('name', this.name)
                        formData.append('age', this.age)
                        formData.append('weight', this.weight)
                        formData.append('color', this.color)
                        if(this.petImageFile){
                            formData.append('pet_image', this.petImageFile)
                        }else{
                            formData.append('pet_image', this.petImagePreview)
                        }
                         
                        console.log(formData)
                        const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
                            'Content-Type': 'multipart/form-data'
                        }

                        api.put(`pet/updatePet/${id}`, formData, headers).then(res=>{
                            Swal.fire({
                                icon: 'success',
                                text: 'Pet atualizado com sucesso!'
                            }).then(()=>{
                                this.$router.push('/pets')
                            })
                        }).catch((err)=>{
                            Swal.fire({
                                icon: 'error'
                            })
                        })
                    }
                })
            }
        },

        mounted(){
            const id = this.$route.params.id
            if(id){
                api.get(`pet/getPetById/${id}`).then((res)=>{
                    const petData = res.data

                    this.name = petData.name
                    this.age = petData.age
                    this.weight = petData.weight
                    this.color = petData.color
                    this.petImagePreview = petData.pet_image
                })
            }
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
    object-fit: cover;
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

.form-container button {
    width: 25%;
    margin-bottom: 10px;
    height: 2.5rem;
    border-radius: 1.25rem;
    background-color: #ffffff;
    color: #c5a100;
    border: #c5a100 solid 2px;
    transition: 0.2s all;
}


.form-container button:hover{
    background-color: #ebebeb;
}
</style>