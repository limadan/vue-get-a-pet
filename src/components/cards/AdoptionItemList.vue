<template>
    <div class="card-pet-registered">
        <div class="pet-info">
            <img :src="this.petImage"/>
            <div>
                <h3>{{this.petName}}</h3>
            </div>
        </div>
        <div class="interactions">
            <button>Ver detalhes</button>
        </div>
    </div>
</template>

<script>
import api from '../../api/config';


export default {
    name: "AdoptionItemList",
    props: ['pet_id'],
    data(){
        return {
            petName: '',
            petImage: ''
        }
    },
    mounted(){
        api.get(`pet/getPetById/${this.$props.pet_id}`).then((res)=>{
            this.petName = res.data.name
            this.petImage = res.data.pet_image
        })
    }
}

</script>

<style scoped>
.card-pet-registered{
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 2px solid #dddddd;
}

.pet-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 14%;
}

.pet-info img{
    height: 4rem;
    width: 4rem;
    object-fit: cover;
    border-radius: 2rem;
}

.interactions {
    display: flex;
    width: 50%;
    justify-content: space-evenly;
}

.interactions button {
    width: 8rem;
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid;
}
</style>