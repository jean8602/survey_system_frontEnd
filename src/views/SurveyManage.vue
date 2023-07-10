<script>
import { RouterView } from 'vue-router';

import TableView from "../components/Table.vue"


export default {
    components: {
        TableView,

    },

    data() {
        return {
            admin: "user"
        }
    },
}

</script>

<template>
    <div class="survey-manage">
        <!-- <FunctionSelectView/> -->
        <div class="search-bar">
        </div>
        <div class="list">
            <TableView admin="admin" />
        </div>
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>


</style>