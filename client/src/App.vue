<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Clients</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/providers" class="nav-link">Providers</router-link>
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

export default {
  name: 'App'
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
