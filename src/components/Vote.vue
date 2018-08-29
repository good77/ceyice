<template>
    <div class="all">
        <div class='item'  v-for="(item,index,key) in res.vote" :key="key">
            <div class="choice" v-if="item.topic_title.bool_single==1||item.topic_title.bool_single==2">
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'>{{item.topic_title.title}}</span>
                </div>
                <ul class="content">
                    <li v-for="(option,key) in item.option" :key=key>
                        <span class='contenttext'>A. {{option.res_option}}<span class='ratio'>{{(option.result_select_num*100/option.result_all_num).toFixed(0)}}% {{option.result_select_num}}人</span></span>
                        <div class="progress">
                            <div class="progressInner" :style="'width:'+(option.result_select_num*100/option.result_all_num).toFixed(0)+'%'">

                            </div>
                        </div>
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
                hahaha:60,
                res:JSON.parse(window.localStorage.getItem('res'))
            }
        },
        mounted(){
            console.log(this.res)
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

