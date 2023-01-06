<template>
    <div>
        <div class="pet-card" @click="this.seeDetail()">
            <img :src="this.$props.pet.pet_image"/>
            <div class="pet-info">
                <h2>{{this.$props.pet.name}}</h2>
                <h4><i class="fas fa-birthday-cake"></i>  {{this.$props.pet.age}} anos</h4>
                <h4 v-if="this.$props.pet.adopted">Adotado!</h4>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "CardPet",
    props: ['pet'],
    methods: {
        seeDetail(){
            const petId = this.$props.pet.id
            this.$router.push(`pet-detail/${petId}`)
        }
    }
}

</script>

<style scoped>

.pet-card{
    border-radius: 1rem;
    background-color: #c9c9c9;
    transition: 0.2s;
    width: 100%;
    height: 100%;
}

.pet-card img{
    width: 100%;
    height: 60%;
    object-fit: cover;
    border-radius: 1rem;
}

.pet-info {
    width: 100%;
    padding: 0 1rem 1rem 1rem;
}

.pet-info button {
    width: 80%;
    margin: 10px 10%;
    height: 2rem;
    border-radius: 1rem;
    color: #fff;
    border: solid #fff 1px;
    background-color: #0a1c83;
}

.pet-card:hover{
    box-shadow: 0px 5px 5px #707070;
    margin-top: 10px;
}

</style>