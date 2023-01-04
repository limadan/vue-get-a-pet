<template>
    <div class="card-pet-registered">
        <div class="pet-info">
            <img :src="this.$props.pet.pet_image"/>
            <h3>{{this.$props.pet.name}}</h3>
        </div>
        <div class="interactions">
            <button>Editar</button>
            <button>Visualizar</button>
            <button @click="this.deletePet()">Excluir pet</button> 
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import api from '../../api/config';


export default {
    name: 'CardPetRegistered',
    props: ['pet'],
    methods: {
        deletePet(){
            Swal.fire({
                icon: 'warning',
                text: 'Tem certeza que deseja deletar este pet da plataforma?',
                showConfirmButton: true,
                confirmButtonText: 'DELETAR',
                showCancelButton: true,
                cancelButtonText: 'CANCELAR'
            }).then((result)=>{
                if(result.isConfirmed){
                    Swal.showLoading()
                    const headers = {
                        'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                    }

                    api.delete(`pet/deletePet/${this.$props.pet.id}`).then(res=>{
                        Swal.fire({
                            icon: 'success',
                            text: 'Pet apagado com sucesso!'
                        }).then(()=>{
                            this.$router.go()
                        })
                        
                    }).catch(err=>{
                        Swal.fire({
                            icon: 'error',
                            text: 'Não foi possível apagar o pet. Tente novamente mais tarde'
                        })
                    })
                }
            })
            
        }
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
    width: 12%;
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