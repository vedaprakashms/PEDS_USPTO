<template>
    <div id="nav" class="mx-3 my-2">
        <router-link :to="i.path" v-for="i in paths" :key="i" class="mx-1">
            {{ i.name }}
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    computed: {
        paths() {
            return this.$router.options.routes
        },
    },
})
</script>

<style lang="scss">
#nav {
    padding: 10px;
    border-style: solid;
    border-width: medium;
    border-color: var(--bs-pink);
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
