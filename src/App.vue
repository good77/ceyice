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
html{
  font-size:26.666666666666666666666666667vw;
}
*{
  padding:0;
  margin:0;
}
li{
  list-style: none;
}
button{
  outline:none;
}
textarea{
  resize:none ;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}
#app{
    min-height: 100vh;
    width: 100vw;
    background:  linear-gradient(90deg, #9075FF, #5496FF);
    overflow: hidden;
    font-size:.14rem;
    position: relative;
}
</style>
