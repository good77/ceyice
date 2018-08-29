<template>
    <div class="all">
        <div class='item'>
            <div class="choice">
                <div class="title">
                    <span class='num'>1</span><span class='titletext'>这里是单选题的标题</span>
                </div>
                <ul class="content">
                    <li>
                        <span class='contenttext'>A. 这里是选项1<span class='ratio'>60% 1004人</span></span>
                        <div class="progress">
                            <div class="progressInner" :style="'width:'+hahaha+'%'">

                            </div>
                        </div>
                    </li>
                    <li>
                        <span class='contenttext'>B. 这里是选项2</span>
                        <div class="progress"></div>
                    </li>
                    <li>
                        <span class='contenttext'>C. 这里是选项3</span>
                        <div class="progress"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                hahaha:60
            }
        }
    }
</script>
<style lang="less" scoped>
.all{
    margin-bottom:.8rem;
    .item{
        width: 3.55rem;
        margin:auto;
        margin-top:.16rem;
        background-color: #fff;
        border-radius:.08rem;
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,0.16);
        .title{
            height: 0.42rem;
            line-height: .42rem;
            background:url('../assets/img/bg_number@2x.png') no-repeat 0 .1rem;
            background-size: .32rem .22rem;
            border-bottom:1px solid #F0ECFF;
            .num{
                display: inline-block;
                color:#fff;
                text-indent: .13rem;
                margin-right:.2rem;
            }
            .titletext{
                font-size:.16rem;
                font-weight: 600;
                letter-spacing: 0;
            }
        }
        .content{
            padding:.1rem .2rem;
            li{
                height: 0.4rem;
                line-height: .4rem;
                margin-bottom: .2rem;
                .contenttext{
                    display: inline-block;
                    vertical-align: middle;
                    font-size:.15rem;
                    height: 0.2rem;
                    line-height: .2rem;
                    width: 3.15rem;
                    .ratio{
                        display: inline-block;
                        float: right;
                        font-size:.1rem;
                    }
                }
                .progress{
                    width: 3.15rem;
                    height: 0.08rem;
                    border-radius:.08rem;
                    background-color: #f1f1f1;
                    overflow: hidden;
                    .progressInner{
                        height: 0.08rem;
                        background:  linear-gradient(90deg, #9075FF, #5496FF);
                        border-radius:.08rem;
                    }
                }
            }
        }
    }
    .send{
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.16);
        border-radius: 8px;
        width: 3.55rem;
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

