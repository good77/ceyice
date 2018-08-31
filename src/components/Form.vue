<template>
    <div class="content">
        <div v-html='res.formContent'>

        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                res:window.localStorage.getItem('res')
            }
        }
    }
</script>
<style lang="less" scoped>
.cotent{
    padding:.3rem;
}
</style>

