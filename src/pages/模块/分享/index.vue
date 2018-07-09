<template>
    <div class="share">
        <div class="share-content">
            <img src="/static/assets/image/icon-decorate.png"
                 class="decorate">
            <img src="/static/assets/image/icon-qr-code.png"
                 class="qr-code">
            <span class="title">冒泡小助手</span>
            <img src="/static/assets/image/image-price-chart.png"
                 class="price-chart">
            <div class="goods">
                <img :src="item.img">
                <div class="block">
                    <span class="name">{{item.name}}</span>
                    <span class="price">¥{{item.price}}</span>
                </div>
            </div>
        </div>
        <div class="share-button">
            <span class="save-img">保存图片</span>
            <span class="send-friend">发给好友</span>

        </div>
    </div>

</template>

<script>
export default {
    components: {},

    data() {
        return {
            item: {
                name: "LED调节式金属组合桌灯",
                comment: 10,
                from: 1,
                price: 180,
                former: 180,
                status: 0,
                change: 0,
                img: "/static/assets/image/commodity-2.png"
            }
        };
    },

    created() {}
};
</script>

<style scoped lang="scss">
.share {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: #f2f6fa;
    .share-content {
        width: 315px;
        // height: 320px;
        height: 420px;
        background: #ffffff;
        margin: 30px auto 0;
        position: relative;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .decorate {
            position: absolute;
            width: 55px;
            height: 53px;
            right: 0;
            top: 0;
        }
        .qr-code {
            padding-top: 30px;
            width: 88px;
            height: 86px;
        }
        .title {
            font-size: 16px;
            color: #333333;
            margin-top: 20px;
        }
        .price-chart {
            margin-top: 44px;
            width: 287px;
            height: 75px;
        }
        .goods {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: #fafbfc;
            display: flex;
            box-sizing: border-box;
            padding: 20px;
            img {
                width: 60px;
                height: 60px;
            }
            .block {
                margin-left: 14px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .name {
                    font-size: 14px;
                    color: #333333;
                }
                .price {
                    font-size: 20px;
                    color: #ff6b63;
                }
            }
        }
    }
    .share-button {
        display: flex;
        margin-top: 69px;
        justify-content: space-between;
        margin-left: 25px;
        margin-right: 25px;
        span {
            border: 1px solid #2976fe;
            border-radius: 4px;
            font-size: 14px;
            padding: 12px 47px;
            &.save-img {
                color: #2976fe;
                background: #f2f6fa;
            }
            &.send-friend {
                background: #2976fe;
                color: #ffffff;
            }
        }
    }
}
</style>
