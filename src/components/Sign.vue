<template>
    <div class="all">
        <div class='item'>
            <div class="title">
                公开课报名表
            </div>
            <div class="content">
                <p>姓名</p>
                <input type="text" placeholder="请输入姓名" v-model="name">
                <p>性别</p>
                <div class="sex">
                    <div class="male" :class='{noActive:sex==2}' @click='sex=1'>
                        男<img src="../assets/img/my_icon_man copy@2x.png" alt="">
                    </div>
                    <div class="female"  :class='{noActive:sex==1}'  @click='sex=2'>
                        女<img src="../assets/img/my_icon_woman@2x.png" alt="">
                    </div>
                </div>
                <p>手机号</p>
                <input type="text" placeholder="请输入手机号" v-model="phone">
            </div>
        </div>
        <div class="send">
            提交
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
                name:'',
                sex:1,
                phone:'',
            }
        }
    }
</script>
<style lang="less" scoped>
.noActive{
    opacity: .3;
}
input::placeholder{
    color:#bbb;
    text-align: center;
}
input{
    background-color: #f6f6f6;
    outline: none;
    border:0;
    font-size:.14rem;
    padding:.1rem;
    box-sizing: border-box;
    color:#333;
    text-align: center;
}
input{
    height: 0.4rem;
    width: 2.75rem;
    border-radius:.04rem;
}
.all{
    .item{
        width: 3.15rem;
        margin:auto;
        margin-top:.6rem;
        background-color: #fff;
        border-radius:.08rem;
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,0.16);
        text-align: center;
        .title{
            height: 0.56rem;
            line-height: .56rem;
            text-align: center;
            border-bottom:1px solid #eaf2ff;
            font-size:.18rem;
            font-weight: 500;
        }
        .content{
            padding:.2rem;
            p{
                line-height: .2rem;
                margin-top:.3rem;
                margin-bottom:.1rem;
                color:#999;
            }
            p:first-child{
                margin-top:0;
            }
            .sex{
                height: 0.4rem;
                width: 2.75rem;
                border-radius:.04rem;
                background-color: #f6f6f6;
                display: flex;
                justify-content: space-around;
                text-align: center;
                line-height: .4rem;
                img{
                    height: 0.15rem;
                    margin-left:.04rem;
                    vertical-align: middle;
                    margin-top:-.01rem;
                }
            }
        }
    }
    .send{
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.16);
        border-radius: 8px;
        width: 3.15rem;
        height: 0.48rem;
        line-height: .48rem;
        text-align: center;
        color:#7958FF;
        font-size:.16rem;
        margin:auto;
        margin-top:.3rem;
    }
}
</style>

