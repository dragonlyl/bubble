 <template>
    <div class="message">
        <div class="message-top" @click="goToFavorPage()">
            <img src="/static/assets/icon/icon-receive-favor.png">
            <span>收到的赞</span>
        </div>
        <div class="message-content"
             :class="{empty:messageNumber==0}">
            <template v-if="messageNumber==0">
                <img class="empty-img"
                     src="/static/assets/icon/icon-index-empty.png">
                <span class="empty-txt">暂无消息</span>
            </template>
            <template v-else>
                <div class="message-list">
                    <div class="message-item" v-for="item in favorList" :key="item.name" @click="goToDetailPage(item)">
                        <img :src="item.avatar"
                             class="avatar">
                        <div class="message-info">
                            <span class="user-name">{{item.name}}</span>
                            <span class="reply-content">{{item.reply}}!</span>
                            <div class="former-content">
                                <span class="name">{{item.to}}:</span>
                                <span class="txt">{{item.former}}</span>
                            </div>
                            <span class="data">{{item.data}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Core from "core/core";
export default {
    components: {},

    data() {
        return {
            messageNumber: 1,
            favorList: [
                {
                    avatar: "/static/assets/image/icon-person.png",
                    name: "LLLLUY",
                    reply: "我来回复了",
                    to: "我",
                    former: "怎么没人回复?",
                    data: "5小时前"
                },
                {
                    avatar: "/static/assets/image/icon-person.png",
                    name: "LLLLUY",
                    reply: "我来回复了",
                    to: "我",
                    former: "怎么没人回复?",
                    data: "5小时前"
                }
            ],
             util:Core.Util
        };
    },

    created() {},
    methods:{
        goToFavorPage(){
            Core.Util.go("/pages/模块/我的/消息/收到的赞/main");
        },
        goToDetailPage(url){
            Core.Util.go("/pages/模块/我的/消息/详情/main");
        }
    }
};
</script>

<style scoped lang="scss">
.message {
    min-height: 100vh;
    .message-top {
        height: 62px;
        line-height: 62px;
        img {
            height: 34px;
            width: 34px;
            vertical-align: middle;
            margin-left: 20px;
        }
        span {
            font-size: 16px;
            color: #697482;
            vertical-align: middle;
            margin-left: 14px;
        }
    }

    .message-content {
        flex: 1;
        display: flex;
        background: #f2f6fa;
        flex-direction: column;
        &.empty {
            align-items: center;
            justify-content: center;
        }
        .empty-img {
            width: 69px;
            height: 69px;
        }
        .empty-txt {
            font-size: 14px;
            color: #9dacbf;
            margin-top: 20px;
        }
        .message-list {
            margin-top: 10px;
            background: #ffffff;
            .message-item {
                padding: 20px;
                display: flex;
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
                    .user-name {
                        font-size: 16px;
                        color: #333333;
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
                    }
                    .data {
                        font-size: 11px;
                        color: #9dabc0;
                        margin-top: 4px;
                    }
                }
            }
        }
    }
}
</style>
