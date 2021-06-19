const Discord = require('discord.js');
const { red,greenBright, cyanBright } = require('chalk');
const fs = require("fs");
const pather = require("path");
const mv = require("mv");

module.exports = {
    name: "set",
    description: "blacklist command",

    async run(client, message, args) {
        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `commands/database/guilds/${guildID}.json`;
        const path2 = `commands/database/backup_guilds/${guildID}.json`;

        if (fs.existsSync(path2)) {
            fs.access(path2, fs.F_OK, (err) => {
                if (err) {

                    if (message.author.id === Owner) {
                        //...
                    } else {
                        const Unauthorised = new Discord.MessageEmbed()
                            .setDescription(`You are not authorised to use this command | Owner only!`)
                            .setColor(0x36393E)
                        message.channel.send(Unauthorised)
                    }

                } else {
                    /**
                    * Moves File from backup to normal Database
                    */
                    function BackUpRetrieve() {

                        const guildID = message.guild.id

                        const currentPath = pather.join(__dirname, "../database/backup_guilds/", `${guildID}.json`);
                        const destinationPath = pather.join(__dirname, "../database/guilds/", `${guildID}.json`);

                        mv(currentPath, destinationPath, function (err) {
                            if (err) {
                                console.log(red('Unable to move file path: ' + currentPath + ' to Guild Database\n\n' + err))
                            } else {
                                console.log(greenBright("Successfully moved the file to Guild Database\n"));
                                const Moved = new Discord.MessageEmbed()
                                    .setDescription(`Successfully transferred data to Guild Database`)
                                    .setColor(0x36393E)
                                message.channel.send(Moved)
                            }
                        });
                    }

                    console.error(greenBright('File: ' + path2 + ' already exists'))

                    const respond = new Discord.MessageEmbed()
                        .setDescription(`Database found in Backup. To retrieve old data say \`yes\``)
                        .setColor(0x36393E)

                    const filter = m => m.author.id == Owner;
                    message.channel.send(respond).then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                            .then(collected => {
                                message = collected.first()
                                if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                                    BackUpRetrieve();
                                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                                    const cancelled = new Discord.MessageEmbed()
                                        .setDescription(`Back Up process was cancelled.`)
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

                }
            })
        } else {
            fs.access(path, fs.F_OK, (err) => {
                if (err) {

                    if (message.author.id === Owner) {
                        /**
                         * Set Guild Database
                         */
                        function SetGuildDB(ID, Name) {
                            ID = message.guild.id;
                            Name = message.guild.name;

                            const data = {
                                GuildID: ID,
                                GuildName: Name,
                                Data: {
                                    Owner: message.guild.owner.user.tag,
                                    OwnerID: message.guild.ownerID,
                                    WhiteListedUserIDs: [],
                                    WhiteListedUsers: [],
                                    BlackListedUserIDs: [],
                                    BlackListedUsers: [],
                                    TrustListedUserIDs: [],
                                    TrustListedUsers: [],
                                }
                            }

                            const content = JSON.stringify(data, null, 2)

                            fs.writeFile(`./commands/database/guilds/${ID}.json`, content, 'utf8', function (err) {
                                if (err) {
                                    return console.error(red('Unable to make the file'))
                                } else {
                                    console.log(cyanBright('Successfully created data for guild: ' + ID))
                                    const Successful = new Discord.MessageEmbed()
                                        .setDescription(`Successfully created **${message.guild.name}** Database.`)
                                        .setColor(0x36393E)
                                    message.channel.send(Successful)
                                }
                            });

                        }
                        SetGuildDB();
                    } else {
                        const Unauthorised = new Discord.MessageEmbed()
                            .setDescription(`You are not authorised to use this command | Owner only!`)
                            .setColor(0x36393E)
                        message.channel.send(Unauthorised)
                    }

                } else {
                    console.error(red('File: ' + path + ' already exists'))

                    const err = new Discord.MessageEmbed()
                        .setDescription(`Error: Guild Already in Database.`)
                        .setColor(0x36393E)
                    message.channel.send(err)

                }
            })
        }

    }
}