<template>
    <nav class="navbar" style="cursor: pointer">
        <div @click="this.backToPreviousPage">
            <h3>Voltar para a página anterior</h3>
        </div>
        
        <h3>
            {{this.$route.name}}
        </h3>
    </nav>
</template>

<script>

export default {
    name: "NavbarMain",

    methods: {
        backToPreviousPage(){
            this.$router.go(-1)
        }
    }
}

</script>

<style>

.navbar {
    width: 100%;
    height: 4rem;
    background: #ffd931;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
}

</style>