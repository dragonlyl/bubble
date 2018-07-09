<template>
    <div class="commodity"
        @click.stop="goToDetail">
        <span v-if="showType==3" class="find-change">发现冒泡</span>
        <div class="commodity-info" :class="{type1:showType==1,type3:showType==3}">
            <img :src="commodity.img"
                 class="commodity-img">
            <div class="commodity-intro">
                <span class="commodity-name">{{commodity.name}}</span>
                <div class="block">
                    <div class="block-center"
                         v-if="showType!=2">
                        <img :src="commodity.from==1?'/static/assets/icon/icon-taobao.png':'/static/assets/icon/icon-jingdong.png'"
                             class="from-img">
                        <span class="from-name">{{commodity.from==1?'淘宝':'京东'}}</span>
                    </div>

                    <span class="comment"
                          v-if="showType!=1">{{commodity.comment}}评论</span>
                </div>
            </div>
            <span class="commodity-price"
                  v-if="showType!=2">
                ¥{{commodity.price}}
            </span>
            <span class="commodity-price"
                  v-if="showType==2"
                  :class="{down:commodity.status==1,mild:commodity.status==0,up:commodity.status==-1}">
                ¥{{commodity.price}}
            </span>

        </div>
        <div class="recent-price"
             v-if="showType==2">
            <span class="price">最近:&nbsp;¥{{commodity.former}}</span>
            <div class="block">
                <img class="status"
                     v-if="commodity.status==1"
                     src="/static/assets/icon/icon-price-down.png">
                <img class="status"
                     v-if="commodity.status==-1"
                     src="/static/assets/icon/icon-price-up.png">
                <img class="status mild"
                     v-if="commodity.status==0"
                     src="/static/assets/icon/icon-price-mild.png">
                <span class="price">¥{{commodity.change}}</span>
                <img class="chart"
                     v-if="commodity.status==1"
                     src="/static/assets/image/img-down.png">
                <img class="chart"
                     v-if="commodity.status==-1"
                     src="/static/assets/image/img-up.png">
                <img class="chart mild"
                     v-if="commodity.status==0"
                     src="/static/assets/image/img-mild.png">
            </div>
        </div>
    </div>

</template>

<script>
import Core from "core/core";
export default {
    data() {
        return {
            util: Core.Util,
        };
    },
    props: {
        //1:查询时  2:订阅时  3.冒泡时
        showType: {
            type: Number
        },
        //至少有 img, name,from(1.taobao 2.jingdong),comment(评论数),price,status(价格颜色),former(先前价格),change(改变的价格)
        commodity: {
            type: Object
        }
    },

    mounted() {},

    methods: {
        goToDetail() {
            this.util.go(`/pages/模块/详情/main`);
            // ?item_id=${this.commodity.id}
        }
    }
};
</script>

<style scoped lang="scss" ref="stylesheet/scss">
.commodity {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #e7eef2;
    border-radius: 4px;
    margin-top: 10px;
    .find-change{
        padding-left: 14px;
        font-size: 14px;
        color: #697482;
        padding-top: 20px;
    }
    .commodity-info {
        display: flex;
        height: 80px;
        width: 100%;
        box-sizing: border-box;
        padding: 14px 0 10px 14px;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        border-radius: 4px;
        &.type1{
            padding: 10px 0 10px 10px;
        }
        &.type3{
            padding: 14px 0 16px 14px;
        }
        .commodity-img {
            width: 60px;
            height: 60px;
            border-radius: 3px;
        }
        .commodity-intro {
            display: flex;
            margin-left: 10px;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            height: 100%;
            .commodity-name {
                font-size: 14px;
                color: #333333;
            }
            .block {
                display: flex;
                align-items: center;
                margin-left: 4px;
                .block-center {
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    padding: 1px 4px;
                    background: #f2f6fa;
                    .from-img {
                        width: 14px;
                        height: 14px;
                        vertical-align: middle;
                    }
                    .from-name {
                        margin-left: 6px;
                        font-size: 12px;
                        color: #697482;
                    }
                }

                .comment {
                    font-size: 12px;
                    color: #acb8c8;
                }
            }
        }
        .commodity-price {
            background-image: linear-gradient(
                -138deg,
                #ffb34b 0%,
                #ff8079 100%
            );
            align-self: flex-end;
            border-radius: 13px 0 0 13px;
            font-size: 14px;
            color: #ffffff;
            padding: 3px 10px 3px 14px;
            &.down {
                background-image: linear-gradient(
                    -90deg,
                    #22dfb6 0%,
                    #04cda2 100%
                );
            }
            &.up {
                background: #f2f6fa;
                color: #fe483f;
            }
            &.mild {
                background: #f2f6fa;
                color: #2976fe;
            }
        }
        .recent-price {
            height: 33px;
        }
    }
    .recent-price {
        border-top: 1px solid #f2f6fa;
        margin: 0px 14px;
        padding: 8px 0;
        display: flex;
        justify-content: space-between;
        .price {
            font-size: 12px;
            color: #8390a1;
        }
        .block {
            display: flex;
            align-items: center;
            .status {
                width: 6px;
                height: 12px;
                margin-right: 4px;

                &.mild {
                    width: 10px;
                    height: 2px;
                }
            }
            .chart {
                margin-left: 14px;
                width: 39px;
                height: 11px;

                &.mild {
                    width: 39px;
                    height: 4px;
                }
            }
        }
    }
}
</style>
