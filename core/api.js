const Const = require('./const');
const Data = require('./data');

let apiList = {
    // 通用操作
    Common: {
        // 发送验证码
        sendCode: ['common/phone-verification-code-send', 'phone'],
        // 验证验证码
        checkCode: ['common/phone-verification-code-check', 'phone', 'code'],
        // 文件上传
        uploadImg: ['file/img-upload', 'file']
    },
    // 用户操作
    User: {
        // 用户登录操作
        login: ['user/login', 'username', 'password'],
        // 微信登录
        loginByWx: ['user/login-by-wx', 'outer_user_id', 'outer_data'],
        // 用户注册
        register: ['user/register', 'username', 'password'],
        // 用户登出操作
        logout: ['user/logout'],
        // 重置密码
        resetPassword: ['user/password-reset', 'user_id', 'password'],
        // 更新用户数据
        updateUserInfo: ['user/info-update', 'name', 'email'],
        // 获取用户身份数据
        getUserInfo: ['user/info'],
        // 手机号绑定
        bindPhone: ['user/phone-bind', 'phone', 'code'],
        // 用户收藏
        saveFavorite: ['user-favorite/save', 'target_id', 'target_type'],
        // 用户收藏列表
        getFavoriteList: ['user-favorite/list', 'target_type'],
        // 获取用户的内容信息
        getTargetUserInfo: ['user/target-user-info', 'user_id'],
        // 用户是否关注公众号
        getUserWhetherFocus: ['user/is-user-focus']
    },
    // 微信操作
    Wx: {
        // 微信小程序服务端加密
        encryptedData: ['wx/decrypt', 'code', 'encrypted_data', 'iv'],
        sendTemplateMessage: ['wx/template-message', 'form_id']
    },

    // 内容操作
    Post: {
        // 发表主题
        publishTheme: ['post/save', 'post_id', 'group_id', 'type', 'media_type', 'title', 'content', 'img', 'file', 'data'],
        // 主题列表获取
        getPostList: ['post/list', 'group_id', 'type', 'page', 'filter'],
        // 主题获取
        getPost: ['post/detail', 'post_id'],
        // 主题点赞
        likePost: ['post/like', 'post_id'],
        // 主题评论列表获取`
        getCommentList: ['post/comment-list', 'post_id', 'page'],
        // 保存主题评论
        saveComment: ['post/comment-save', 'post_id', 'content'],
        // 评论点赞
        likeComment: ['post/comment-like', 'post_comment_id'],
        // 删除评论
        deleteComment: ['post/comment-delete', 'post_comment_id'],
        // 发表提问
        saveQuestion: ['post/question-save', 'group_id', 'type', 'media_type', 'title', 'content', 'question_user_id', 'anonymous'],
        //获取自己的发表的主题
        getPostForMe: ['post/list-for-me', 'type', 'page'],
        //回答提问
        answerQuestion: ['post/question-answer', 'post_id', 'media_type', 'title', 'content'],
        // 主题删除
        deletePost: ['post/delete', 'post_id'],
        getQuestionListForMe: ['post/question-list-for-me', 'page'],
        // 主题置顶
        makePostTop: ['post/is-top', 'post_id'],
        // 判断是否有资格修改主题
        authEdit: ["post/post-auth-edit", "post_id"],
        // 获取提问列表
        getQuestionList: ['post/target-user-answer-list', 'group_member_id'],
        // 获取三条主题列表
        getListForGroupOwner: ['post/list-for-group-owner', 'group_id', 'group_uid'],
        markPostIsRead: ['post/mark-as-read', 'post_id']
    },
    // 小岛操作
    Group: {
        // 查看小岛信息
        getInfo: ['group/info', 'group_id', 'uid'],
        groupList: ['group/list', 'page', 'keywords'],
        // 搜索小岛列表
        searchList: ['group/search', 'name'],
        // 用户创建的小岛列表
        getListForMe: ['group/list-for-me'],
        // 创建/修改一个小岛
        createGroup: ['group/create', 'group_id', 'name', 'type', 'desc', 'theme', 'membership_type', 'membership_fee', 'privacy_entrance_audit', 'auth_private_chat'],
        // 管理小岛
        manageGroup: ['group/manage', 'group_id', 'membership_fee', 'privacy_entrance_audit', 'auth_post_create', 'auth_private_chat'],

        quitGroup: ['group/quit', 'group_id'],

        getWxQrcode: ['group/wx-qrcode', 'group_id']
    },
    // 成员操作
    GroupMember: {
        // 获取小岛成员
        getGroupMemberList: ['group-member/group-member-list', 'group_id', 'limit'],
        // 获取小岛有身份的人
        getGroupMemberIdentityList: ['group-member/group-member-identity-list', 'group_id'],
        // 移除小岛成员
        removeGroupMember: ['group-member/group-member-remove', 'group_member_id'],
        // 设置小岛管理员
        setGroupMemberAdmin: ['group-member/group-member-admin-set', 'group_member_id'],
        // 设置小岛嘉宾
        setGroupMemberGuest: ['group-member/group-member-guest-set', 'group_member_id'],

        getGroupMemberDetail: ['group-member/group-member-info', 'group_member_id'],
        saveGroupMemberDesc: ['group-member/group-member-desc-save', 'group_member_id', 'desc'],
        isOwner: ['group-member/user-is-owner', 'group_id'],

    },
    // 收藏操作
    Collect: {
        // 收藏主题/评论字段
        collectPost: ['user-favorite/save', 'target_id', 'target_type']
    },
    Apply: {
        inviteGroupCreate: ['apply/invite-group-create', 'target_id'],
        acceptGroupInvite: ['apply/invite-accept', 'uid'],
        saveApply: ['apply/apply-save', 'group_id', 'role'],
        getApplyList: ['apply/apply-list', 'group_id'],
        getApplyListForMe: ['apply/apply-list-for-me'],
        // 操作审批请求
        handleApply: ['apply/apply-process', 'apply_id', 'status'],
        waitProcessApplyCountForMe: ['apply/wait-process-apply-count-for-me'],
        checkApplyInfo: ['apply/apply-audit-status', 'group_id', 'group_uid']
    },

    // 钱包
    Money: {
        getBalance: ['money/balance'],
    },

    // 产品
    Item: {
        saveItem: ['item/save', 'item_id', 'group_id', 'cover', 'name', 'description', 'price', 'rate_of_return', 'attachment', 'intro'],
        getItemList: ['item/list', 'group_id', 'user_id', 'page'],
        deleteItem: ['item/delete', 'item_id'],
        getItemDetail: ['item/detail', 'item_id']

    },

    // 标签管理
    Tag: {
        // 获取标签列表
        getTagList: ['tag/list', 'group_id'],
        // 保存标签
        saveTag: ['tag/save', 'group_id', 'name'],
        // 删除标签
        deleteTag: ['tag/delete', 'tag_id']
    },

    Message: {

        chatSessionCreate: ['message/chat/session/create', 'to_user_id', 'group_id'],

        // 聊天 - 发送文字消息
        chatSendText: ['message/chat/text/send', 'to_user_id', 'content'],
        // 聊天 - 发送图片消息
        chatSendImg: ['message/chat/img/send', 'to_user_id', 'img'],
        chatSessionList: ['message/chat/session/list', 'page'],
        // 更新已读
        markSessionAsRead: ['message/session/mark-as-read', 'session_id'],

        itemConsultSessionCreate: ['message/item-consult/session/create', 'to_user_id', 'item_id'],
        // 咨询 - 发送文字信息
        itemConsulSendText: ['message/item-consult/text/send', 'to_user_id', 'item_id', 'content'],
        itemConsulSendImg: ['message/item-consult/img/send', 'to_user_id', 'item_id', 'img'],

        itemConsultSessionList: ['message/item-consult/session/list', 'page'],

        // 获取会话的消息列表
        getMessageList: ['message/list', 'page', 'session_id', 'min_time'],
        sessionDetail: ['message/chat/session/detail', 'session_id'],
        updateSessionRead: ['message/session/mark-as-read', 'session_id'],

        getMessageUnreadStat: ['message/unread-stat']
    }
};

let api = {};

for (let moduleKey in apiList) {
    let moduleApiList = apiList[moduleKey];
    api[moduleKey] = {};
    for (let functionName in moduleApiList) {
        let config = moduleApiList[functionName];
        api[moduleKey][functionName] = (function (config) {
            return function () {
                let action = config[0];
                let data = {};
                if (config.length > 1) {
                    for (let i = 1; i < config.length; i++) {
                        let key = config[i];
                        let value = arguments[i - 1];
                        if (value === undefined) {
                            continue;
                        }
                        data[key] = value;
                    }
                }
                return post(action, data);
            };
        })(config);
    }
}

function transformObjectToUrlencodedData(obj) {
    let p = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return p.join('&');
}

function getUrl(url, params) {
    let token = Data.getToken() || "";
    let host = Const.NET.END_POINT;

    let requestData = Object.assign({
        token: token,
        client: Const.NET.CLIENT,
        version: Const.NET.VERSION,
    }, params);

    return `${host}/${url}?${transformObjectToUrlencodedData(requestData)}`
}


function post(url, params) {
    let token = Data.getToken() || "";
    let host = Const.NET.END_POINT;
    return new Promise((resolve, reject) => {
        let requestData = Object.assign({
            token: token,
            client: Const.NET.CLIENT,
            version: Const.NET.VERSION,
        }, params);

        console.info(`${host}/${url}?${transformObjectToUrlencodedData(requestData)}`);

        wx.request({
            url: `${host}/${url}`,
            data: requestData,
            method: "POST",
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
                if (res.data.hasOwnProperty('code') && res.data.code === 2) {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'success'
                    })
                }
                if (res.data.hasOwnProperty('code')) {
                    let code = res.data.code;
                    if ([0, 2].indexOf(code) > -1) {
                        if (code === 0) {
                            resolve(res.data.data);
                        } else {
                            let url = "/pages/模块/登录/main";
                            wx.reLaunch({
                                url: url
                            });
                            reject({
                                code: res.data.code,
                                message: "登录信息过期"
                            })
                        }
                    } else {
                        handlerError(res, reject)
                    }
                } else {
                    handlerError(res, reject)
                }

            },
            fail: function (reason) {
                reject({
                    code: Const.ERROR.ERROR_NETWORK,
                    response: reason
                })
            }
        });
    });
}


function handlerError(res, reject) {
    wx.showModal({
        title: '',
        content: (res.data && res.data.message) || '数据获取失败',
        showCancel: false,
        success: function () {
            reject({
                code: res.data.code,
                message: res.data.message
            })
        }
    });
}

api.getUrl = getUrl

module.exports = api;
