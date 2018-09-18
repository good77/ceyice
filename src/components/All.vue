<template>
    <div class="all">
        <div class='item' v-for="(item,index,key) in item" :key=key>
            <div class="choice" v-if='item.topic_title.bool_single==1'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'><span v-if='item.topic_title.bool_topic==1' style='color:#f00'>*</span>{{item.topic_title.title}}</span>
                </div>
                <ul class="content">
                    <li v-for="(option,index1,key) in item.option" :key=key >
                        <input :id="'radio'+index+index1"   :checked="option.bool_defalse==1" :name="'radio'+index" type="radio" @click='choice(option.tid,index1+1,item.topic_title.bool_single,index,index1)' class="demo--radio"/> 
                        <label :for="'radio'+index+index1"  class='contenttext demo--label'>{{option.res_option}}</label>
                    </li>
                </ul>
            </div>
             <div class="choices" v-if='item.topic_title.bool_single==2'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'><span v-if='item.topic_title.bool_topic==1' style='color:#f00'>*</span>{{item.topic_title.title}}</span>
                </div>
                <ul class="content">
                    <li v-for="(option,index1,key) in item.option" :key=key>
                        <input :id="'radio'+index+index1" :checked="option.bool_defalse==1"  :name="'radio'+index" type="checkbox" @click='choices(option.tid,index1+1,item.topic_title.bool_single,index,index1)' class="demo--radio1"/> 
                        <label :for="'radio'+index+index1"  class='contenttext demo--label1' >{{option.res_option}}</label>
                    </li>
                </ul>
            </div>
            <div class="fill" v-if='item.topic_title.bool_single==3&&item.topic_title.bool_number==0'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'><span v-if='item.topic_title.bool_topic==1' style='color:#f00'>*</span>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="text" class="ipttext"  @change="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]'  placeholder="请在此输入.." >
                </div>
            </div>
            <div class="fill" v-if='item.topic_title.bool_single==3&&item.topic_title.bool_number==1'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'><span v-if='item.topic_title.bool_topic==1' style='color:#f00'>*</span>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="number" class="ipttext"  @change="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]'  :placeholder="'请输入'+item.topic_title.min_value+'到'+item.topic_title.max_value +'之间的数字'" >
                </div>
            </div>
            <div class="fills"  v-if='item.topic_title.bool_single==4'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'><span v-if='item.topic_title.bool_topic==1' style='color:#f00'>*</span>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <textarea type="text" class="ipttext"  @change="text(item.topic_title.tid,index,item.topic_title.bool_single)"  v-model='ipttext[index]'  placeholder="请在此输入.." />
                </div>
            </div>
            <div class="phone"  v-if='item.topic_title.bool_single==5'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'><span v-if='item.topic_title.bool_topic==1' style='color:#f00'>*</span>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="number" minlength='11' maxlength="11" class="ipttext" @change='phone(item.topic_title.tid,item.topic_title.bool_single)' v-model='tel' placeholder="请在此输入.." />
                </div>
                <div class="checkcode" v-if="item.topic_title.bool_check==1">
                    <input type="number" class="codeipt" placeholder="请在此输入.." v-model="checkcode"/><button class='codebtn' @click='getcode' :disabled="disabled">{{codebtn}}</button>
                </div>
            </div>
            <div class="email"  v-if='item.topic_title.bool_single==6'>
                <div class="title">
                    <span class='num'>{{index+1}}</span><span class='titletext'><span v-if='item.topic_title.bool_topic==1' style='color:#f00'>*</span>{{item.topic_title.title}}</span>
                </div>
                <div class="content">
                    <input type="email" class="ipttext" @change="e_mail(item.topic_title.tid,item.topic_title.bool_single)"  v-model='email' placeholder="请在此输入.." />
                </div>
            </div>
             <div class="form" style="padding:.2rem" v-if='item.topic_title.bool_single==7'  v-html="item.topic_title.content">
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
                checkcode:'',
                codebtn:'获取验证码',
                disabled:false,
                second:0,
                tel:'',
                email:'',
                boolCheck:0,
                hasCheck:1,
                defaultOption:[]
            }
        },
        components:{
            CopyRight
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
                        if(res.data.status==-1){
                            alert(res.data.message)
                        }
                    })
                }
                else{
                    alert("您还没有输入手机号")
                }
            },
             send(){
                 if(this.hasCheck==1){
                      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                    var myreg1=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
                    if(this.tel.length>0){
                        if(myreg.test(this.tel)){
                            if(this.email.length>0){
                                if(myreg1.test(this.email)){
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
                                            code:this.checkcode,
                                            phone:this.tel,
                                            boolCheck:this.boolCheck
                                        }
                                        console.log(data) 
                                        window.clearInterval(this.timer)               
                                        this.$axios({
                                            methods:'get',
                                            url:'http://exam.weilang.top/Dxadmin/Api/ansQuestion',
                                            params:data,
                                        }).then(res=>{
                                            console.log(res.data)
                                            if(res.data.message){
                                                alert(res.data.message)
                                            }else{
                                                this.$store.dispatch('getRes',res.data)
                                                var type = this.$route.query.type 
                                            if(type==1){
                                                    this.$router.push({path:'/form',query:{sid:this.sid}})
                                                }else if(type==2){
                                                    window.localStorage.setItem('time',this.time)
                                                    this.$router.push({path:'/result',query:{sid:this.sid}})
                                                }else if(type==3){
                                                    this.$router.push({path:'/vote',query:{sid:this.sid}})
                                                }
                                            }
                                        })
                                    
                                    }
                                }else{
                                    this.email="";
                                    alert("请输入正确的邮箱")
                                }
                            }else{
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
                                        code:this.checkcode,
                                        phone:this.tel,
                                            boolCheck:this.boolCheck
                                    }
                                    console.log(data) 
                                    window.clearInterval(this.timer)               
                                    this.$axios({
                                        methods:'get',
                                        url:'http://exam.weilang.top/Dxadmin/Api/ansQuestion',
                                        params:data,
                                    }).then(res=>{
                                        console.log(res.data)
                                        if(res.data.message){
                                            alert(res.data.message)
                                        }else{
                                            this.$store.dispatch('getRes',res.data)
                                            var type = this.$route.query.type 
                                        if(type==1){
                                                    this.$router.push({path:'/form',query:{sid:this.sid}})
                                                }else if(type==2){
                                                    window.localStorage.setItem('time',this.time)
                                                    this.$router.push({path:'/result',query:{sid:this.sid}})
                                                }else if(type==3){
                                                    this.$router.push({path:'/vote',query:{sid:this.sid}})
                                                }
                                        }
                                    })
                                
                                }
                            }
                        }else{
                            this.tel='';
                            alert("请输入正确的手机号")
                        }
                    }else{
                        if(this.email.length>0){
                                if(myreg1.test(this.email)){
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
                                            code:this.checkcode,
                                            phone:this.tel,
                                                boolCheck:this.boolCheck
                                        }
                                        console.log(data) 
                                        window.clearInterval(this.timer)               
                                        this.$axios({
                                            methods:'get',
                                            url:'http://exam.weilang.top/Dxadmin/Api/ansQuestion',
                                            params:data,
                                        }).then(res=>{
                                            console.log(res.data)
                                            if(res.data.message){
                                                alert(res.data.message)
                                            }else{
                                                this.$store.dispatch('getRes',res.data)
                                                var type = this.$route.query.type 
                                            if(type==1){
                                                            this.$router.push({path:'/form',query:{sid:this.sid}})
                                                        }else if(type==2){
                                                            window.localStorage.setItem('time',this.time)
                                                            this.$router.push({path:'/result',query:{sid:this.sid}})
                                                        }else if(type==3){
                                                            this.$router.push({path:'/vote',query:{sid:this.sid}})
                                                        }
                                            }
                                        })
                                    
                                    }
                                }else{
                                    this.email = "";
                                    alert("请输入正确的邮箱")
                                }
                        }else{
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
                                    code:this.checkcode,
                                    phone:this.tel,
                                    boolCheck:this.boolCheck
                                }
                                console.log(data) 
                                window.clearInterval(this.timer)               
                                this.$axios({
                                    methods:'get',
                                    url:'http://exam.weilang.top/Dxadmin/Api/ansQuestion',
                                    params:data,
                                }).then(res=>{
                                    console.log(res.data)
                                    if(res.data.message){
                                        alert(res.data.message)
                                    }else{
                                        this.$store.dispatch('getRes',res.data)
                                        var type = this.$route.query.type 
                                    if(type==1){
                                                    this.$router.push({path:'/form',query:{sid:this.sid}})
                                                }else if(type==2){
                                                    window.localStorage.setItem('time',this.time)
                                                    this.$router.push({path:'/result',query:{sid:this.sid}})
                                                }else if(type==3){
                                                    this.$router.push({path:'/vote',query:{sid:this.sid}})
                                                }
                                    }
                                })
                            
                            }
                        }
                    }
                 }
            },
            choice(tid,num,type,index,index1){
                var flag=1;
                var item = {
                    tid,
                    type,
                    num
                }
                for(var i in this.item[index].option){
                    if(index1==i){
                        this.item[index].option[i].bool_defalse=1;
                    }else{
                        this.item[index].option[i].bool_defalse=0;  
                    }
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
            choices(tid,num,type,index,index1){
                var flag=1;
                var flagg=1;
                var item = {
                    tid:tid,
                    type:type,
                    num:[]
                }
                if(this.item[index].option[index1].bool_defalse==0){
                    this.item[index].option[index1].bool_defalse=1;
                }else{
                    this.item[index].option[index1].bool_defalse=0;  
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
                if(this.ipttext[index].length>0){
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
                }
            },
            e_mail(tid,type){
               var myreg=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
                    if (myreg.test(this.email)) {
                        this.hasCheck=1
                        var flag=1
                        var item = {
                            tid:tid,
                            type:type,
                            num:this.email
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
                        this.hasCheck=0
                        alert('请输入正确的邮箱')
                    }
            },
            phone(tid,type){
                    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                    if (myreg.test(this.tel)) {
                        this.hasCheck=1
                        var flag=1
                        var item = {
                            tid:tid,
                            type:type,
                            num:this.tel
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
                        this.hasCheck=0
                        alert('请输入正确的手机号')
                    }
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
                        var num = [];
                        var hasDefault = 0
                         for(var j = 0 ; j < this.item[i].option.length; j++){
                            if(this.item[i].option[j].bool_defalse==1){
                                num.push(j+1)
                                hasDefault++;
                            }
                            console.log(num)
                            var item = {
                                type:this.item[i].topic_title.bool_single,
                                tid:this.item[i].option[j].tid,
                                num
                            }
                        }
                        if(hasDefault>0){
                            this.answer.push(item)
                        }
                    }else if(this.item[i].topic_title.bool_single==3){
                            if(this.item[i].topic_title.defalse_value){
                                this.ipttext[i]=this.item[i].topic_title.defalse_value;
                                var item = {
                                    type:this.item[i].topic_title.bool_single,
                                    tid:this.item[i].topic_title.tid,
                                    num:this.item[i].topic_title.defalse_value
                                }
                                this.answer.push(item)
                            }
                    }else if(this.item[i].topic_title.bool_single==5){
                            if(this.item[i].topic_title.bool_check==1){
                                this.boolCheck = 1
                            }
                    }
                }
                console.log(this.answer)
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
.demo--radio:checked+label{
    color:#7958FF;
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
    color:#7958FF;
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
        .form{
            margin-right:.2rem;
            overflow: hidden;
            img{
                width:3.35rem!important;
            }
        }
        .title{
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
        
         .checkcode{
            padding:.1rem .1rem;
            .codeipt{
                width: 2.37rem;
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

