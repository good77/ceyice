<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    var type = this.$route.query.type
    var show_type = this.$route.query.show_type
    var sid = this.$route.query.sid
    if(type==1||type==3){
      if(show_type==1){
          this.$router.push({path:'/alone',query:{type,sid,show_type}})
      }else{
        this.$router.push({path:'/all',query:{type,sid,show_type}})
      }
    }else{
      this.$router.push({path:'/home',query:{type,sid,show_type}})
    }
  }
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
