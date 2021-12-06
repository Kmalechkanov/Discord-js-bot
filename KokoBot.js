const { Client, Intents } = require('discord.js');
const myIntents = new Intents();
myIntents.add(
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_INTEGRATIONS,
	Intents.FLAGS.GUILD_WEBHOOKS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGE_TYPING,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_TYPING
);

const client = new Client({ intents: myIntents });

const fetch = require("node-fetch");
const LeagueApi = require('./LeagueOfLegendsAPI.js');

const channelsID = {};

class Tictactoe {
	constructor() {
		this.table = ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
		this.turn = 0;
	};

	tutorial() {
		return `\`\`\`7 |8 |9 \n--+--+--\n4 |5 |6 \n--+--+--\n1 |2 |3 \`\`\``;
	};

	checkWin() {
		if (this.table[0] != '  ' && this.table[0] == this.table[1] && this.table[1] == this.table[2]
			|| this.table[3] != '  ' && this.table[3] == this.table[4] && this.table[4] == this.table[5]
			|| this.table[6] != '  ' && this.table[6] == this.table[7] && this.table[7] == this.table[8]
			|| this.table[0] != '  ' && this.table[0] == this.table[3] && this.table[3] == this.table[6]
			|| this.table[1] != '  ' && this.table[1] == this.table[4] && this.table[4] == this.table[7]
			|| this.table[2] != '  ' && this.table[2] == this.table[5] && this.table[5] == this.table[8]
			|| this.table[0] != '  ' && this.table[0] == this.table[4] && this.table[4] == this.table[8]
			|| this.table[2] != '  ' && this.table[2] == this.table[4] && this.table[4] == this.table[6]) {
			return true;
		}
		return false;
	};

	reset() {
		this.table = ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
		this.turn = 0;
	};

	drawTable() {
		let drawTable = `\`\`\`${this.table[6]}|${this.table[7]}|${this.table[8]}` +
			`\n--+--+--\n${this.table[3]}|${this.table[4]}|${this.table[5]}` +
			`\n--+--+--\n${this.table[0]}|${this.table[1]}|${this.table[2]}\`\`\``
		return drawTable;
	};

	playerTurn() {
		if (this.turn % 2 == 0) {
			return '><';
		}
		return '<>';
	};

	choose(number) {
		let fixedNumb = number - 1;
		if (this.table[fixedNumb] != '  ') {
			return '```This box is already choosed!```';
		}
		this.table[fixedNumb] = this.playerTurn();
		this.turn++;
		return this.drawTable();
	}
}

async function processCommand(rm) {
	let originalMessage = rm;
	let fullCommand = rm.content.substr(1);
	let splitCommand = fullCommand.split(" ");
	let primaryCommand = splitCommand[0];
	let arguments = splitCommand.slice(1);

	//debug
	//console.log("Command received: " + primaryCommand) 
	//console.log("Arguments: " + arguments) 
	let argLength = arguments.length;

	if (primaryCommand === "help" && argLength === 0) {
		let helpMessage = '\`\`\`';
		helpMessage += '**Commands**\n';
		helpMessage += '~test {arg}\n';
		helpMessage += '~test2 {arg} {arg}\n';
		helpMessage += '~picture (return your picture [soon with args])\n';
		helpMessage += '~t help (tictactoe)\n';
		helpMessage += '~lol accountid {summonerName} {region} (returns account id by given summoner name)\n';
		helpMessage += '~lol seen {summonerName} {region} (returns last time played)\n';
		helpMessage += '~lol id {summonerName} {region} (returns summoner id by given summoner name)\n';
		helpMessage += '~lol level {summonerName} {region} (returns current level of summoner by given summoner name)\n';
		helpMessage += '**Credits Kaloyan Malechkanov** \`\`\`';

		rm.channel.send(helpMessage);
	}

	else if (primaryCommand === "ghostmc") {
		fetch('https://api.mcsrvstat.us/2/play.ghostmc.eu')
			.then(response => response.json())
			.then(data => {
				if(data.online === false) {
					rm.channel.send("Servera e offline");
					return;
				}

				let playersCount = data.players.online;
				if(playersCount == 0) {
					rm.channel.send("0 players online.");
					return;
				}
				let players = data.players.list.join(', ');
				rm.channel.send("``" + playersCount + " players online:\n" + players + "``");
			});
	}

	else if (primaryCommand === "smp") {
		fetch('https://api.mcsrvstat.us/2/162.55.95.122:25708')
			.then(response => response.json())
			.then(data => {
				let playersCount = data.players.online;
				  if(playersCount == 0) {
					rm.channel.send("0 players online.");
					return;
				}
				let players = data.players.list.join(', ');
				rm.channel.send("``" + playersCount + " players online:\n" + players + "``");
			});
	}

	else if (primaryCommand === "picture" || primaryCommand === "pic") {
		if (argLength === 0) {
			rm.channel.send(rm.author.avatarURL);
		}
		else if (argLength === 1) {
			let taggedUser = rm.mentions.members.first();
			rm.channel.send(taggedUser.avatarURL);
		}
	}

	else if (primaryCommand === "test" && argLength === 1) {
		rm.channel.send(arguments[0]);
	}

	else if (primaryCommand === "test2" && argLength === 2) {
		rm.channel.send(arguments[0] + "-" + arguments[1]);
	}

	else if (primaryCommand === "ttt" || primaryCommand === "t") {
		if (!channelsID.hasOwnProperty(rm.channel.id)) {
			channelsID[rm.channel.id] = new Tictactoe();
		}

		if (argLength === 1 && arguments[0] === 'new') {
			channelsID[rm.channel.id].reset();
			rm.channel.send(channelsID[rm.channel.id].drawTable());
		}
		else if (argLength === 1 && arguments[0] === 'draw') {
			rm.channel.send(channelsID[rm.channel.id].drawTable());
		}
		else if (argLength === 1 && arguments[0] === 'tutorial') {
			rm.channel.send(Tictactoe.tutorial());
		}
		else if (argLength === 1 && (Number(arguments[0]) > 0 && Number(arguments[0]) <= 9)) {
			rm.channel.send(channelsID[rm.channel.id].choose(Number(arguments[0])));

			if (channelsID[rm.channel.id].checkWin()) {
				channelsID[rm.channel.id].turn--;
				let winner = channelsID[rm.channel.id].playerTurn();
				rm.channel.send(`\`\`\`${winner} won!\`\`\``);
				channelsID[rm.channel.id].reset();
			}
		}
	}

	else if (primaryCommand === 'lol' && arguments[1] != undefined && arguments[2] != undefined) {
		if (arguments[0] === 'accountid') {
			LeagueApi.getSummoner(arguments[1], arguments[2]).then(data => {
				rm.channel.send(`**${arguments[1]} ${arguments[0]} - __${data.accountId}__ - ${arguments[2]}**`);
			})
		}
		else if (arguments[0] === 'id') {
			LeagueApi.getSummoner(arguments[1], arguments[2]).then(data => {
				rm.channel.send(`**${arguments[1]} ${arguments[0]} - __${data.id}__ - ${arguments[2]}**`);
			})
		}
		else if (arguments[0] === 'level') {
			LeagueApi.getSummoner(arguments[1], arguments[2]).then(data => {
				rm.channel.send(`**${arguments[1]} ${arguments[0]} - __${data.summonerLevel}__ - ${arguments[2]}**`);
			})
		}
		else if (arguments[0] === 'seen') {
			LeagueApi.getSummoner(arguments[1], arguments[2]).then(data => {
				var date = new Date(data.revisionDate);
				rm.channel.send(`**${arguments[1]} ${arguments[0]} - __${date.toString()}__**`);
			})
		}
	}
}

client.on('ready', () => {
	console.log('Connected as ' + client.user.tag)
});

client.on('message', (message) => {
	if (message.author == client.user) {
		return;
	}
	if (!preffixChecker(message.content)) {
		let currentDate = new Date();
		console.log(currentDate.getHours() + '-' + currentDate.getMinutes() + ' - Wrong Suffix! - ' + message.channel + ' - ' + message.author + ' - ' + message.content);
		return;
	}

	processCommand(message);

	//message.channel.send(message.content);
});

function preffixChecker(message) {
	if (message.startsWith('~')) {
		return true;
	}
	return false;
}

// https://discordapp.com/developers/applications/

client.login(process.env.YOUR_TOKEN);
