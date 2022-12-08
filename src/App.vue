<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 12px;
  font-family: "Uni Sans", "等线", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100%;
  border: 0;
}

.el-header, .el-footer {
  height: 64px;
  width: 100%;
  font-size: 14px;
  text-align: left;
  position: fixed;
  z-index: 999;
  background-color: #373737;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #DCD0C0;
  color: #333;
  text-align: center;
  margin: 0 15px;
  padding: 0 25px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.el-main {
  background-color: #E4E4DB;
  color: #333;
  line-height: 40px;
  text-align: center;
  margin: 0 15px;
  padding: 0 25px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.details-button {
  background-color: #575757;
}

.el-card {
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.el-tabs {
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.comment-tag {
  margin: 0 5px;
  padding: 5px 12px;
  color: #C0B283;
  background-color: #FAFAF7;
  font-weight: bolder;
  border: 3px solid #DCD0C0;
  border-radius: 15px;
}
</style>
