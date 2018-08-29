<template>
  <div class="home">
    <img src="../assets/img/logo@2x.png" alt="" class='img1'>
    <img src="../assets/img/bg.png" alt="" class='img2'>
    <button class='start' @click='start'>立即评测</button>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  methods:{
    start(){
      var data = {
        sid : 18
      }
      this.$axios({
        method:'get',
        url:'http://exam.weilang.top/Dxadmin/Api/measurementAPI',
        params:data
      }).then(res=>{
        var type = res.data.data.exam.type;
        var sid = 18;
        if(res.data.data.exam.show_type==1){
          this.$router.push({path:'/alone',query:{type,sid}})
        }else if(res.data.data.exam.show_type==2){
          this.$router.push({path:'/all',query:{type,sid}})
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.home{
  .img1{
    display: block;
    width: 1.66rem;
    margin:auto;
    margin-top:.5rem;
  }
  .img2{
    display: block;
    width: 3.2rem;
    margin:auto;
    margin-top:.6rem;
    margin-bottom: .7rem;
  }
  .start{
    display: block;
    margin:auto;
    background: #FFFFFF;
    box-shadow: 0 .04rem .1rem 0 rgba(0,0,0,0.16);
    border-radius: .24rem;
    border:0;
    width: 2.5rem;
    height: 0.48rem;
    color:#7958FF;
    font-size:.16rem;
  }
}
</style>
