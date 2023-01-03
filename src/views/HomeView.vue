<script setup>
import Swal from 'sweetalert2';
import api from '../api/config';
import PetAdopt from '../components/cards/PetAdopt.vue';
</script>


<template>
    <div style="padding: 2rem">
        <h2>Pets cadastrados</h2>
        <div class="card-pet-container">
            <template v-for="pet in this.petArray">
                <PetAdopt :pet="pet"/>
            </template>
        </div>
    </div>
</template>

<script>

export default {
    name: "HomeView",
    components: {
        PetAdopt
    },
    data(){
        return {
            petArray: []
        }
    },

    mounted(){
        Swal.showLoading()
        api.get('pet/getAllPets').then((res)=>{
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
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem
}

</style>