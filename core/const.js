
let Const = {
    ERROR: {
        ERROR_NETWORK: -10000,
        ERROR_INVALID: -1,
        ERROR_PARAM_NOT_SET: 1,
        ERROR_TOKEN_INVALID: 2,
        ERROR_LOGIN_FAIL: 3,
        ERROR_WRONG_PARAM: 4,
        ERROR_NOT_EXIST: 5,
        ERROR_EXIST: 6,
        ERROR_ORG_NOT_EXIST: 7,
        ERROR_ORG_MEMBER_NOT_EXISTS: 8,
        ERROR_REGISTER: 9,
        ERROR_USER_NOT_EXISTS: 10,
        ERROR_PHONE_HAS_BEEN_TAKEN: 11,
        ERROR_BIND_USER_BIND_EXISTS: 12,
        ERROR_WRONG_TYPE: 13,
        ERROR_SAVE_ERROR: 14,
        ERROR_ACTION_NOT_ALLOWED: 15,
        ERROR_WRONG_VERIFICATION_CODE: 16,
        ERROR_SEND_PHONE_VCODE_TOO_OFTEN: 17
    },

    NET: {

		// END_POINT: 'http://10.0.0.54:8073/client/1',  // test
		END_POINT: 'https://api.ynr.sinfere.com/client/1',
	    VERSION: 1,
	    CLIENT: 1,

        // IMG_URL_PREFIX: "https://static.innotick.com/smartwork/file/"
        IMG_URL_PREFIX: "https://static.innotick.com/smartwork/img/",
        FILE_URL_PREFIX: "https://static.innotick.com/smartwork/file/",

        // FILE_UPLOAD_END_POINT: "http://10.0.0.54:8083/file/file-upload",
        FILE_UPLOAD_END_POINT: "https://api.ynr.sinfere.com/file/file-upload",
        IMG_UPLOAD_END_POINT: "https://api.ynr.sinfere.com/file/img-upload",

        GEN_SHARE_IMAGE_URL: "https://api.ynr.sinfere.com/tool/gen-share-image",
        GEN_GROUP_SHARE_IMAGE_URL: "https://api.ynr.sinfere.com/tool/gen-group-image"
    },

    DATA: {
        KEY_PREFIX: 'mp.yeneiren.data.',
        KEY_TOKEN: 'token',
        KEY_USER: 'user',
        KEY_USER_TYPE: 'user-type',
        KEY_PROJECT: 'project',
    },

    USER_FAVORITE_TYPE: {
        TYPE_GROUP: 1,
        TYPE_POST: 2
    },

    ISLE_TYPE: [
        '金融',
        '房产',
        '教育',
        '社交',
        '美容',
        '健康',
        '运动',
        '文化',
    ],
    CURRENT_BANK_INDEX: 6,

    POST_TYPE: {
        POST: 1,
        QUESTION: 2,
        ANSWER: 3,
    },

    MEDIA_TYPE: {
        TEXT: 1,
        PICTURE: 2,
        FILE: 3,
        VOICE: 4
    },

    GROUP_MEMBER_ROLE: {
        OWNER: 1,
        NORMAL: 2,
        ADMIN: 3,
        ROLE_GUEST: 4

    },


};

module.exports = Const;
