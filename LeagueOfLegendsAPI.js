const fetch = require("node-fetch");
const token = process.env.YOUR_TOKEN_API;
//const tokenJson = require('./token.json').token;
//const apiLinksJson = require('./apiLinks.json');

regionsHandler = (region) => {
    switch (region.toUpperCase()) {
        case 'BR':
        return 'br1';
        case 'EUNE':
        return 'eun1';
        case 'EUW':
        return 'euw1';
        case 'JP':
        return 'jp1';
        case 'KR':
        return 'kr';
        case 'LAN':
        return 'la1';
        case 'LAS':
        return 'la2';
        case 'NA':
        return 'na1';
        case 'OCE':
        return 'oc1';
        case 'TR':
        return 'tr1';
        case 'RU':
        return 'ru';
        case 'PBE':
        return 'pbe1';
    }
}

class LeagueAPI {
    
    static async getSummoner(summoner, region) {
        let url = `https://${regionsHandler(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${token}`;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    //TODO
    static getCurrentGameBySummonerId(summonerId, region) {
        let url = `https://${regionsHandler(region)}.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerId}?api_key=${token}`;

        fetch(url)
            .then((response) => response.json)
            .then((obj) => {
                console.log(obj)
                console.log('im in');
            });
    }
    //TODO
    static getCurrentGameBySummonerName(summoner, region) {
        let url1 = `https://${regionsHandler(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${token}`;

        fetch(url1)
            .then((response) => response.json())
            .then((obj) => {
                console.log(obj.id);
                let url2 = `https://${regionsHandler(region)}.api.riotgames.com//lol/spectator/v4/active-games/by-summoner/${obj.id}?api_key=${token}`;
                fetch(url2)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                    });
            });
    }
    //TODO
    static getSummonerChampionsBySummonerId(summoner, region) {
        let url1 = `https://${regionsHandler(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${token}`;

        fetch(url1)
            .then((response) => response.json())
            .then((obj) => {
                for (let ob in obj) {
                    //if (ob.championLevel === 6) {
                    console.log(ob);
                    // }
                }

            })
    }

}

module.exports = LeagueAPI;