module.exports = class Credencial {

    constructor(pMarketplace, pSellerId, pAccessToken, pRefreshToken, pExpireIn, pUserId, pShopId, pExpireTime, pAppId, pAppKey, pRedirectUrl){
        this.marketplace = pMarketplace;
        this.seller_id = pSellerId;
        this.access_token = pAccessToken;
        this.refresh_token = pRefreshToken;
        this.expire_in = pExpireIn;
        this.user_id = pUserId;
        this.shop_id = pShopId;
        this.expire_time = pExpireTime;
        this.app_id = pAppId;
        this.app_key = pAppKey;
        this.redirect_url = pRedirectUrl;
    }
}