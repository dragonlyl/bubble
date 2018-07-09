 <template>
    <div class="message">
        <scroll-view :scroll-y="true"
                     enable-back-to-top
                     class="scroll-wrapper">
            <div class="message-content">
                <div class="message-list">
                    <div class="message-item"
                         v-for="item in messageList"
                         :key="item.name">
                         <img :src="item.avatar"
                             class="avatar">
                        <div class="message-info">
                            <div class="block top">
                                <span class="user-name">{{item.name}}</span>
                                <div class="wrapper"
                                     @click="changeFavor(item)">
                                    <img class="favor"
                                         :src="item.isFavor==0 ?'/static/assets/icon/icon-favor.png':'/static/assets/icon/icon-favor-check.png'">
                                    <span class="number" v-if="item.favorNumber">{{item.favorNumber}}</span>
                                </div>
                            </div>
                            <span class="reply-content">{{item.reply}}</span>
                            <div class="former-content commodity">
                                <img :src="item.commodityPic"
                                     class="commodity-pic">
                                <span class="txt">{{item.commodityName}}</span>
                            </div>
                            <div class="block bottom">
                                <span class="data">{{item.data}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="message-all-reply">
                <div class="all-reply-title">
                    <span>回复({{commentLength}})</span>
                </div>
                <div class="all-reply-content">
                    <div class="message-item"
                         v-for="item in allCommentList"
                         :key="item.name">
                        <img :src="item.avatar"
                             class="avatar">
                        <div class="message-info">
                            <div class="block top">
                                <span class="user-name">{{item.name}}</span>
                                <img class="favor" @click="changeFavor(item)"
                                     :src="item.isFavor==0 ?'/static/assets/icon/icon-favor.png':'/static/assets/icon/icon-favor-check.png'">
                            </div>
                            <div class="content">
                                <span class="reply-content">{{item.reply}}</span>
                                <span class="to-other"
                                      v-if="item.type ==1">
                                    //
                                    <span class="name">@{{item.to}}&nbsp;</span>
                                    <span class="txt">:{{item.former}}</span>
                                </span>
                            </div>

                            <div class="block">
                                <span class="data">{{item.data}}</span>
                                <span class="delete" v-if="item.isCreator==1 " @click="deleteComment()">删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll-view>
        <div class="message-text-input">
            <input type="text"
                   placeholder="回复"
                   placeholder-style="color: #9DACBF;">
            <div class="send">发送</div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},

    data() {
        return {
            messageList: [
                {
                    //1 为消息  2 为商品 3 为none
                    type: 2,
                    avatar: "/static/assets/image/icon-person.png",
                    name: "LLLLUY",
                    reply: "我来回复了!",
                    to: "我",
                    commodityPic: "/static/assets/image/commodity-1.png",
                    commodityName: "LED调节式金属组合桌灯",
                    data: "5小时前",
                    isFavor: 0,
                    favorNumber:2
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
                    isCreator:1,
                    id:11
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
                    isCreator:0,
                }
            ]
        };
    },
    computed:{
        commentLength() {
            return this.allCommentList.length;
        }
    },
    created() {},
    methods:{
        changeFavor(item) {
            if(item.favorNumber){
                item.favorNumber += item.isFavor == 1 ? -1 : 1;
            }
            item.isFavor = item.isFavor == 1 ? 0 : 1;
        },
        deleteComment(){
            let index=this.allCommentList.findIndex(item=>{
                if(item.id ==11) return true
            })
            this.allCommentList.splice(index ,index+1)
        }
    }
};
</script>

<style scoped lang="scss">
.message {
    min-height: 100vh;
    background: #f2f6fa;
    .scroll-wrapper {
        position: absolute;
        top: 0;
        bottom: 54px;
        left: 0;
        right: 0;
        z-index: 1;
        .message-content {
            // flex: 1;
            display: flex;
            flex-direction: column;
            .message-list {
                background: #ffffff;
            }
        }
        .message-all-reply {
            margin-top: 10px;
            background: #ffffff;
            .all-reply-title {
                padding-left: 20px;
                padding-top: 30px;
                span {
                    font-size: 14px;
                    color: #697482;
                }
            }
            .all-reply-content { 
                .content {
                    margin-top: 8px;
                    font-size: 0;
                    margin-bottom: 4px;
                    .to-other {
                        font-size: 16px;
                        color: #333333;
                        .name {
                            font-size: 16px;
                            color: #2976fe;
                        }
                        .txt {
                            font-size: 16px;
                            color: #333333;
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
        input {
            background: #f2f6fa;
            border: 1px solid #e7eef2;
            border-radius: 4px;
            height: 100%;
            width: 272px;
            margin-right: 14px;
            padding: 3px 14px;
            box-sizing: border-box;
            font-size: 14px;
            vertical-align: middle;
            display: inline-block;
        }
        .send {
            background: #2976fe;
            border-radius: 4px;
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            padding: 7px 16px;
            display: inline-block;
        }
    }
}
.message-item {
    padding: 20px;
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #e7eef2;
    .avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
    }
    .message-info {
        display: flex;
        flex-direction: column;
        margin-left: 14px;
        flex: 1;
        .block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &.bottom {
                margin-top: 8px;
            }
        }
        .user-name {
            font-size: 16px;
            color: #333333;
        }
        .favor {
                width: 16px;
                height: 16px;
            }
        .wrapper {
            display: inline-flex;
            align-items: center;
            .number {
                margin-left: 6px;
                font-size: 12px;
                color: #8390a1;
            }
        }

        .reply-content {
            font-size: 16px;
            color: #333333;
            margin-top: 8px;
        }
        .former-content {
            margin-top: 4px;
            background: #f6f8fa;
            padding: 10px 14px;
            span {
                font-size: 14px;
                color: #697482;
            }
            &.commodity {
                padding: 5px;
                display: flex;
                align-items: center;
                .commodity-pic {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
            }
        }
        .data {
            font-size: 11px;
            color: #9dabc0;
        }
        .delete {
            font-size: 11px;
            color: #333333;
        }
    }
}
</style>
