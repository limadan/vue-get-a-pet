<template>
  <div style="padding: 2rem">
    <div class="form">
      <h1>Detalhes do pet</h1>
      <div class="form-container">
        <img class="pet-image" :src="this.petImage" />
      </div>
      <div class="form-container">
        <h3>Nome do pet</h3>
        <p>{{this.name}}</p>
      </div>
      <div class="form-container">
        <h3>Idade do pet</h3>
        <p>{{this.age}} anos</p>
      </div>
      <div class="form-container">
        <h3>Peso do pet</h3>
        <p>{{this.weight}}kg</p>
      </div>
      <div class="form-container">
        <h3>Cor do pet</h3>
        <p>{{this.color}}</p>
      </div>

      <div class="form-container">
        <button class="adopt">ADOTAR</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import api from '../api/config'

export default {
  name: "PetDetailView",
  data(){
    return{
        petImage: '',
        name: '',
        age: '',
        weight: '',
        color: ''
    }
  },
  mounted(){
    Swal.showLoading()
    api.get(`pet/getPetById/${this.$route.params.id}`).then(res=>{
        this.petImage = res.data.pet_image
        this.name = res.data.name
        this.age = res.data.age
        this.weight = res.data.weight
        this.color = res.data.color
        Swal.close()
    }).catch((err)=>{
        const message = err.response.data.message
        Swal.fire({
            icon: 'error',
            text: `${message}`
        }).then(()=>{
            this.$router.push('/')
        })
    })
  }
};
</script>

<style scoped>
.pet-image {
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  object-fit: cover;
}
.form {
  background-color: #ffffff;
  padding: 2rem;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 2rem;
  border: #c5a100 solid 2px;
}

.form-container {
  width: 100%;
  margin: 1rem 0;
}

h3{
    font-weight: bold;
}

.adopt{
    width: 10rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: 2px solid #FFFFFF;
    color: #FFFFFF;
    margin: 10px;
    background-color: #0a1c83;
}
</style>
