<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create Client</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/clients" class="nav-link">Clients</router-link>
        </li>
      </ul>
    </nav><br />

    <transition name="fade">
      <router-view>

      </router-view>
    </transition>
  </div>
</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
import CreateComponent from './components/CreateComponent.vue';
import IndexComponent from './components/IndexComponent.vue';
import EditComponent from './components/EditComponent.vue';
import NotFoundComponent from './components/NotFoundComponent.vue';

export default {
  name: 'app',
  components: {
    HomeComponent,
    CreateComponent,
    IndexComponent,
    EditComponent,
    NotFoundComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
