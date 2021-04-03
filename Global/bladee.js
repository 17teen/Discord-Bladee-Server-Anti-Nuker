/**
 * Bladee Anti Nuke: Global Mode
 * https://github.com/17teen
 * Discord: 7teen#3868
 */

// API & Packages
const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: "everyone" }, { ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
const fs = require("fs");
const path = require("path");
const mv = require('mv');
// Settings
const settings = require('./Commands/settings.json');
const token = settings.token;
const prefix = settings.prefix;
const author = settings.author;
const Founder = settings.founder;
const FounderID = settings.founderId;
// Global Blacklisting
const GBlacklisted = require('./Commands/Database/Global Blacklist/blacklist.json');
// Commando Structure
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, "Commands")).filter(file => file.endsWith(".js"));
const commandFilesBlacklist = fs.readdirSync(path.join(__dirname, "Commands/Blacklist")).filter(file => file.endsWith(".js"));
const commandFilesTrust = fs.readdirSync(path.join(__dirname, "Commands/Trust")).filter(file => file.endsWith(".js"));
const commandFilesWhitelist = fs.readdirSync(path.join(__dirname, "Commands/Whitelist")).filter(file => file.endsWith(".js"));
const commandFilesMod = fs.readdirSync(path.join(__dirname, "Commands/Mod")).filter(file => file.endsWith(".js"));
const commandFilesMenu = fs.readdirSync(path.join(__dirname, "Commands/Menu")).filter(file => file.endsWith(".js"));
const commandFilesDevBlacklisting = fs.readdirSync(path.join(__dirname, "Commands/DevOnly/Blacklisting")).filter(file => file.endsWith(".js"));
const commandFilesDevAddorRemove = fs.readdirSync(path.join(__dirname, "Commands/DevOnly/Add & Remove")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, "Commands", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesBlacklist) {
    const command = require(path.join(__dirname, "Commands/Blacklist", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesTrust) {
    const command = require(path.join(__dirname, "Commands/Trust", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesWhitelist) {
    const command = require(path.join(__dirname, "Commands/Whitelist", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesMod) {
    const command = require(path.join(__dirname, "Commands/Mod", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesMenu) {
    const command = require(path.join(__dirname, "Commands/Menu", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesDevBlacklisting) {
    const command = require(path.join(__dirname, "Commands/DevOnly/Blacklisting", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesDevAddorRemove) {
    const command = require(path.join(__dirname, "Commands/DevOnly/Add & Remove", `${file}`));
    client.commands.set(command.name, command);
}

// Event Managing
const events = require("events");
const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(300); // Listeners
// Customizations
const { red, green, magenta, greenBright, magentaBright, yellowBright } = require('chalk');
// Title
const Title = String.raw`



                            ██████╗ ██╗      █████╗ ██████╗ ███████╗███████╗   
                            ██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝██╔════╝   
                            ██████╔╝██║     ███████║██║  ██║█████╗  █████╗     
                            ██╔══██╗██║     ██╔══██║██║  ██║██╔══╝  ██╔══╝     
                            ██████╔╝███████╗██║  ██║██████╔╝███████╗███████╗██╗
                            ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝
                                                   
                                  Anti Nuke | 7teen | Author: ${author}

`;

console.log(magenta(Title));


client.on("ready", () => {
    // UserCount
    const userCount = client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c, 0);
    // Login
    console.log(magentaBright('              ════════════════════════════════════════════════════════════════════════════════'));
    console.log(magentaBright(`                                           Guardian: ${client.user.username}#${client.user.discriminator} `));
    console.log(magentaBright('              ════════════════════════════════════════════════════════════════════════════════'));
    // Status
    // Status Title Options
    // Status Activity Options
    let ActiOptions = ["STREAMING", "PLAYING", "LISTENING", "WATCHING"];
    setInterval(function () {
        // Randomise
        let randomsieActivity = ActiOptions[Math.floor(Math.random() * ActiOptions.length)];
        // Activity
        client.user.setActivity({
            name: `${userCount} users protected.`,
            type: randomsieActivity,
            url: "https://www.twitch.tv/ayoohennio"
        });

    }, 10000); // Change 10 Every Second(s)
});

// Commands
client.on("message", message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    // Logs Command
    if (message.content.startsWith(prefix)) {

        const d = new Date();
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

        console.log(green(`[COMMAND RAN] : ${message.content} | ${message.author.tag} | [SERVER] : ${message.guild.name} | [TIME] : ${date}`))

        // Args
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args);

        } catch (error) {
            console.error(error);
        }
    }


})

client.on("guildCreate", async guild => {
    // This event triggers when the bot joins a guild.
    console.log(``);
    console.log(greenBright(`[GUILD JOINED] ${guild.name} | [ID] ${guild.id} | [ (+) MEMBERCOUNT: ${guild.memberCount}]`));
    console.log(``);

    const path = `Commands/Database/Backup Guilds/${guild.id}.json`;

    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.error(greenBright('File: ' + path + ' does not exist so it is being created'))

            function GuildData(ID, Name) {
                ID = guild.id;
                Name = guild.name;

                const data = {
                    guildID: ID,
                    guildName: Name,
                    Data: {
                        Owner: guild.owner.user.tag,
                        OwnerID: guild.ownerID,
                        WhiteListedUserIDs: [],
                        WhiteListedUsers: [],
                        BlackListedUserIDs: [],
                        BlackListedUsers: [],
                        TrustListedUserIDs: [],
                        TrustListedUsers: [],
                    }
                }

                const content = JSON.stringify(data, null, 2)

                fs.writeFile(`./Commands/Database/Guilds/${ID}.json`, content, 'utf8', function (err) {
                    if (err) {
                        return console.error(err)
                    }
                });
            }
            GuildData();
        } else {
            return console.log(yellowBright('This guild has a database in the back up database | Must refer to it to get it back'));
        }
    })

    return console.log(greenBright('Invited to an authorised guild. | Data Created'));
});

// When Bot leaves
client.on("guildDelete", guild => {
    console.log(``)
    // this event triggers when the bot is removed from a guild.
    console.log(red(`[GUILD LEFT] ${guild.name} | [ID] ${guild.id} | [ (-) MEMBERCOUNT: ${guild.memberCount}]`));
    console.log(``)

    /**
     * Moves File to backup
     */
    function BackUp() {

        const guildID = guild.id

        const currentPath = path.join(__dirname, "Commands/Database/Guilds", `${guildID}.json`);
        const destinationPath = path.join(__dirname, "Commands/Database/Backup Guilds", `${guildID}.json`);

        mv(currentPath, destinationPath, function (err) {
            if (err) {
                console.log(red('Unable to move file path: ' + currentPath + ' to Backup Database\n'))
            } else {
                console.log(greenBright("Successfully moved the file to Backup Database\n"));
            }
        });
    }
    BackUp();

});

// Blacklist User from server
client.on('guildMemberAdd', member => {
    const BlacklistedUserID = GBlacklisted.find((u) => u === `${member.id}`);
    const guildID = member.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const BlacklistedMember = Info.Data.BlackListedUserIDs.find((user) => user === `${member.id}`)

    const noAccess = new Discord.MessageEmbed()
        .setTitle('Unauthorised Access To Server: ' + member.guild.name)
        .setDescription(`You've been blacklisted in **${member.guild.name}** and have been denied access of entry.\n
    **Owner:** \`${member.guild.owner.user.tag}\` | <@${member.guild.owner.id}>
    **Member Count:** ${member.guild.memberCount}\n
    *We suggest you DM the owner to be unblacklisted if you wish.*
    `)
        .setTimestamp(Date.now());

    const GnoAccess = new Discord.MessageEmbed()
        .setTitle('Unauthorised Access To Server: ' + member.guild.name)
        .setDescription(`You've been globally blacklisted in our Database hence why you cannot join, **${member.guild.name}** and have been denied access of entry.\n
    **Owner:** \`${member.guild.owner.user.tag}\` | <@${member.guild.owner.id}>
    **Member Count:** ${member.guild.memberCount}\n
    **We suggest you DM the Bot Owner:**\n
    **Bot Owner:** <@${FounderID}> | ${Founder}
    `)
        .setTimestamp(Date.now());

    if (member.id === BlacklistedUserID) { // Global Blacklisted
        member.send(GnoAccess)
        setTimeout(function () {
            member.ban({
                reason: `Blacklisted User`
            })
        }, 2000);
        console.log(red(`Global Unauthorised User: ${member.user.tag} tried joining ${member.guild.name} and was banned.`))
    } else if (member.id === BlacklistedMember) { // Server Blacklist
        member.send(noAccess)
        setTimeout(function () {
            member.ban({
                reason: `Blacklisted User`
            })
        }, 2000);
        console.log(red(`Unauthorised User: ${member.user.tag} tried joining ${member.guild.name} and was banned.`))
    } else {
        return console.log(greenBright(`Authorised User: ${member.user.tag} joined ${member.guild.name}.`));
    }
});

// Fetch Ban
client.on("guildBanAdd", async (guild, user) => {

    const fetchingLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD",
    })

    const fetchingLogsErrors = guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD",
    })

    await guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD",
    }).catch(() => {
        return console.log(red('Unable to log: "guildMemberRemove" event'));
    })

    fetchingLogsErrors.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Ban'));
    })

    const banLog = fetchingLogs.entries.first();

    if (!banLog) {
        return console.log(red(`${user.tag} was banned in ${guild.name} but nothing was registered in the audit log...`));
    }

    const { executor, target, createdAt } = banLog;

    if (target.id === user.id) {
        console.log(greenBright(`${user.tag} got banned in ${guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    }

    /**
     * Checks Whitelisted & Trusted Users Before banning
     */

    const guildID = guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${user.id}`)
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${user.id}`)

    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === guild.owner.id) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else {
        await guild.member(executor).ban({
            reason: `Unauthorised ban.`
        }).catch(() => {
            return console.log(red('Unable to Ban User'));
        }).then(guild.owner.send(`**Unauthorised Ban By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch(err => {
            return
        });
    }

})

// Fetch Kick
client.on("guildMemberRemove", async member => {

    const FetchingLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_KICK",
    })

    const FetchLoggingError = member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_KICK",
    }).catch(() => {
        return console.log(red('Unable to log: "guildMemberRemove" event'));
    })

    FetchLoggingError.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Kick'));
    })

    const kickLog = FetchingLogs.entries.first();

    if (!kickLog) {
        return console.log(red(`${member.user.tag} was kicked in ${member.guild.name} but nothing was registered in the audit log...`));
    }

    const { executor, target, createdAt } = kickLog

    if (target.id === member.id) {
        console.log(greenBright(`${member.user.tag} got kicked in ${member.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return
    }
    /**
     * Checks Whitelisted & Trusted Users Before banning
     */

    const guildID = member.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${member.id}`)
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${member.id}`)

    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === member.guild.owner.id) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else {
        member.guild.members.ban(executor.id, {
            reason: `Unauthorised Kick`
        }).catch(() => {
            return console.log(red('Unable to Ban User'));
        }).then(member.guild.owner.send(`**Unauthorised Kick By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch(err => {
            return console.log(red("ERROR: BAN WAS NOT FULLY EXECUTED"));
        });
    }

});

// Channel Create
client.on("channelCreate", async (channel) => {

    if (!channel.guild) return;

    const FetchingLogs = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
    });

    const FetchingLogsErrors = client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
    });

    await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
    }).catch(() => {
        return console.log(red('Unable to log: "channelCreate" event'));
    })

    FetchingLogsErrors.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Create Channel'));
    })

    const ChannelLog = FetchingLogs.entries.first();

    if (!ChannelLog) {
        return console.log(red(`CHANNEL: ${channel.id} was created.`));
    }

    const { executor, target, createdAt } = ChannelLog;

    if (target.id === channel.id || executor.id !== channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got created, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    } else if (target.id === channel.id || executor.id === channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got created, by OWNER: ${executor.tag} | No Punishment Needed.`));
    }
    /**
     * Checks Whitelisted & Trusted Users Before banning
     */

    const guildID = channel.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${executor.id}`)
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${executor.id}`)

    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === channel.guild.owner.id) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else {
        channel.guild.member(executor.id).ban({
            reason: `Unauthorised Channel Created`
        }).catch(() => {
            return console.log(red('Unable to Ban User'));
        }).then(channel.guild.owner.send(`**Unauthorised Channel Created By:** ${executor.tag} \n**Channel ID:** ${channel.id} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch();
    }
});

// Channel Delete
client.on("channelDelete", async (channel) => {
    if (!channel.guild) return;

    const FetchingLogs = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_DELETE",
    });

    const FetchingLogsErrors = client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
    });

    await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
    }).catch(() => {
        return console.log(red('Unable to log: "channelCreate" event'));
    })

    FetchingLogsErrors.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Create Channel'));
    })

    const ChannelLog = FetchingLogs.entries.first();

    if (!ChannelLog) {
        return console.log(red(`CHANNEL: ${channel.id} was deleted.`));
    }

    const { executor, target, createdAt } = ChannelLog;

    if (target.id === channel.id || executor.id !== channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got deleted, by ${executor.tag}`));
    } else if (target.id === channel.id || executor.id === channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got deleted, by OWNER: ${executor.tag} | No Punishment Needed.`));
    }
    /**
     * Checks Whitelisted & Trusted Users Before banning
     */

    const guildID = channel.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${executor.id}`)
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${executor.id}`)


    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === channel.guild.owner.id) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else {
        channel.guild.member(executor.id).ban({
            reason: `Unauthorised Channel Deleted`
        }).catch(() => {
            return console.log(red('Unable to Ban User'));
        }).then(channel.guild.owner.send(`**Unauthorised Channel Deleted By:** ${executor.tag} \n**Channel ID:** ${channel.id} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch();
    }
});

// Bot Banning
client.on("guildMemberAdd", async (member) => {

    const FetchingLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD",
    });

    const FetchingLogsErrors = member.guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD",
    });

    await member.guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD",
    }).catch(() => {
        return console.log(red('Unable to log: "guildMemberAdd" event'));
    });

    FetchingLogsErrors.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Bot Add'));
    })

    const kickLog = FetchingLogs.entries.first();

    if (!kickLog) {
        return console.log(red(`BOT: ${member.user.tag} was invited in ${member.guild.name} but nothing was registered in the audit log...`));
    }

    const { executor, target, createdAt } = kickLog

    if (target.id === member.id) {
        console.log(greenBright(`BOT: ${member.user.tag} was invited in ${member.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return
    }

    /**
    * Checks Whitelisted & Trusted Users Before banning
    */

    const guildID = member.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${member.id}`)
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${member.id}`)

    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === member.guild.owner.id) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else {
        member.guild.members.ban(executor.id, {
            reason: `Unauthorised Bot Added`
        }).then(member.guild.owner.send(`**Unauthorised Bot Added By:** ${executor.tag} \n**Bot:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`))
            .then(member.guild.members.ban(member.id, {
                reason: "Unauthorised Bot"
            }))
            .catch(() => {
                return console.log(red("ERROR: BAN WAS NOT FULLY EXECUTED"));
            });
    }

});

// Create Role
client.on("roleCreate", async (role) => {
    const FetchingLogs = role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_CREATE",
    });

    role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_CREATE",
    }).catch(() => {
        return console.log(red('Unable to log: "roleCreate" event'));
    })

    FetchingLogs.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Role Create'));
    })

    const roleCreateLogs = (await FetchingLogs).entries.first();

    if (!roleCreateLogs) {
        return console.log(red(`ROLE: ${role.name} was created in ${role.guild.name} but nothing was registered in the audit log...`));
    }

    const { target, executor, createdAt } = roleCreateLogs;

    if (target.id === role.id) {
        console.log(greenBright(`ROLE: ${role.name} was created in ${role.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return
    }

    /**
    * Checks Whitelisted & Trusted Users Before banning
    */

    const guildID = role.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${executor.id}`)
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${executor.id}`)

    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === role.guild.owner.id) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else if (role.name === executor.username) {
        return;
    } else {
        role.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Created`
        }).catch(() => {
            return console.log(red('Unable to Ban User'));
        }).then(role.guild.owner.send(`**Unauthorised Role Created By:** ${executor.tag} \n**Role:** ${role.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`))
    }

});

// Role Update
client.on("roleUpdate", async (oldRole, newRole) => {
    const FetchingLogs = oldRole.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_UPDATE",
    });

    oldRole.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_UPDATE",
    }).catch(() => {
        return console.log(red('Unable to log: "roleUpdate" event'));
    });

    FetchingLogs.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Role Update'));
    })

    const RoleUpdate = (await FetchingLogs).entries.first();

    if (!RoleUpdate) {
        return console.log(red(`ROLE: ${oldRole.name} was updated in ${oldRole.guild.name} but nothing was registered in the audit log...`));
    }

    const { target, executor, createdAt } = RoleUpdate;

    if (target.id === oldRole.id) {
        console.log(greenBright(`ROLE: ${oldRole.name} was updated in ${oldRole.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    }

    /**
    * Checks Whitelisted & Trusted Users Before banning
    */

    const guildID = oldRole.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${executor.id}`);
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${executor.id}`);

    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === oldRole.guild.owner.id) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else if (!oldRole.permissions.has("ADMINISTRATOR") && newRole.permissions.has("ADMINISTRATOR")) {
        oldRole.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Updated`
        }).catch(() => {
            return console.log(red('Unable to Ban User'));
        }).then(oldRole.guild.owner.send(`**Unauthorised Role Update By:** ${executor.tag} \n**Role:** ${oldRole.name} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban. | Role Removal.`))
            .then(newRole.delete(
                "Unauthorised Update In Role" // Reason
            ))
            .catch(() => {
                return console.log(red('Unable to Delete Role'));
            });
    } else if (!oldRole.permissions.has("BAN_MEMBERS") && newRole.permissions.has("BAN_MEMBERS")) {
        oldRole.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Updated`
        }).catch(() => {
            return console.log(red('Unable to Ban User'));
        }).then(oldRole.guild.owner.send(`**Unauthorised Role Update By:** ${executor.tag} \n**Role:** ${oldRole.name} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban. | Role Removal.`))
            .then(newRole.delete(
                "Unauthorised Update In Role" // Reason
            ))
            .catch(() => {
                return console.log(red('Unable to Delete Role '));
            });
    } else if (!oldRole.permissions.has("KICK_MEMBERS") && newRole.permissions.has("KICK_MEMBERS")) {
        oldRole.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Updated`
        }).then(oldRole.guild.owner.send(`**Unauthorised Role Update By:** ${executor.tag} \n**Role:** ${oldRole.name} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban. | Role Removal.`))
            .then(newRole.delete(
                "Unauthorised Update In Role" // Reason
            ))
            .catch(() => {
                return console.log(red('Unable to Delete Role '));
            });
    }

});

// When Member gets a new role or permission(s)
client.on("guildMemberUpdate", async (oldMember, newMember) => {

    const FetchingLogs = oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
    })

    oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE"
    }).catch(() => {
        return console.log(red('Unable to log: "guildMemberUpdate" event'));
    })

    FetchingLogs.catch(() => {
        return console.log(red('Missing Permissions To Log Entry: Member Role Update'));
    })

    const MRU = (await FetchingLogs).entries.first();

    if (!MRU) {
        return console.log(red(`MEMBER ROLE UPDATE: ${oldMember.user.tag} roles was updated in ${oldMember.guild.name} but nothing was registered in the audit log...`));
    }

    const { target, executor, createdAt } = MRU;

    if (target.id === oldMember.id) {
        console.log(greenBright(`MEMBER ROLE UPDATE: ${oldMember.user.tag} was updated in ${oldMember.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    }


    /**
    * Checks Whitelisted & Trusted Users Before banning
    */

    const guildID = oldMember.guild.id;

    const Info = require(`../Global/Commands/Database/Guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${oldMember.id}`);
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${oldMember.id}`);


    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === newMember.guild.ownerID) {
        return;
    } else if (executor.id === WhiteListedUser || Trusted) {
        return;
    } else if (!oldMember.permissions.has("ADMINISTRATOR") && newMember.permissions.has("ADMINISTRATOR")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(oldMember.guild.owner.send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: ADMINISTRATOR"
            }))
            .catch(() => {
                return console.log(red('Unable to Ban User'));
            });
    } else if (!oldMember.permissions.has("KICK_MEMBERS") && newMember.permissions.has("KICK_MEMBERS")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(oldMember.guild.owner.send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: KICK_MEMBERS"
            }))
            .catch(() => {
                return console.log(red('Unable to Ban User'));
            });
    } else if (!oldMember.permissions.has("BAN_MEMBERS") && newMember.permissions.has("BAN_MEMBERS")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(oldMember.guild.owner.send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: BAN_MEMBERS"
            }))
            .catch(() => {
                return console.log(red('Unable to Ban User'));
            });
    }

})


client.login(token);
