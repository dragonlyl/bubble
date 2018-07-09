<template>
    <div class="detail">
        <scroll-view :scroll-y="true"
                     enable-back-to-top
                     class="scroll-wrapper">

            <div class="commodity-info">
                <div class="commodity-top">
                    <img :src="commodity.img"
                         class="commodity-img">
                    <div class="commodity-intro">
                        <span class="commodity-name">{{commodity.name}}</span>
                        <div class="block">
                            <span class="commodity-price">¥{{commodity.price}}</span>
                            <div class="block-center">
                                <img :src="commodity.status==1?'/static/assets/icon/icon-price-down-circle.png':commodity.status==-1?'/static/assets/icon/icon-price-up-circle.png':'/static/assets/icon/icon-price-mild-circle.png'"
                                     class="price-change-icon">
                                <span class="price-change">¥{{commodity.change}}</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="commodity-bottom">
                    <div class="block">
                        <div class="block-center"
                             v-if="showType!=2">
                            <img :src="commodity.from==1?'/static/assets/icon/icon-taobao.png':'/static/assets/icon/icon-jingdong.png'"
                                 class="from-img">
                            <span class="from-name">{{commodity.from==1?'淘宝':'京东'}}</span>
                        </div>

                        <span class="predict">双11预估价:
                            <span class="price">¥{{commodity.predict}}</span>
                        </span>
                    </div>
                    <span class="update-time">{{commodity.data}}更新</span>
                </div>

            </div>
            <div class="coupon"
                 v-if="commodity.coupon ">
                <img src="/static/assets/image/icon-coupon.png">
                <div class="txt">
                    <div class="block">
                        <span>¥</span>
                        <span class="price">{{commodity.coupon}}</span>
                        <span class="name">优惠券</span>
                    </div>
                    <span>立即领取</span>

                </div>
            </div>
            <div class="recent-price-chart">
                <div class="chart-top">
                    <div class="block">
                        <span class="min-price">{{commodity.min}}</span>
                        <span>最低价格</span>
                    </div>
                    <div class="line"></div>
                    <div class="block">
                        <span class="max-price">{{commodity.max}}</span>
                        <span>最高价格</span>
                    </div>
                </div>
                <div class="chart-center">
                    <div class="txt">
                        <span class="data">2018-02-20</span>
                        <span class="price">¥195</span>
                    </div>
                    <img src="/static/assets/image/icon-chart.png">
                </div>
            </div>
            <div class="hot-comment">
                <div class="title">热评</div>
                <div class="comment-item"
                     v-for="item in hotCommentList"
                     :key="item.name">
                    <div class="item-content">
                        <img :src="item.avatar"
                             class="avatar">
                        <div class="item-info">
                            <span class="user-name">{{item.name}}</span>
                            <span class="data">{{item.data}}</span>
                            <div class="content">
                                <span class="reply-content">{{item.reply}}</span>
                                <div class="have-link"
                                     v-if="item.haveLink &&item.haveLink==1"
                                     @click="goToAnotherCommodity(item)">
                                    <img src="/static/assets/icon/icon-commodity-link.png">
                                    <span>商品链接</span>
                                </div>
                            </div>
                            <div class="block wrapper">
                                <div class="block left"
                                     @click="changeFavor(item)">
                                    <img class="favor"
                                         :src="item.isFavor==0 ?'/static/assets/icon/icon-favor.png':'/static/assets/icon/icon-favor-check.png'">
                                    <span class="number">{{item.favorNumber}}</span>
                                </div>
                                <div class="block"
                                     @click="showCommentDetail(item)">
                                    <img class="comment"
                                         src="/static/assets/icon/icon-comment.png">
                                    <span class="number">{{item.commentNumber}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="all-comment">
                <div class="title">全部评论({{commentLength}})</div>
                <div class="comment-item"
                     v-for="item in allCommentList"
                     :key="item.name">
                    <div class="item-content">
                        <img :src="item.avatar"
                             class="avatar">
                        <div class="item-info">

                            <span class="user-name">{{item.name}}</span>
                            <span class="data">{{item.data}}</span>
                            <div class="content">
                                <span class="reply-content">{{item.reply}}</span>
                                <div class="have-link"
                                     v-if="item.haveLink &&item.haveLink==1">
                                    <img src="/static/assets/icon/icon-commodity-link.png">
                                    <span>商品链接</span>
                                </div>

                            </div>

                            <div class="block wrapper">
                                <div class="block left"
                                     @click="changeFavor(item)">
                                    <img class="favor"
                                         :src="item.isFavor==0 ?'/static/assets/icon/icon-favor.png':'/static/assets/icon/icon-favor-check.png'">
                                    <span class="number">{{item.favorNumber}}</span>
                                </div>
                                <div class="block"
                                     @click="showCommentDetail(item)">
                                    <img class="comment"
                                         src="/static/assets/icon/icon-comment.png">
                                    <span class="number">{{item.commentNumber}}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </scroll-view>
        <div class="message-text-input">
            <input type="text"
                   placeholder="发表评论"
                   v-model="inputComment"
                   @confirm="inputConfirm"
                   placeholder-style="color: #9DACBF;">
            <img class="subscribe"
                 :src="commodity.isSubscribe==0? '/static/assets/icon/icon-input-unsubscribe.png':'/static/assets/icon/icon-input-subscribe.png'">
            <img class="share"
                 @click="goToSharePage()"
                 src="/static/assets/icon/icon-share.png">
        </div>
    </div>

</template>

<script>
import Core from "core/core";
export default {
    components: {},

    data() {
        return {
            util: Core.Util,
            commodity: {
                name: "LED调节式金属组合桌灯",
                comment: 20,
                // 1:taobao  2:jingdong
                from: 1,
                price: 180,
                former: 190,
                //0平稳  1降价   -1 升价
                status: 1,
                change: 10,
                img: "/static/assets/image/commodity-1.png",
                data: "2017-10-20",
                predict: 150,
                coupon: 10,
                max: 200,
                min: 180,
                //是否订阅 0为否
                isSubscribe: 0
            },
            hotCommentList: [
                {
                    //0 为评论发布者  1为回复其他人
                    type: 0,
                    avatar: "/static/assets/image/icon-person.png",
                    name: "LLLLUY",
                    reply: "我来回哈哈哈哈哈哈哈复了!",
                    to: "我",
                    former: "怎么没人回复?",
                    data: "5小时前",
                    //0 为未点赞 1为点赞
                    isFavor: 0,
                    favorNumber: 10,
                    commentNumber: 10,
                    haveLink: 1
                },
                {
                    type: 1,
                    avatar: "/static/assets/image/icon-person.png",
                    name: "LLLLUY",
                    reply: "我来回复了!",
                    to: "我",
                    former: "怎么没人回复?",
                    commodityPic: "/static/assets/image/commodity-1.png",
                    commodityName: "LED调节式金属组合桌灯",
                    data: "5小时前",
                    isFavor: 1,
                    favorNumber: 10,
                    commentNumber: 10,
                    haveLink: 0
                }
            ],
            allCommentList: [
                {
                    //0 为评论发布者  1为回复其他人
                    type: 0,
                    avatar: "/static/assets/image/icon-person.png",
                    name: "LLLLUY",
                    reply: "我来回复了!",
                    to: "我",
                    former: "怎么没人回复?",
                    data: "5小时前",
                    //0 为未点赞 1为点赞
                    isFavor: 0,
                    favorNumber: 10,
                    commentNumber: 10
                },
                {
                    type: 1,
                    avatar: "/static/assets/image/icon-person.png",
                    name: "LLLLUY",
                    reply: "我来回复了!",
                    to: "我",
                    former: "怎么没人回复?",
                    commodityPic: "/static/assets/image/commodity-1.png",
                    commodityName: "LED调节式金属组合桌灯",
                    data: "5小时前",
                    isFavor: 1,
                    favorNumber: 10,
                    commentNumber: 10
                }
            ],
            inputComment: "",
            newComment: {
                type: 0,
                avatar: "/static/assets/image/icon-person.png",
                name: "LLLLUY",
                reply: "我来回复了!",
                to: "我",
                former: "怎么没人回复?",
                data: "5小时前",
                //0 为未点赞 1为点赞
                isFavor: 0,
                favorNumber: 10,
                commentNumber: 10
            }
        };
    },
    computed: {
        commentLength() {
            return this.allCommentList.length;
        }
    },
    created() {},
    methods: {
        goToSharePage() {
            this.util.go("/pages/模块/分享/main");
            // ?item_id=${this.item.id}
        },
        changeFavor(item) {
            item.favorNumber += item.isFavor == 1 ? -1 : 1;
            item.isFavor = item.isFavor == 1 ? 0 : 1;
        },
        showCommentDetail(item) {
            this.util.go("/pages/模块/详情/评论详情/main");
            // ?item_id=${this.item.id}
        },
        goToAnotherCommodity(item) {
            this.util.go(`/pages/模块/详情/main`);
            // ?item_id=${this.item.id}
        },
        inputConfirm() {
            if (this.inputComment) {
                let a =JSON.parse(JSON.stringify(this.newComment))
                a.reply = this.inputComment;
                this.allCommentList.push(a);
                this.inputComment = "";
            }
        }
    }
};
</script>

<style scoped lang="scss">
.detail {
    min-height: 100vh;
    width: 100%;
    background: #f2f6fa;
    .scroll-wrapper {
        position: absolute;
        top: 0;
        bottom: 54px;
        left: 0;
        right: 0;
        z-index: 1;
        .commodity-info {
            display: flex;
            height: 190px;
            width: 100%;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 20px 20px 10px;
            align-items: flex-start;
            background: #ffffff;
            .commodity-top {
                display: flex;
                width: 100%;
                box-sizing: border-box;
                align-items: center;
                background: #ffffff;
                height: 100px;
                .commodity-img {
                    width: 100px;
                    height: 100px;
                    border-radius: 4px;
                }
                .commodity-intro {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex: 1;
                    height: 100%;
                    margin-left: 20px;
                    .commodity-name {
                        color: #333333;
                        margin-top: 4px;
                        font-size: 16px;
                    }
                    .block {
                        display: flex;
                        align-items: center;
                        .commodity-price {
                            font-size: 20px;
                            color: #ff6b63;
                        }
                        .block-center {
                            display: flex;
                            align-items: center;
                            margin-left: 20px;
                            padding: 3px 0;
                            .price-change-icon {
                                width: 14px;
                                height: 14px;
                            }
                            .price-change {
                                font-size: 14px;
                                color: #8390a1;
                                margin-left: 4px;
                            }
                        }
                    }
                }
            }
            .commodity-bottom {
                display: flex;
                width: 100%;
                justify-content: space-between;
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

                    .predict {
                        font-size: 12px;
                        color: #8390a1;
                        .price {
                            font-size: 12px;
                            color: #697482;
                        }
                    }
                }
                .update-time {
                    font-size: 12px;
                    color: #acb8c8;
                }
            }
        }
        .coupon {
            height: 90px;
            border: 1px solid #e7eef2;
            box-shadow: 0 1px 0 0 #e7eef2;
            width: 100%;
            position: relative;

            img {
                height: 70px;
                width: 355px;
                box-sizing: border-box;
                margin: 10px;
            }
            .txt {
                position: absolute;
                display: flex;
                left: 50px;
                right: 40px;
                top: 24px;
                justify-content: space-between;
                align-items: center;
                .block {
                    span {
                        font-size: 14px;
                        color: #ffffff;
                        &.price {
                            font-size: 30px;
                        }
                        &.name {
                            margin-left: 10px;
                            font-size: 12px;
                        }
                    }
                }
                span {
                    font-size: 14px;
                    color: #ffffff;
                }
            }
        }
        .recent-price-chart {
            width: 100%;
            border: 1px solid #e7eef2;
            background: #ffffff;
            .chart-top {
                display: flex;
                justify-content: space-between;
                padding: 30px 75px 20px;
                .block {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    span {
                        color: #acb8c8;
                        font-size: 12px;
                        &.min-price {
                            font-size: 20px;
                            color: #2976fe;
                        }
                        &.max-price {
                            font-size: 20px;
                            color: #697482;
                        }
                    }
                }
                .line {
                    width: 1px;
                    background: #f1f5fa;
                }
            }
            .chart-center {
                padding: 0 24px 20px;
                text-align: center;
                .txt {
                    background: #f2f6fa;
                    border-radius: 100px;
                    padding: 0px 8px;
                    display: inline-block;
                    height: 20px;
                    line-height: 16px;
                    text-align: center;
                    margin-bottom: 20px;
                    .data {
                        font-size: 12px;
                        color: #697482;
                    }
                    .price {
                        padding-left: 10px;
                        font-size: 12px;
                        color: #2976fe;
                    }
                }
                img {
                    height: 169px;
                }
            }
        }
        .hot-comment {
            margin-top: 10px;
            border-top: 1px solid #e7eef2;
        }
        .all-comment {
            background: #ffffff;
        }
        .title {
            padding: 20px 20px 0px;
            font-size: 14px;
            color: #697482;
            background: #ffffff;
        }
        .comment-item {
            padding: 20px;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border-bottom: 1px solid #e7eef2;
            .first-title {
                font-size: 14px;
                color: #697482;
                margin-top: 10px;
                margin-bottom: 20px;
            }
            .item-content {
                display: flex;
                .avatar {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                }
                .item-info {
                    display: flex;
                    flex-direction: column;
                    margin-left: 14px;
                    flex: 1;

                    .user-name {
                        font-size: 16px;
                        color: #333333;
                    }
                    .data {
                        margin-top: 2px;
                        font-size: 11px;
                        color: #9dabc0;
                    }
                    .content {
                        .reply-content {
                            font-size: 16px;
                            color: #333333;
                            margin-top: 6px;
                        }
                        .have-link {
                            margin-left: 2px;
                            display: inline-flex;
                            align-items: center;
                            img {
                                width: 12px;
                                height: 12px;
                            }
                            span {
                                padding-left: 6px;
                                font-size: 14px;
                                color: #2976fe;
                            }
                        }
                    }

                    .block {
                        display: flex;
                        align-items: center;
                        padding-right: 2px;
                        &.wrapper {
                            margin-top: 19px;
                        }
                        &.left {
                            // margin-right: 30px;
                            margin-right: 20px;
                            width: 44px;
                        }
                        .favor {
                            width: 16px;
                            height: 16px;
                        }
                        .comment {
                            width: 16px;
                            height: 16px;
                        }
                        .number {
                            margin-left: 6px;
                            font-size: 12px;
                            color: #8390a1;
                        }
                    }
                }
            }
        }
    }
    .message-text-input {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 56px;
        width: 100%;
        background: #ffffff;
        padding: 11px 14px;
        box-sizing: border-box;
        vertical-align: middle;
        border-top: 1px solid #e7eef2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
        input {
            background: #f2f6fa;
            border: 1px solid #e7eef2;
            border-radius: 4px;
            height: 100%;
            width: 239px;
            // margin-right: 14px;
            padding: 3px 14px;
            box-sizing: border-box;
            font-size: 14px;
            vertical-align: middle;
            display: inline-block;
        }
        .subscribe {
            width: 20px;
            height: 20px;
        }
        .share {
            width: 22px;
            height: 22px;
            padding-right: 6px;
        }
    }
}
</style>
