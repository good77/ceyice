<template>
    <div class="result">
        <div class="sharebox" v-show="show"  @click='close'>
          <img src="../assets/img/share.png" alt="">
        </div>
        <div class="time">
            <img src="../assets/img/icon_time@2x.png" alt=""><span class='timetext'>用时{{min}}'{{sec}}''</span>
        </div>
        <div class="point">
            <span class='pointtext'>{{Math.round(res.score)}}</span>
            <div class="point2">
                
            </div>
            <div class="point3">
                    
            </div>
        </div>
        <div class="lastchild">
            <img :src="res.levelContent" alt="">
        </div>
        <div class="share" @click="share">
            分享给好友
        </div>
        <copy-right />
    </div>
</template>
<script>
import CopyRight from "@/components/Copyright";
export default {
  components: {
    CopyRight
  },
  data() {
    return {
      min: parseInt(window.localStorage.getItem("time") / 60),
      sec: window.localStorage.getItem("time") % 60,
      show:false
    };
  },
  computed: {
    res() {
      return this.$store.state.res;
    }
  },
  methods: {
      share(){
        this.show = true
      },
      close(){
        this.show = false
      }
  },
  created() {
   
  }
};
</script>
<style lang="less" scoped>
.result {
  position: relative;
  .sharebox{
    position:fixed;
    z-index: 999999999999999999999999;
    top:0;
    right:0;
    width:100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.3);
    img{
      width:100%;
      height: 100%;
    }
  }
  .lastchild {
    text-align: center;
    width: 2.95rem;
    background-color: #fff;
    border-radius: 0.08rem;
    box-shadow: 0 0.02rem 0.06rem 0 rgba(0, 0, 0, 0.16);
    padding: 0.1rem;
    box-sizing: border-box;
    margin: auto;
    margin-top: 0.8rem;
    overflow: hidden;
    img{
      width:100%;
    }
  }
  background: url("../assets/img/bg_bl@2x.png") no-repeat;
  background-position: bottom left;
  background-size: 100%;
  min-height: calc(100vh - .92rem);
  padding-bottom:.92rem;
  .time {
    margin: auto;
    padding-top: 0.6rem;
    width: 1.3rem;
    height: 0.2rem;
    line-height: 0.2rem;
    margin-bottom: 0.2rem;
    img {
      width: 0.17rem;
      vertical-align: middle;
    }
    .timetext {
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      font-size: 0.16rem;
      margin-left: 0.06rem;
      line-height: 0.16rem;
      letter-spacing: 0.02rem;
    }
  }
  .point {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    margin: auto;
    margin-top: 0.82rem;
    position: relative;
    font-size: 0.6rem;
    line-height: 1.4rem;
    text-align: center;
    background-color: #fff;
    .pointtext {
      display: block;
      background-image: linear-gradient(90deg, #7958ff, #5894ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .point2 {
      position: absolute;
      width: 1.92rem;
      height: 1.92rem;
      border-radius: 50%;
      background-color: #fff;
      opacity: 0.3;
      top: -0.26rem;
      left: -0.26rem;
    }
    .point3 {
      position: absolute;
      width: 2.44rem;
      height: 2.44rem;
      border-radius: 50%;
      background-color: #fff;
      opacity: 0.15;
      top: -0.52rem;
      left: -0.52rem;
    }
  }
  .share {
    width: 1rem;
    height: 0.4rem;
    border-radius: 0.4rem;
    border: 1px solid #fff;
    line-height: 0.4rem;
    text-align: center;
    color: #fff;
    margin: auto;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
  }
}
</style>

