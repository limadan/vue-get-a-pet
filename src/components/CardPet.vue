<template>
    <div class="pet-card">
        <img :src="this.$props.pet.pet_image"/>
        <div class="pet-info">
            <h2>{{this.$props.pet.name}}</h2>
            <h4>{{this.$props.pet.age}} anos</h4>
            <template v-if="!this.$props.pet.adopted">
                <button>ADOTAR</button>
            </template>
            <template v-else>
                <h4>Adotado!</h4>
            </template>
        </div>
    </div>
</template>

<script>

export default {
    name: "CardPet",
    props: ['pet']
}

</script>

<style scoped>

.pet-card{
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    background-color: #c9c9c9;
}

.pet-card img{
    width: 100%;
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

</style>