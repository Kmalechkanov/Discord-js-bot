const Discord = require('discord.js')
const client = new Discord.Client()

const channelsID = {};

class tictactoe {
    constructor() {
        this.table = ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
        this.turn = 0;
        this.tutorial = `\`\`\`7 |8 |9 \n--+--+--\n4 |5 |6 \n--+--+--\n1 |2 |3 \`\`\``;
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

function processCommand(rm) {
    let originalMessage = rm;
    let fullCommand = rm.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    //debug
    //console.log("Command received: " + primaryCommand) 
    //console.log("Arguments: " + arguments) 
    let argLength = arguments.length;

    if (primaryCommand == "help" && argLength === 0) {
        rm.channel.send(`\`\`\`**Commands**\n!test {arg}\n!test2 {arg} {arg}\n!picture (return your picture [soon with args])\n!t help (tictactoe)\n**Credits Kaloyan Malechkanov** \`\`\``);
    }

    else if (primaryCommand == "picture" || primaryCommand == "pic" ) {
        if(argLength === 0)
        {
            rm.channel.send(rm.author.avatarURL);
        }
        else if (argLength === 0) {
            rm.channel.send(arguments[0].avatarURL);
        }
    }

    else if (primaryCommand == "test" && argLength === 1) {
        console.log(arguments[0] + " debug");
        rm.channel.send(arguments[0]);
    }

    else if (primaryCommand == "test2" && argLength === 2) {
        //multiplyCommand(arguments, receivedMessage)
        rm.channel.send(arguments[0] + "-" + arguments[1]);
    }

    else if (primaryCommand == "ttt" || primaryCommand == "t") {
        if (!channelsID.hasOwnProperty(rm.channel.id)) {
            channelsID[rm.channel.id] = new tictactoe();
        }

        console.log(channelsID);

        if (argLength === 1 && arguments[0] === 'new') {
            channelsID[rm.channel.id].reset();
            rm.channel.send(channelsID[rm.channel.id].drawTable());
        }
        else if (argLength === 1 && arguments[0] === 'draw') {
            rm.channel.send(channelsID[rm.channel.id].drawTable());
        }
        else if (argLength === 1 && arguments[0] === 'tutorial') {
            rm.channel.send(channelsID[rm.channel.id].tutorial);
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

client.login(process.env.YOUR_TOKEN);
