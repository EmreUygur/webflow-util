"use strict";
// https://ipinfo.io/developers
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPInfo = void 0;
const geo_handler_base_1 = require("./geo-handler-base");
//        const ipinfoWrapper = new IPinfoWrapper(IP_INFO_TOKEN);
// ipinfoWrapper.lookupIp(null).then((response: IPinfo) => {
//     console.log(response);
// });
// ipinfoWrapper.lookupIp("1.1.1.1").then((response: IPinfo) => {
//     console.log(response);
// });
// ipinfoWrapper.lookupASN("AS7922").then((response: AsnResponse) => {
//     console.log(response);
// });
//const IP_INFO_TOKEN = '37cce46c605631';
class IPInfo extends geo_handler_base_1.GeoHandlerBase {
    get info() {
        return {
            ip: this.userInfoRaw.ip,
            country: this.userInfoRaw.countryCode,
            city: null,
            region: null,
            postal: null,
            timezone: null,
        };
    }
    constructor(token = null) {
        super(token);
    }
    async getInfoAsync() {
        const request = await fetch(`https://ipinfo.io/json?token=${this.token}`);
        this.userInfoRaw = await request.json();
        console.log(this.userInfoRaw);
        return this.userInfoRaw;
    }
}
exports.IPInfo = IPInfo;
//# sourceMappingURL=ip-info.js.map