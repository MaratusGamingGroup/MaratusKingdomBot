const Discord = require('discord.js');
const prefix = require('../storage/config.json')
module.exports.run = async (client, message, args) => 
    {

                        let HelpEmbed = new Discord.RichEmbed()
                        .setTitle('Help Menu')
                        .setColor('#15f153')
                        .addField("The is your help menu based on your roles.", `\u200b`)
                        .addField(`Welcome ${message.author.username} here are your commands`, `\u200b`)
                        .addField( prefix,`\u200b`, true)
                        .addField(`Command`,`\u200b`, true)
                        .addField(`Usage`,`\u200b`, true)
                      
                        

                        
  
                        message.delete().catch(O_o=>{});
                        message.channel.send(HelpEmbed).then(m => m.delete(25000));
    }           

module.exports.help = 
{
    name:"help"
}