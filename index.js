const request = require('request-promise');

module.exports = class NotCoin {
    constructor(url) {
        this.baseUrl = 'https://clicker-api.joincommunity.xyz';
        this.eventBaseUrl = 'https://plausible.joincommunity.xyz';
        this.url = url;

        this.webAppData = null;
        this.webAppSession = null;
        this.profile = null;
    }

    event() {
        return request({
            uri: `${this.eventBaseUrl}/api/event`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                d: 'clicker.joincommunity.xyz',
                n: 'pageview',
                r: null,
                u: this.url
            },
            json: true,
            method: 'POST'
        });
    }

    async auth() {
        const urlQueryString = this.url.split('#')[1];
        const urlQuery = JSON.parse('{"' + decodeURI(urlQueryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

        this.webAppData = decodeURIComponent(urlQuery.tgWebAppData);

        const webAppSessionRequest = await request({
            uri: `${this.baseUrl}/auth/webapp-session`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                webAppData: this.webAppData
            },
            json: true,
            method: 'POST'
        });

        if(webAppSessionRequest.ok !== true) {
            console.log(webAppSessionRequest);

            return;
        }

        this.webAppSession = webAppSessionRequest.data;

        await this.updateProfile();
    }

    async updateProfile() {
        const profileRequest = await request({
            uri: `${this.baseUrl}/clicker/profile`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.webAppSession.accessToken}`
            },
            body: {},
            json: true,
            method: 'GET'
        });

        if(profileRequest.ok !== true) {
            console.log(profileRequest);
            return;
        }

        this.profile = profileRequest.data[0];
    }

    async click(clickCount) {
        const clickRequest = await request({
            uri: `${this.baseUrl}/clicker/core/click`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.webAppSession.accessToken}`
            },
            body: {
                count: clickCount,
                hash: this.rand(1, 100),
                webAppData: this.webAppData
            },
            json: true,
            method: 'POST'
        });

        const clickProfile = clickRequest.data[0];

        this.profile.availableCoins = clickProfile.availableCoins;
        this.profile.balanceCoins = clickProfile.balanceCoins;
    }

    getProfile() {
        return this.profile;
    }

    rand(min, max) {
        return Math.round(
            min - 0.5 + Math.random() * (max - min + 1)
        );
    }
};