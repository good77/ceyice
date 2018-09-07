<template>
    <div class="result">
        <div class="time">
            <img src="../assets/img/icon_time@2x.png" alt=""><span class='timetext'>用时{{min}}'{{sec}}''</span>
        </div>
        <div class="point">
            <span class='pointtext'>{{point}}</span>
            <div class="point2">
                
            </div>
            <div class="point3">
                    
            </div>
        </div>
        <div class="share">
            分享给好友
        </div>
        <copy-right />
    </div>
</template>
<script>
import CopyRight from '@/components/Copyright'
    export default{
        components:{
            CopyRight
        },
        data(){
            return {
                min:parseInt(window.localStorage.getItem('time')/60),
                sec:window.localStorage.getItem('time')%60,
                point:0,
            }
        },
        computed:{
            res(){
                return this.$store.state.res
            }
        },
        mounted(){
            this.$store.dispatch('clearRes')
            var timer2 = setInterval(()=>{
                if(this.res.score){
                    if(this.point<this.res.score){
                        console.log(this.point+'小于'+this.res.score)
                        this.point ++;
                    }else{
                        window.clearInterval(timer2);
                    }
                }
            },5)
        }
    }
</script>
<style lang="less" scoped>
.result{
    background: url('../assets/img/bg_bl@2x.png') no-repeat;
    background-position:bottom left;
    background-size:100%;
    height: 100vh;
    box-sizing: border-box;
    .time{
        margin:auto;
        padding-top:.6rem;
        width: 1.3rem; 
        height: 0.2rem;
        line-height: .2rem;
        img{
            width: 0.17rem;
            vertical-align: middle
        }
        .timetext{
            display: inline-block;
            vertical-align: middle;
            color:#fff;
            font-size:.16rem;
            margin-left:.06rem;
            line-height:.16rem; 
            letter-spacing: .02rem;
        }
    }
    .point{
        width: 1.4rem;
        height: 1.4rem;
        border-radius:50%;
        margin:auto;
        margin-top:.82rem;
        position:relative;
        font-size:.6rem;
        line-height: 1.4rem;
        text-align: center;
        background-color: #fff;
        .pointtext{
            display: block;
            background-image: linear-gradient(90deg, #7958FF, #5894FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .point2{
            position: absolute;
            width: 1.92rem;
            height: 1.92rem;
            border-radius:50%;
            background-color: #fff;
            opacity: .3;
            top:-.26rem;
            left:-.26rem;
        }
        .point3{
            position:absolute;
            width: 2.44rem;
            height: 2.44rem;
            border-radius:50%;
            background-color: #fff;
            opacity: .15;
            top:-.52rem;
            left:-.52rem;
        }
    }
    .share{
        width: 1rem;
        height: 0.4rem;
        border-radius:.4rem;
        border:1px solid #fff;
        line-height: .4rem;
        text-align: center;
        color:#fff;
        margin:auto;
        margin-top:1.4rem;
    }
}
</style>

