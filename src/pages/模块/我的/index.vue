<template>
    <div class="personal">
        <div class="personal-top">
            <div class="personal-avatar">
                <img :src="user.avatar">
            </div>
            <span>Hi,{{user.name}}</span>
        </div>
        <div class="personal-bottom">
            <div class="bottom-list">
                <div class="item"
                     v-for="item in personalList"
                     :key="item.name" @click="goToPage(item.pageUrl)">
                    <div class="item-left">
                        <img :src='item.icon'>
                        <span class="name">{{item.name}}</span>
                    </div>
                    <span class="number"
                          v-if="item.number">{{item.number}}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Core from "core/core";
export default {
    components: {},

    data() {
        return {
            user: {
                name: "Bruce",
                avatar: "/static/assets/image/1.png"
            },
            personalList: [
                {
                    icon: "/static/assets/icon/icon-my-message.png",
                    name: "消息",
                    number: 2,
                    pageUrl: "/pages/模块/我的/消息/main"
                },
                {
                    icon: "/static/assets/icon/icon-my-reply.png",
                    name: "反馈",
                    pageUrl: "/pages/模块/我的/反馈/main"
                },
                {
                    icon: "/static/assets/icon/icon-my-favor.png",
                    name: "帮助",
                    number: 0,
                    pageUrl: "/pages/模块/我的/帮助/main"
                },
                {
                    icon: "/static/assets/icon/icon-my-setting.png",
                    name: "设置",
                    pageUrl: "/pages/模块/我的/设置/main"
                },
                {
                    icon: "/static/assets/icon/icon-my-recommend.png",
                    name: "推荐",
                    pageUrl: "/pages/模块/我的/推荐/main"
                },
            ],
            util:Core.Util
        };
    },

    created() {},
    methods:{
        goToPage(url){
            url ? this.util.go(url) :'';
        }
    }
};
</script>

<style scoped lang="scss">
.personal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.personal-top {
    height: 180px;
    width: 100%;
    border-bottom: 1px solid #e7eef2;

    .personal-avatar {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }
    }
    span {
        font-size: 22px;
        color: #333333;
        margin-left: 20px;
        font-weight: 500;
    }
}
.personal-bottom {
    background: #f2f6fa;
    height: 100%;
    padding-top: 10px;
    .bottom-list {
        // padding-top: 10px;
        border: 1px solid #e7eef2;
        .item {
            display: flex;
            background: #ffffff;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            padding-right: 20px;
            height: 58px;
            border-bottom: 1px solid #e7eef2;
            .item-left {
                display: flex;
                align-items: center;
                img {
                    width: 18px;
                    height: 16px;
                }
                .name {
                    margin-left: 20px;
                    font-size: 16px;
                    color: #333333;
                }
            }
            .number {
                background: #e92736;
                border-radius: 100px;
                font-size: 12px;
                color: #ffffff;
                padding: 1px 9px;
            }
            &:last-child {
                border-top: 1px solid #e7eef2;
                margin-top: 10px;
            }
        }
    }
}
</style>
