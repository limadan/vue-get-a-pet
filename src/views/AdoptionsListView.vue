<script setup>
import Swal from 'sweetalert2';
import api from '../api/config';
import AdoptionItemList from '../components/cards/AdoptionItemList.vue'
</script>

<template>
    <div style="padding: 2rem;">
        <h2>Minhas adoções agendadas</h2>

        <div class="page-container">
            <div class="error-container" v-if="this.adoptionsArray.length===0">
                <h3>Você não tem nenhuma adoção agendada na plataforma.</h3>
                <h3>Adote seu primeiro pet.</h3>
                <RouterLink to="/">
                    <button class="register">ADOTAR</button>
                </RouterLink>
            </div>
            <template v-else v-for="adoption in this.adoptionsArray">
                <AdoptionItemList :pet_id="adoption.pet_id"/>
            </template>
        </div>
    </div>

</template>

<script>

export default {
    name: 'AdoptionsListView',
    components: {
        AdoptionItemList
    },
    data(){
        return {
            adoptionsArray: []
        }
    },
    mounted(){
        Swal.showLoading()
        api.get('pet/getAdoptionsByUser').then(res=>{
            this.adoptionsArray = res.data
            Swal.close()
        }).catch(err=>{
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
    z-index: 9;
    width: 10rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: 2px solid #FFFFFF;
    color: #FFFFFF;
    margin: 10px;
    background-color: #0a1c83;
}
</style>