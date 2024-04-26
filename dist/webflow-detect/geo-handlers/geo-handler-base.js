"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoHandlerBase = void 0;
class GeoHandlerBase {
    constructor(token = null) {
        this.token = token;
    }
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
    // Retrieve user info from a service
    // then normalize it
    async getInfoAsync() {
    }
    ;
}
exports.GeoHandlerBase = GeoHandlerBase;
//# sourceMappingURL=geo-handler-base.js.map