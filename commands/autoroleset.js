const Discord = require('discord.js');
const prefix = require('../storage/config.json')
const db = require('quick.db')
module.exports.run = async (client, message, args) => 
    {

                        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This command requires `Administrator` Role')
                        if (!args.join(" ")) return message.channel.send('Please enter arguments. `setAutoRole <roleName>`')
                        db.updateText(`autoRole_${message.guild.id}`, args.join(" ").trim()).then(i => {
                            message.channel.send('Successfully changed auto-role to: ` ' + i.text + '`');
                        })
    }           

module.exports.help = 
{
    name:"help"
}