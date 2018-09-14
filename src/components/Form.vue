<template>
    <div class="content">
        <div v-html='res.formContent'>

        </div>
    </div>
</template>
<script>
    export default{
        computed:{
            res:function(){
                return this.$store.state.res
            }
        },
    }
</script>
<style lang="less" scoped>
.content{
    margin:.2rem;
    overflow: hidden!important;
    img{
        width:100%!important;
    }
}
</style>

