<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
     var sid = this.$route.query.sid;
      var level = this.$route.query.level;
      var data = {
        sid
      }
      this.$axios({
        method:'get',
        url:'http://exam.weilang.top/Dxadmin/Api/measurementAPI',
        params:data
      }).then(res=>{
          var status = res.data.data.exam.status;
          var type = res.data.data.exam.type;
          var title = res.data.data.exam.title;
          document.title = title;
        if(level==1){
              if(type==2){
                this.$router.push({path:'/home',query:{type,sid}})
              }
              else{
                if(res.data.data.exam.show_type==1){
                  this.$router.push({path:'/alone',query:{type,sid}})
                }else if(res.data.data.exam.show_type==2){
                  this.$router.push({path:'/all',query:{type,sid}})
                }
              } 
        }else{
          if(status==1){
               if(type==2){
                this.$router.push({path:'/home',query:{type,sid}})
              }
              else{
                if(res.data.data.exam.show_type==1){
                  this.$router.push({path:'/alone',query:{type,sid}})
                }else if(res.data.data.exam.show_type==2){
                  this.$router.push({path:'/all',query:{type,sid}})
                }
              } 
          }else{
            alert("试卷暂未开放")
          }
        } 
       
      })
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
