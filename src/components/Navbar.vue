<template>
    <nav class="navbar">
        <div class="logo">
            <img src="../assets/dog.png"/>
            <h1>Get A Pet!</h1>
        </div>
        
        <div class="links">
            <RouterLink to="home">Home</RouterLink>
            <RouterLink to="adoptions">Minhas Adoções</RouterLink>
            <RouterLink to="pets">Meus Pets Cadastrados</RouterLink>
            <RouterLink to="account">Conta</RouterLink>
        </div>
    </nav>
</template>

<script>

export default {
    name: "Navbar"
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

.logo{
    display: flex;
    align-items: center;
}

.logo img {
    width: 50px;
    margin-right: 1rem;
}

.links {
    display: flex;
    justify-content: space-between;
    width: 30%;
}

</style>