const clientconfig = require('./storage/config.json');
const tokenfile = require('./storage/token.json');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) =>{
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`)
        client.commands.set(props.help.name, props);
    });
});
client.on('ready', async () =>
    {
        console.log(`${client.user.username} is online!`);
        client.user.setActivity('Monitoring the Community', {type:'WATCHING'});
    });
client.on('message', async message => {
if(message.author.client) return;
if(message.channel.type === 'dm') return;

let prefix = clientconfig.prefix;
let messageArray = message.content.split(' ');
let cmd = messageArray[0];
let args = messageArray.slice(1);

let commandfile = client.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(client,message,args);            
});

client.login(tokenfile.token);