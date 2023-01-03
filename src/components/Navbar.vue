<template>
    <nav class="navbar">
        <div class="logo">
            <img src="../assets/dog.png"/>
            <h1>Get A Pet!</h1>
        </div>
        
        <div class="links">
            <RouterLink to="/">
                <i class="fa-solid fa-house"></i>   Home
            </RouterLink>
            <RouterLink to="adoptions">
                <i class="fa-solid fa-bone"></i>  Minhas Adoções</RouterLink>
            <RouterLink to="pets">
                <i class="fa-solid fa-cake"></i>  Meus Pets Cadastrados
            </RouterLink>
            <RouterLink to="account">
                <i class="fa-solid fa-user"></i>   Conta
            </RouterLink>
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