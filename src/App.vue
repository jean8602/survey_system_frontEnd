<script>
import { RouterLink, RouterView } from 'vue-router';
import HeaderView from "./components/Header.vue";
export default {
    components: {
        HeaderView
    }

}


</script>

<template>

  <HeaderView/>
  <div class="showData">
    <RouterView />
  </div>

</template>

<style lang="scss">
</style>
