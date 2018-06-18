const Discord = require('discord.js');
module.exports.run = async (client,message,args) => 
 {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("no permissions");
    if(!args[0]) return message.channel.send ('No Arguments');
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Purged ${args[0]} messages.`).then(msg => msg.delete(5000));
    }) ;
 };


module.exports.help = 
{
    name:"purge"
}