"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var client = redis_1.createClient();
client.on('error', function (error) {
    console.error(error);
});
client.set('key', 'value', redis_1.print);
client.get('key', redis_1.print);
//# sourceMappingURL=redis-dao.js.map