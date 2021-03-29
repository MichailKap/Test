<template>
  <div id="app">
    <Loading v-if="$store.state.loading" />
    <Table />
  </div>
</template>

<script>
import Table from './components/Table.vue'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    Table,
    Loading
  }
}
</script>

<style>
</style>
