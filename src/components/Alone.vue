<template>
    <div class="alone">
        <div class="header">
            <img src="../assets/img/logo@2x.png" alt="" class='logo'>
            <span class='num'>
                {{flag+1}}/{{item.length}}
            </span>
        </div>
        <div class='item' v-for="(item,index,key) in item" :key=key v-show="index==flag">
            <div class="bgbox1"></div>
            <div class="bgbox2"></div>
            <div class="choice" v-if='item.topic_title.bool_single==1'>
                <div class="title">
                     <span class='titletext'>{{index+1}}.{{item.topic_title.title}}</span>
                </div>
                <ul class="content">
                    <li v-for="(option,index1,key) in item.option" :key=key >
                        <input :id="'radio'+index+index1" :name="'radio'+index" type="radio" @click='choice(option.tid,index1+1,item.topic_title.bool_single)' class="demo--radio" :checked="option.bool_defalse==1" /> 
                        <label :for="'radio'+index+index1" class='contenttext demo--label'>{{option.res_option}}</label>
                    </li>
                </ul>
            </div>
             <div class="choices" v-if='item.topic_title.bool_single==2'>
                <div class="title">
                     <span class='titletext'>{{index+1}}.{{item.topic_title.title}}</span>
                </div>
                <ul class="content">
                    <li v-for="(option,index1,key) in item.option" :key=key>
                        <input :id="'radio'+index+index1" :checked="option.bool_defalse==1"   :name="'radio'+index" type="checkbox" @click='choices(option.tid,index1+1,item.topic_title.bool_single)' class="demo--radio1"/> 
                        <label :for="'radio'+index+index1"  class='contenttext demo--label1'>{{option.res_option}}</label>
                    </li>
                </ul>
            </div>
            <div class="fill" v-if='item.topic_title.bool_single==3'>
                <div class="title">
                    <span class='titletext'>{{index+1}}.{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="text" class="ipttext"  @blur="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]'  placeholder="请在此输入.." >
                </div>
            </div>
            <div class="fills"  v-if='item.topic_title.bool_single==4'>
                <div class="title">
                   <span class='titletext'>{{index+1}}.{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <textarea type="text" class="ipttext"  @blur="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]'  placeholder="请在此输入.." />
                </div>
            </div>
            <div class="phone"  v-if='item.topic_title.bool_single==5'>
                <div class="title">
                    <span class='titletext'>{{index+1}}.{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="number" minlength='11' maxlength="11" class="ipttext" @blur='phone(item.topic_title.tid,index,item.topic_title.bool_single)' v-model='ipttext[index]' placeholder="请在此输入.." />
                </div>
                <div class="checkcode" v-if="item.topic_title.bool_check">
                    <input type="number" class="codeipt" placeholder="请在此输入.." v-model="checkcode"/><button class='codebtn' @click='getcode' :disabled="disabled">{{codebtn}}</button>
                </div>
            </div>
            <div class="email"  v-if='item.topic_title.bool_single==6'>
                <div class="title">
                     <span class='titletext'>{{index+1}}.{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="email" class="ipttext" @blur="email(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]' placeholder="请在此输入.." />
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="pre btn" @click='pre' :class='{disabled:this.flag==0}'>
                <img src="../assets/img/icon_up@2x.png" alt="">
                <span>上一题</span>
            </div>
            <div class="send btn" @click='send'>
                 <img src="../assets/img/icon_hand@2x.png" alt="">
                <span>交卷</span>
            </div>
            <div class="next btn" @click='next' :class='{disabled:this.flag==this.item.length-1}'>
                <img src="../assets/img/icon_next@2x.png" alt="">
                <span>下一题</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {    
                timer:'',
                time:0,
                item:'',
                sid:'',
                answer:[],
                ipttext:[],
                flag:0,
                checkcode:'',
                codebtn:'获取验证码',
                disabled:false,
                second:0,
                tel:''
            }
        },
        methods:{
             getcode(){
                if(this.tel){
                    this.second=60
                    var timer = window.setInterval(()=>{
                        if(this.second>0){
                            this.second--
                            this.codebtn=this.second+'秒后重试';
                            this.disabled=true
                        }else{
                            this.codebtn="获取验证码";
                            window.clearInterval(timer);
                            this.disabled=false
                        }
                    },1000)
                    this.$axios({
                        method:'get',
                        url:'http://exam.weilang.top/Dxadmin/Api/checkPhone',
                        params:{
                            phoneNum:this.tel,
                            countryCode:86,
                            sid:this.sid,
                            sType:this.$route.query.type
                        }
                    }).then(res=>{
                        console.log(res)
                    })
                }else{
                    alert("您还没有输入手机号")
                }
            },
            next(){
                if(this.flag<this.item.length-1){
                    this.flag++;
                }
            },
            pre(){
                if(this.flag>0){
                    this.flag--;
                }
            },
            send(){
                var flag=1;
                for(var i in this.item){
                    if(this.item[i].topic_title.bool_topic==1){
                        if(this.answer.length<1){
                            flag=0;
                            alert('题目还没答完呢');
                            break;
                        }
                        var sum =0;
                        for(var j in this.answer){
                            if(this.answer[j].tid!=this.item[i].topic_title.tid){
                                sum++;
                                console.log(sum)
                            }
                        }
                        if(sum==this.answer.length){
                            flag=0;
                            alert('题目还没答完呢');
                            break;
                        }
                    }
                }
                if(flag==1){
                    var data = {
                        sid:this.sid,
                        answer:this.answer,
                        code:this.checkcode
                    }
                    console.log(data) 
                    window.clearInterval(this.timer)               
                    this.$axios({
                        methods:'get',
                        url:'http://exam.weilang.top/Dxadmin/Api/ansQuestion',
                        params:data,
                    }).then(res=>{
                        console.log(res.data)
                        this.$store.dispatch('getRes',res.data)
                    })
                    var type = this.$route.query.type 
                    if(type==1){
                        this.$router.push('/form')
                    }else if(type==2){
                        window.localStorage.setItem('time',this.time)
                        this.$router.push('/result')
                    }else if(type==3){
                        this.$router.push('/vote')
                    }
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
            },
            email(tid,index,type){
               var myreg=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
                    if (myreg.test(this.ipttext[index])) {
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
                    }else{
                        alert('请输入正确的邮箱')
                    }
            },
            phone(tid,index,type){
                    this.tel=this.ipttext[index];
                    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                    if (myreg.test(this.ipttext[index])) {
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
                    }else{
                        alert('请输入正确的手机号')
                    }
            }
        },
        mounted(){
            this.sid = this.$route.query.sid;
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
                for(var i=0; i<this.item.length;i++){
                    if(this.item[i].topic_title.bool_single==1){
                        for(var j = 0 ; j < this.item[i].option.length; j++){
                            if(this.item[i].option[j].bool_defalse==1){
                                var item = {
                                    type:this.item[i].topic_title.bool_single,
                                    tid:this.item[i].option[j].tid,
                                    num:j+1
                                }
                                this.answer.push(item);
                                break;
                            }
                        }
                    }else if(this.item[i].topic_title.bool_single==2){
                        var num = []
                         for(var j = 0 ; j < this.item[i].option.length; j++){
                            if(this.item[i].option[j].bool_defalse==1){
                                num.push(j+1)
                            }
                            console.log(num)
                            var item = {
                                type:this.item[i].topic_title.bool_single,
                                tid:this.item[i].option[j].tid,
                                num
                            }
                        }
                        this.answer.push(item)
                    }
                }
                console.log(this.answer)
            })
        }
    }
</script>
<style lang="less" scoped>
.disabled{
    opacity: .3;
}
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
.demo--radio:checked+label{
    color:#9075FF;
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
.demo--radio1:checked+label{
    color:#9075FF;
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
    width: 2.95rem;
}
textarea{
    height: 1.37rem;
    width: 2.95rem;
}
.alone{
    .header{
        position: fixed;
        top:0;
        z-index: 999;
        background:  linear-gradient(90deg, #9075FF, #5496FF);
        height: 0.58rem;
        padding:.14rem;
        box-sizing: border-box;
        width: 100%;
        line-height: .58rem;
        display: flex;
        justify-content: space-between;
        span{
            display: inline-block;
            vertical-align: middle;
        }
        .logo{
            height: 0.3rem;
            display: inline-block;
            vertical-align: middle;
        }
        .num{
            text-align: center;
            width: 0.58rem;
            height: 0.24rem;
            line-height: .24rem;
            background: rgba(255, 255, 255, .15);
            border-radius: .12rem;
            font-size:.14rem;
            color:#fff;
            margin-top:.02rem;
        }
    }
    .item{
        .bgbox1{
            opacity: 0.3;
            background: #FFFFFF;
            border-radius: .08rem;
            position:absolute;
            width: 2.75rem;
            height: 0.268rem;
            top:-.1rem;
            left:.2rem;
        }
        .bgbox2{
            opacity: 0.3;
            background: #FFFFFF;
            border-radius: .08rem;
            position:absolute;
            width: 2.55rem;
            height: 0.268rem;
            top:-.2rem;
            left:.3rem;
        }
        width: 3.15rem;
        margin:auto;
        background: #FFFFFF;
        box-shadow: 0 .04rem .12rem 0 rgba(0,0,0,0.16);
        border-radius: .08rem;
        position:relative;
        margin:auto;
        margin-top:1.1rem;
        background-color: #fff;
        border-radius:.08rem;
        box-shadow: 0 .02rem .06rem 0 rgba(0,0,0,0.16);
        .title{
            line-height: .24rem;
            background-size: .32rem .22rem;
            border-bottom:1px solid #F0ECFF;
            padding:.20rem .24rem;
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
         .checkcode{
            padding:.1rem .1rem;
            .codeipt{
                width: 1.97rem;
            }
            .codebtn{
                margin-left:.1rem;
                font-size: 12px;
                color: #7958FF;
                letter-spacing: 0;
                text-align: center;
                width: 0.8rem;
                height: 0.38rem;
                opacity: 0.8;
                background: #FFFFFF;
                border: 1px solid #7958FF;
                border-radius: 4px;
            }
        }
    }
    .footer{
        position: fixed;
        z-index: 999;
        background:  linear-gradient(90deg, #9075FF, #5496FF);
        bottom:0;
        height: 1.15rem;
        width: 100%;
        padding: 0 .5rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .btn{
            width: 0.56rem;
            font-size:.14rem;
            text-align: center;
            color:#fff;
            img{
                display: block;
                width: 100%;
            }
        }
    }
}
</style>
