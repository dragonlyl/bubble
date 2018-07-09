let Api = require('./api');
let Const = require('./const');
let WeChat = require('./wechat');
let Event = require('./event');
let Util = require('./util');
let Data = require('./data');
let Core = {
    Api: Api,
    Const: Const,
    WeChat: WeChat,
    Event: Event,
    Util: Util,
    Data: Data
};

module.exports = Core;
