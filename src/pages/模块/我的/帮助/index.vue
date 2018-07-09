<template>
    <div class="help">
        <div class="help-tab">
            <span :class="{active:tabSelect==1}"
                  @click="changTab(1)">京东教程</span>
            <span :class="{active:tabSelect==2}"
                  @click="changTab(2)">淘宝教程</span>
            <span :class="{active:tabSelect==3}"
                  @click="changTab(3)">降价提醒</span>
        </div>
        <div class="help-content"
             v-if="tabSelect==1">
            <div class="operation">
                <span class="step">1</span>
                <span class="txt">打开京东APP的商品详情，点击分享，复制链接</span>
                <img class="help-1"
                     src="/static/assets/image/icon-help-jingdong-1.png">
                <img class="help-2"
                     src="/static/assets/image/icon-help-jingdong-2.png">
            </div>
            <div class="operation">
                <span class="step">2</span>
                <span class="txt">回到冒泡小助手，系统自动识别链接</span>
            </div>
        </div>
        <div class="help-content"
             v-if="tabSelect==2">
             <div class="operation">
                <span class="step">1</span>
                <span class="txt">打开淘宝APP的商品详情，点击分享，复制链接</span>
                <img class="help-3"
                     src="/static/assets/image/icon-help-taobao-1.png">
            </div>
            <div class="operation">
                <span class="step">2</span>
                <span class="txt">回到冒泡小助手，系统自动识别链接</span>
            </div>
        </div>
        <div class="help-content"
             v-if="tabSelect==3">
             <div class="operation">
                <span class="step">1</span>
                <span class="txt">粘贴商品链接，或者商品详情内,点击订阅</span>
                <img class="help-4"
                     src="/static/assets/image/icon-help-price-1.png">
                <img class="help-5"
                     src="/static/assets/image/icon-help-price-2.png">
            </div>
            <div class="operation">
                <span class="step">2</span>
                <span class="txt">订阅后，在“订阅”列表获取商品价格信息</span>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    components: {},

    data() {
        return {
            tabSelect: 1
        };
    },

    created() {},
    methods: {
        changTab(index) {
            this.tabSelect = index;
        }
    }
};
</script>

<style scoped lang="scss">
.help {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    .help-tab {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 48px;
        border-bottom: 1px solid #e7eef2;

        span {
            flex: 1;
            font-size: 16px;
            color: #697482;
            text-align: center;
            &.active {
                color: #2976fe;
            }
        }
    }
    .help-content {
        background: #f2f6fa;
        height: 100%;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        .operation {
            background: #fff;
            padding: 20px 14px;
            font-size: 0;
            border: 1px solid #e7eef2;
            border-radius: 4px;
            &:last-child{
                margin-top: 10px;
            }
            span {
                font-size: 14px;
                &.step {
                    color: #ffffff;
                    padding: 0 7px;
                    background: #feae29;
                    border-radius: 50%;
                }

                &.txt {
                    padding-left: 10px;
                    color: #333333;
                }
            }
            .help-1 {
                margin-top: 20px;
                height: 39px;
                margin-bottom: 20px;
            }
            .help-2 {
                height: 215px;
            }
            .help-3{
                margin-top: 20px;
                height: 184px;
            }
            .help-4{
                margin: 20px 0;
                height: 50px;
            }
            .help-5{
                height: 178px;
            }
        }
        .jingdong {
            width: 100%;
            height: 340px;
        }
        .step-buy {
            width: 100%;
            height: 60px;
        }
        .taobao {
            width: 100%;
            height: 260px;
        }
        .price-1 {
            width: 100%;
            height: 322px;
        }
        .price-2 {
            width: 100%;
            height: 60px;
        }
    }
}
</style> 