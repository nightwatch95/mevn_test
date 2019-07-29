<template>
  <div id="app">
    <clients></clients>
    <modal></modal>
  </div>
</template>

 <script>
import Clients from "./components/Clients";
import Modal from "./components/Modal";

export default {
  name: 'app',

  components: {
    Clients,
    Modal
  }
}
</script>

<style>

</style>
