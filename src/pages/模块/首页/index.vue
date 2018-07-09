<template>
    <div class="index">
        <div class="index-header">
            <span class="title">冒泡</span>
        </div>
        <div class="index-content">
            <subscribe-item-card :showType=3    
                                 :commodity="item"
                                 v-for="item in commmodityList"
                                 :key="item.name">
            </subscribe-item-card>
        </div>
    </div>
</template>

<script>
import subscribeItemCard from "@/components/subscribe-item-card";
export default {
    components: {
        subscribeItemCard
    },

    data() {
        return {
            commmodityList: [
                {
                    name: "LED调节式金属组合桌灯",
                    comment: 20,
                    // 1:taobao  2:jingdong
                    from: 1,
                    price: 180,
                    former: 380,
                    //0平稳  1降价   -1 升价
                    status: 1,
                    img: "/static/assets/image/commodity-1.png"
                },
                {
                    name: "LED调节式金属组合桌灯",
                    comment: 10,
                    from: 2,
                    price: 180,
                    former: 180,
                    status: 0,
                    img: "/static/assets/image/commodity-2.png"
                },
                {
                    name: "LED调节式金属组合桌灯",
                    comment: 0,
                    from: 1,
                    price: 380,
                    former: 180,
                    status: -1,
                    img: "/static/assets/image/commodity-1.png"
                }
            ]
        };
    },

    created() {}
};
</script>

<style scoped lang="scss">
.index {
    min-height: 100vh;
    background: #f2f6fa;
    .index-header {
        height: 50px;
        background: #ffffff;
        padding-left: 20px;
        .title {
            font-size: 22px;
            color: #333333;
            font-weight: 500;
        }
    }
    .index-content{
        padding: 0 10px;
    }
}
</style>
