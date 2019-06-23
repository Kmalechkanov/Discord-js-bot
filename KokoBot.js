const Discord = require('discord.js')
const client = new Discord.Client()

let tictactoe = {
    table: ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],

    turn: 0,

    tutorial: `\`\`\`1 |2 |3` +
        `\n--+--+--\n4 |5 |6` +
        `\n--+--+--\n7 |8 |9 \`\`\``,

    checkWin: function () {
        if (this.table[0] != '  ' && this.table[0] == this.table[1] && this.table[1] == this.table[2]
            || this.table[3] != '  ' && this.table[3] == this.table[4] && this.table[4] == this.table[5]
            || this.table[6] != '  ' && this.table[6] == this.table[7] && this.table[7] == this.table[8]
            || this.table[0] != '  ' && this.table[0] == this.table[3] && this.table[3] == this.table[6]
            || this.table[1] != '  ' && this.table[1] == this.table[4] && this.table[4] == this.table[7]
            || this.table[2] != '  ' && this.table[2] == this.table[5] && this.table[5] == this.table[8]
            || this.table[0] != '  ' && this.table[0] == this.table[4] && this.table[4] == this.table[8]
            || this.table[2] != '  ' && this.table[2] == this.table[4] && this.able[4] == this.table[6]) {
            return true;
        }
        return false;
    },

    reset: function () {
        this.table = ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
        this.turn = 0;
    },

    drawTable: function () {
        //console.log(this.table[0] + "im in")
        let drawTable = `\`\`\`${this.table[0]}|${this.table[1]}|${this.table[2]}` +
            `\n--+--+--\n${this.table[3]}|${this.table[4]}|${this.table[5]}` +
            `\n--+--+--\n${this.table[6]}|${this.table[7]}|${this.table[8]}\`\`\``
        return drawTable;
    },

    playerTurn: function () {
        if (this.turn % 2 == 0) {
            return '><';
        }
        return '<>';
    },

    choose: function (number) {
        let fixedNumb = number - 1;
        if (this.table[fixedNumb] != '  ') {
            return '```This box is already choosed!```';
        }
        this.table[fixedNumb] = this.playerTurn();
        this.turn++;
        return this.drawTable();        
    }
}

function processCommand(receivedMessage) {
    let originalMessage = receivedMessage;
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    //debug
    //console.log("Command received: " + primaryCommand) 
    //console.log("Arguments: " + arguments) 
    let argLength = arguments.length;


    if (primaryCommand == "test" && argLength === 1) {
        console.log(arguments[0] + " debug");
        receivedMessage.channel.send(arguments[0]);
    }

    else if (primaryCommand == "test2" && argLength === 2) {
        //multiplyCommand(arguments, receivedMessage)
        receivedMessage.channel.send(arguments[0] + "-" + arguments[1]);
    }

    else if (primaryCommand == "ttt") {

        if (argLength === 1 && arguments[0] === 'new') {
            tictactoe.reset();
            receivedMessage.channel.send(tictactoe.drawTable());
        }
        else if (argLength === 1 && arguments[0] === 'draw') {
            receivedMessage.channel.send(tictactoe.drawTable());
        }
        else if (argLength === 1 && (Number(arguments[0]) > 0 && Number(arguments[0]) <= 9)) {
            receivedMessage.channel.send(tictactoe.choose(Number(arguments[0])));

            if (tictactoe.checkWin()) {
                tictactoe.turn--;
                let winner = tictactoe.playerTurn();
                receivedMessage.channel.send(`\`\`\`${winner} won!\`\`\``);
                tictactoe.reset();
            }
        }
    }
}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
});

client.on('message', (message) => {
    if (message.author == client.user) {
        return;
    }
    if (!preffixChecker(message.content)) {
        let currentDate = new Date();
        console.log(currentDate.getHours() + '-' + currentDate.getMinutes() + ' - Wrong Suffix')
        return;
    }

    processCommand(message);

    //message.channel.send(message.content);
});

function preffixChecker(message) {
    if (message.startsWith('!')) {
        return true;
    }
    return false;
}

// https://discordapp.com/developers/applications/
bot_secret_token = "NDczNTE5NjkyMDM2OTY0MzYz.XQ-J9Q.P-jLh-bjW5Blyn6OpdJqJmS5yTo"

client.login(bot_secret_token)

