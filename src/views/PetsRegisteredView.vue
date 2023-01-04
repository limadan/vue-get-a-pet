<script setup>
import CardPetRegistered from '../components/cards/PetRegistered.vue'
import { RouterLink } from 'vue-router';
import api from '../api/config';
import Swal from 'sweetalert2';
</script>

<template>
    <div style="padding: 2rem;">
        <h2>Meus pets cadastrados</h2>

        <div class="page-container">
            <div class="error-container" v-if="this.pets.length===0">
                <h3>Você não tem nenhum pet registrado na plataforma.</h3>
                <h3>Registre seu primeiro pet.</h3>
            </div>
            <template v-else v-for="pet in this.pets">
                <CardPetRegistered :pet="pet"/>
            </template>
        </div>
        <RouterLink to="register-pet">
            <button class="register">REGISTRAR</button>
        </RouterLink>
    </div>


</template>

<script>

export default {
    name: "PetsRegisteredView",
    data(){
        return {
            pets: []
        }
    },
    mounted(){
        Swal.showLoading()
        api.get('pet/getPetsByUser', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
            }
        }).then(res=>{
            this.pets = res.data
            Swal.close()
        }).catch((err)=>{
            const message = err.response.data.message
            Swal.fire({
                icon: 'error',
                text: `${message}`
            })
        })
    }
}

</script>

<style scoped>

.page-container{
    position: relative;
    height: 100%;
    width: 100%;
    margin: auto;
}

.error-container{
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
}

.register{
    position: fixed;
    z-index: 9;
    bottom: 10%;
    right: 5%;
    width: 10rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: 2px solid #FFFFFF;
    color: #FFFFFF;
    background-color: #0a1c83;
}
</style>