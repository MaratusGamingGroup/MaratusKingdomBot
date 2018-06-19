const Discord = require('discord.js');

module.exports.run = async (client, message, args) => 
    {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!rUser) return message.channel.send('Could not find user.');
                let rreason = args.join(" ").slice(22);

                    let reportEmbed = new Discord.RichEmbed()
                       
                        .setDescription('Reports')
                        .setColor('#15f153')
                        .addField("Reported User", `${rUser} with ID:  ${rUser.id}`)
                        .addField('Reported By', `${message.author} with ID: ${message.author.id}`)
                        .addField('Channel', message.channel)
                        .addField('Time', message.createdAt)
                        .addField('Reason', rreason);
                        
                        let admin = message.guild.roles.find("name", "Kingdom Royals");                  
                            let reportschannel = message.guild.channels.find(`name`, 'reports');
                                if(!reportschannel) return message.channel.send('Could not find reports channel.');
                                if(!admin) return message.channel.send('Could not find the Role Kingdom Royals.');
                                    message.delete().catch(O_o=>{});
                                        reportschannel.send(reportEmbed);
                                          message.send(`${admin}`,"A report has been made against a member in the kingdom");


    };    
             

module.exports.help = 
{
    name:"report"
}