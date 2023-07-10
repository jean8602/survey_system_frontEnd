<script>
import TableView from "../components/Table.vue"

export default {
    components: {
        TableView
    }
}
</script>

<template>
    <div>
        <h2>問卷填寫</h2>
        <TableView/>
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>
</style>