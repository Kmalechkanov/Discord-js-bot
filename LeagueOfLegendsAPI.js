const fetch = require("node-fetch");
//const tokenJson = require('./token.json').token;
//const apiLinksJson = require('./apiLinks.json');

class LeagueAPI {

    static getSummonerId(summoner) {
        let url = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${tokenJson}`;

        fetch(url)
            .then((response) => response.json())
            .then((obj) => {
                console.log(obj.id);
                return obj.id;
            });
    }

    static async getAccountId(summoner) {
        let url = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${tokenJson}`;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    static getCurrentGameBySummonerId(summonerId) {
        let url = `https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerId}?api_key=${tokenJson}`;

        fetch(url)
            .then((response) => response.json)
            .then((obj) => {
                console.log(obj)
                console.log('im in');
            });
    }

    static getCurrentGameBySummonerName(summoner) {
        let url1 = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${tokenJson}`;

        fetch(url1)
            .then((response) => response.json())
            .then((obj) => {
                console.log(obj.id);
                let url2 = `https://eun1.api.riotgames.com//lol/spectator/v4/active-games/by-summoner/${obj.id}?api_key=${tokenJson}`;
                fetch(url2)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                    });
            });
    }

    static getSummonerChampionsBySummonerId(summoner) {
        let url1 = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${tokenJson}`;

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