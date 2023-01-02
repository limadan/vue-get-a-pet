<script setup>
import Swal from 'sweetalert2';
import api from '../api/config';
import CardPet from '../components/CardPet.vue';
</script>


<template>
    <div style="padding: 2rem">
        <h2>Pets cadastrados</h2>
        <div class="card-pet-container">
            <template v-for="pet in this.petArray">
                <CardPet :pet="pet"/>
            </template>
        </div>
    </div>
</template>

<script>

export default {
    name: "HomeView",
    components: {
        CardPet
    },
    data(){
        return {
            petArray: []
        }
    },

    mounted(){
        Swal.showLoading()
        const TOKEN = localStorage.getItem('TOKEN')
        api.get('pet/getAllPets', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then((res)=>{
            this.petArray = res.data
            Swal.close()
        }).catch(err=>{
            const error = err.response.data.message

            Swal.fire({
                icon: 'error',
                text: `${error}`
            }).then(()=>{
                this.$router.push('login')
            })
        })
    }
}

</script>

<style>

.card-pet-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem
}

</style>