const Discord = require('discord.js');
const { red, cyanBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "reset",
    description: "blacklist command",

    async run(client, message, args) {
        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;
        const path = `commands/database/guilds/${guildID}.json`;
        const path2 = `commands/database/backup_guilds/${guildID}.json`;
        /**
        * Reset Guild Database
        */
        function ResetData() {
            try {
                fs.unlinkSync(path)
                if (fs.existsSync(path2)) { 
                    fs.unlinkSync(path2)

                    console.log(cyanBright('Successfully Removed File(s): ' + path + '\nPath 2: ' + path2 + '\n'))
                    const success = new Discord.MessageEmbed()
                    .setDescription(`Successfully Removed Guild from All Databse.`)
                    .setColor(0x36393E)
                return message.channel.send(success)
                } else {
                    console.log(cyanBright('Successfully Removed File(s): ' + path))
                    const succ = new Discord.MessageEmbed()
                    .setDescription(`Successfully Removed Guild from All Databse.`)
                    .setColor(0x36393E)
                return message.channel.send(succ)
                }

            } catch (err) {
                console.error(red('Unable to remove file ' + path))
                const erro2 = new Discord.MessageEmbed()
                .setDescription(`Unable Remove Guild from Databse | Not in Database`)
                .setColor(0x36393E)
            return message.channel.send(erro2)
            }
        }

        fs.access(path, fs.F_OK, (err) => {
            if (err) {

                console.error(red('File: ' + path + ' does not exist'))

                const error = new Discord.MessageEmbed()
                    .setDescription(`Error: Guild is not in the database.`)
                    .setColor(0x36393E)
                message.channel.send(error)

            } else {
                if (message.author.id === Owner) {



                    const respond = new Discord.MessageEmbed()
                        .setDescription(`Are you sure you want to reset your database? \`yes\` | \`no\`\n\nA back-up of your database will not be retrievable.
                    `)
                        .setColor(0x36393E)

                    const filter = m => m.author.id == Owner;
                    message.channel.send(respond).then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                            .then(collected => {
                                message = collected.first()
                                if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                                    ResetData();
                                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                                    const cancelled = new Discord.MessageEmbed()
                                        .setDescription(`Reset process was cancelled.`)
                                        .setColor(0x36393E)
                                    return message.channel.send(cancelled)
                                }
                            }).catch(() => {
                                console.log(red('Time Ran Out'));
                                const cancelled = new Discord.MessageEmbed()
                                    .setDescription(`Reset process was cancelled.`)
                                    .setColor(0x36393E)
                                message.channel.send(cancelled)
                            });
                    })

                } else {
                    const Unauthorised = new Discord.MessageEmbed()
                        .setDescription(`You are not authorised to use this command | Owner only!`)
                        .setColor(0x36393E)
                    message.channel.send(Unauthorised)
                }


            }

        })

    }

}