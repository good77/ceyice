<template>
    <div class="all">
        <div class='item' v-for="(item,index,key) in item" :key=key>
            <div class="choice" v-if='item.topic_title.bool_single==1'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'>{{item.topic_title.title}}</span>
                </div>
                <ul class="content">
                    <li v-for="(option,index1,key) in item.option" :key=key >
                        <input :id="'radio'+index+index1"  :name="'radio'+index" type="radio" @click='choice(option.tid,index1+1,item.topic_title.bool_single)' class="demo--radio"/> 
                        <label :for="'radio'+index+index1"  class='contenttext demo--label'>{{option.res_option}}</label>
                    </li>
                </ul>
            </div>
             <div class="choices" v-if='item.topic_title.bool_single==2'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'>{{item.topic_title.title}}</span>
                </div>
                <ul class="content">
                    <li v-for="(option,index1,key) in item.option" :key=key>
                        <input :id="'radio'+index+index1"  :name="'radio'+index" type="checkbox" @click='choices(option.tid,index1+1,item.topic_title.bool_single)' class="demo--radio1"/> 
                        <label :for="'radio'+index+index1"  class='contenttext demo--label1'>{{option.res_option}}</label>
                    </li>
                </ul>
            </div>
            <div class="fill" v-if='item.topic_title.bool_single==3'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="text" class="ipttext"  @blur="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]'  placeholder="请在此输入.." >
                </div>
            </div>
            <div class="fills"  v-if='item.topic_title.bool_single==4'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <textarea type="text" class="ipttext"  @blur="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]'  placeholder="请在此输入.." />
                </div>
            </div>
            <div class="phone"  v-if='item.topic_title.bool_single==5'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="number" minlength='11' maxlength="11" class="ipttext" @blur='text(item.topic_title.tid,index,item.topic_title.bool_single)' v-model='ipttext[index]' placeholder="请在此输入.." />
                </div>
            </div>
            <div class="email"  v-if='item.topic_title.bool_single==6'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="email" class="ipttext" @blur="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]' placeholder="请在此输入.." />
                </div>
            </div>
        </div>
        <div class="send" @click='send'>
            提交
        </div>
        <copy-right />
    </div>
</template>
<script>
import CopyRight from '@/components/Copyright'
    export default{
        data(){
            return {
                item:'',
                time:0,
                timer:'',
                sid:'',
                answer:[],
                ipttext:[],
            }
        },
        components:{
            CopyRight
        },
        methods:{
            send(){
                var data = {
                    sid:this.sid,
                    answer:this.answer
                }
                console.log(data)                
                this.$axios({
                    methods:'get',
                    url:'http://exam.weilang.top/Dxadmin/Api/ansQuestion',
                    params:data,
                }).then(res=>{
                    console.log(res.data)
                    window.localStorage.setItem('res',JSON.stringify(res.data));
                })
                var type = this.$route.query.type 
                if(type==1){
                    this.$router.push('/sign')
                }else if(type==2){
                    window.localStorage.setItem('time',this.time)
                    this.$router.push('/result')
                }else if(type==3){
                    this.$router.push('/vote')
                }
            },
            choice(tid,num,type){
                var flag=1
                var item = {
                    tid,
                    type,
                    num
                }
                for(var i in this.answer){
                    if(this.answer[i].tid==tid){
                        this.answer.splice(i,1,item);
                        flag=0;
                    }
                }
                if(flag==1){
                    this.answer.push(item);
                }
                console.log(this.answer)
            },
            choices(tid,num,type){
                var flag=1;
                var flagg=1;
                var item = {
                    tid:tid,
                    type:type,
                    num:[]
                }
                for(var i in this.answer){
                    if(this.answer[i].tid==tid){
                        for(var j in this.answer[i].num){                   
                            console.log(this.answer[i].num[j])
                            if(this.answer[i].num[j]==num){
                                this.answer[i].num.splice(j,1);
                                flagg=0;
                                break;
                            }
                        }
                        if(flagg==1){
                             this.answer[i].num.push(num);
                        }
                        flag=0;
                    }
                }
                if(flag==1){
                    item.num.push(num);
                    this.answer.push(item);
                }
                console.log(this.answer)
            },
            text(tid,index,type){
                 var flag=1
                var item = {
                    tid:tid,
                    type:type,
                    num:this.ipttext[index]
                }
                for(var i in this.answer){
                    if(this.answer[i].tid==tid){
                        this.answer.splice(i,1,item);
                        flag=0;
                    }
                }
                if(flag==1){
                    this.answer.push(item);
                }
                console.log(this.answer)
            }
        },
        mounted(){
            this.sid = this.$route.query.sid
            this.timer = setInterval(()=>{
                this.time++;
            },1000)
            var data = {
                sid : this.sid
            }
            this.$axios({
                method:'get',
                url:'http://exam.weilang.top/Dxadmin/Api/measurementAPI',
                params:data
            }).then(res=>{
                console.log(res.data.data.item)
                this.item = res.data.data.item
            })
        }
    }
</script>
<style lang="less" scoped>
.isActive{
    color:#9075FF!important;
}
.demo--radio{
    display:none
}
.demo--label{
    position:relative;
    padding-left:.3rem;
}
.demo--label:checked{
    color:#9075FF;
}
.demo--label:after{
    content: "";/*必须设置*/
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url('../assets/img/Oval_0@2x.png');
    background-size: 100% ;
    position: absolute;
    top: 0;
    left: 0;
}
.demo--radio:checked+label:after{
    background:url('../assets/img/Oval_1@2x.png');
    background-size: 100% ;
}
//
.demo--radio1{
    display:none
}
.demo--label1{
    position:relative;
    padding-left:.3rem;
}
.demo--label1:after{
    content: "";/*必须设置*/
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url('../assets/img/tick_0@2x.png');
    background-size: 100% ;
    position: absolute;
    top: 0;
    left: 0;
}
.demo--radio1:checked+label:after{
    background:url('../assets/img/tick_1@2x.png');
    background-size: 100% ;
}
//
input::placeholder,textarea::placeholder{
    color:#bbb;
}
input,textarea{
    background-color: #f6f6f6;
    outline: none;
    border:0;
    font-size:.14rem;
    padding:.1rem;
    box-sizing: border-box;
    color:#333;
    border-radius:.04rem;
}
input{
    height: 0.4rem;
    width: 3.35rem;
}
textarea{
    height: 1.37rem;
    width: 3.35rem;
    
}
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
            padding:.1rem .1rem;
            li{
                height: 0.4rem;
                line-height: .4rem;
                img{
                    width: 0.2rem;
                    vertical-align: middle;
                    margin-right:.1rem;
                }
                .contenttext{
                    display: inline-block;
                    vertical-align: middle;
                    font-size:.15rem;
                    height: 0.2rem;
                    line-height: .2rem;
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

