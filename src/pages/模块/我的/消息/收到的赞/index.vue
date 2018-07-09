 <template>
    <div class="message">
        <div class="message-content"
             :class="{empty:messageNumber==0}">
            <template v-if="messageNumber==0">
                <img class="empty-img"
                     src="/static/assets/icon/icon-index-empty.png">
                <span class="empty-txt">暂无消息</span>
            </template>
            <template v-else>
                <div class="message-list">
                    <div class="message-item" v-for="item in favorList" :key="item.name">
                        <img :src="item.avatar"
                             class="avatar">
                        <div class="message-info">
                            <span class="user-name">{{item.name}}</span>
                            <span class="reply-content">赞了你</span>
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
            ]
        };
    },

    mounted() {}
};
</script>

<style scoped lang="scss">
.message {
    min-height: 100vh;
    .message-content {
        flex: 1;
        display: flex;
        background: #f2f6fa;
        flex-direction: column;
        
        .message-list {
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
