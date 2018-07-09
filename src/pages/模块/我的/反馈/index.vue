<template>
    <div class="reply">
        <textarea class="reply-content"
                  placeholder="请填写你遇到的问题或者给我们的建议"
                  placeholder-style="color: #9DACBF;"></textarea>
        <input type="text"
               placeholder="手机号/邮箱"
               placeholder-style="color: #9DACBF;">
        <div class="submit">
            提交
        </div>
    </div>

</template>

<script>
export default {
    components: {},

    data() {
        return {};
    },

    created() {}
};
</script>

<style scoped lang="scss">
.reply {
    min-height: 100vh;
    width: 100%;
    .reply-content {
        // width: 100%;
        width: 324px;
        background: #f2f6fa;
        border: 1px solid #e7eef2;
        border-radius: 4px;
        margin: 20px auto;
        font-size: 14px;
        padding: 14px;
    }
    input {
        background: #f2f6fa;
        border: 1px solid #e7eef2;
        border-radius: 4px;
        font-size: 14px;
        margin: 0 10px;
        padding: 10px 14px;
    }
    .submit {
        background: #2976fe;
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        height: 44px;
        line-height: 44px;
        // margin: 0 20px;
        left:20px;
        right: 20px;
        position: absolute;
        bottom: 40px;
    }
}
</style>
