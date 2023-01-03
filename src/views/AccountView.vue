<script setup>
import Account from "../components/Account.vue"
</script>


<template>
    <div style="padding: 2rem">
        <div class="settings-container">
            <Account/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AccountView',
    components: {
        Account
    }
}

</script>

<style>

</style>