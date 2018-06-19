const clientconfig = require('./storage/config.json');
const tokenfile = require('./storage/token.json');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({disableEveryone: true});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);// Ensures that it is reading the commands dir
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
            if(jsfile.length <= 0) {
                console.log("Couldn't find commands.");
            return;
    }
    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`)// Acknowleging the files being loaded
        client.commands.set(props.help.name, props);
    });
});
client.on('ready', async () =>
    {
        console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
        client.user.setActivity('The Community and Maintaing Order', {type:'WATCHING'});
    });


client.on('message', async message => 
{
    if(message.author.bot) return; 
    if(message.channel.type === 'dm') return; 

    let prefixes = clientconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefixes.length));
        
    if(commandfile) commandfile.run(client, message, args);            
});

client.on('guildMemberAdd', member => 
{
    let memberlog = member.guild.channels.find('name', "member-log");
    if(!memberlog) return channel.send("No such channel");
    memberlog.send(`${member} Joined the server!`)
});
client.on('guildMemberRemove', member => {
    let memberlog = member.guild.channels.find('name', "member-log");
    if(!memberlog) return channel.send("No such channel");
    memberlog.send(`${member} Left the server!`);
    
});

client.login(tokenfile.token);