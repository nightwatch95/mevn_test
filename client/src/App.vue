<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

 <script>

export default {
  name: 'app'
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

.form {
  display: inline-block;
}
.text-input {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.row {
  margin: 20px;
}
.add_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 260px;
  border: none;
  cursor: pointer;
}
label {
  display: inline-block;
  text-align: right;
  width: 80px;
  margin: 7px 20px 0 0;
}

.table-wrap {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
table th,
table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_client_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}

.list {
  display: inline-block;
  text-align: center;
  width: 500px;
  margin-top: 7px;
}

table label {
  display: inline-block;
  text-align: left;
}
table input {
  display: inline-block;
  width: auto;
}
table.wide {
  width: 100%;
}
.label-left-margin {
  margin-left: 15px;
}
</style>
