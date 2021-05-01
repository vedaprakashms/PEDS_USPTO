<template>
    <Navhead />

    <router-view id="vp" />
    <Foot />
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#vp {
    min-height: 80vh;
}
</style>

<script>
import Navhead from "@/components/navhead.vue"
import Foot from "@/components/footer.vue"
export default {
    components: {
        Navhead,
        Foot,
    },
}
</script>
