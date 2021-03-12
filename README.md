# Discord-Bladee-Server-Anti-Nuker

| Bladee | 
| ------------- | 
| ![Bladee](https://media.discordapp.net/attachments/818734089724493855/819657745376608356/unknown.png) |

*Please read the [disclaimer](https://github.com/17teen/Discord-Bladee-Server-Anti-Nuker#disclaimer) section before reading forward. Also read everything that is said here to avoid any confusion and unnecessary questions*

## Features:
1. `Protect From Unathorised Bans.`
2. `Protect From Unathorised Kicks.`
3. `Protect From Unathorised Role Creation.`
4. `Protect From Unathorised Passing of potential dangerous permissions.`
5. `Protect From Unathorised Adding of a bot.`
6. `Protect From Unathorised Members joining your guild(s).`
7. `Protect From Unathorised Mass Channel Creation.`
8. `Protect From Unathorised Mass Channel from being deleted.`
9. `Protect From Unathorised Invitation to a guild.`
10. `Protect From Unathorised Role update to potential dangerous permissions.`
11. `Whitelisting.`
12. `Blacklisting.`
13. `Trust System.`

# Requirements Before Set-up:

1. [Node.JS](https://nodejs.org/en/) installed.
2. Code Editor: VSC(recommended), Sublime, Atom etc.

# Set-up: Bot

1. Go to your [Discord Developers Applications](https://discord.com/developers/applications) and create a new bot | You can use an existing one.
2. Go to the "Bot" section and scroll down till you see "Privileged Gateway Intents".
3. Select both **Presence Intent** and **Server Members Intent**.

### Example

![intents](https://media.discordapp.net/attachments/782211920416735252/789810856460419092/unknown.png?width=1409&height=400)

# Set-up: Script

1. Run the `Launch` file and it will install npm then wait for all the packages to be installed.
1. Right click on the `settings.json` file.
2. Open the file either on Notepad or a code editor i.e VSC (Visual Studio Code).
3. Fill in ALL the gaps.
4. Save.

### Example

![settings](https://media.discordapp.net/attachments/818734089724493855/819660501964685342/unknown.png)

### `settings.json`: Objects Explained

* `prefix` |`string`| Your Bot Prefix.
* `token` |`string`| Your Bot Token.
* `founder` |`string`| Your Discord Tag.
* `founderId` |`string`| Your Discord User ID.
* `author` |`string`| My Discord Tag. **(Do not remove.)**
* `authorID` |`string`| My Discord User ID. **(Do not remove.)**
* `github` |`string`| My Github Profile. **(Do not remove.)**
* `sourceCode` |`string`| Anti Nuke Source Code. **(Do not remove.)**
* `inviteLink` |`string`| Your Bot Invite link. (Admin required.)
* `SupportServer` |`string`| A server of your choice. 
* `AllowGuilds` |`bool`| Permission for bot to be used in different servers. Default set to `false`.
* `LockGuildID` |`string`| A server where your bot will soley operate in. (If `AllowGuilds` is set to true this is inefective.)
* `PermittedGuilds` |`Array`| An array of servers you'd like the bot to operate in.

## Start-up:

1. Run the `run.bat` file.

## Commands Showcase:

| Help | 
| ------------- | 
| ![image](https://user-images.githubusercontent.com/71920969/110853651-c91be880-82ab-11eb-8f36-c4701a84ee29.png) |

| Whitelist | Blacklist | 
| ------------- | ------------- |
| ![image](https://user-images.githubusercontent.com/71920969/110852356-2d3dad00-82aa-11eb-98b9-077a2f4a69dc.png) | ![image](https://user-images.githubusercontent.com/71920969/110852400-3af33280-82aa-11eb-9c33-96db6cd31300.png) |

| Trust | Enable & Disable |
| ------------- | ------------- |
![image](https://user-images.githubusercontent.com/71920969/110852427-434b6d80-82aa-11eb-88fb-1e473df4c962.png) | ![image](https://user-images.githubusercontent.com/71920969/110852448-4ba3a880-82aa-11eb-88f2-fe33b4ad550c.png) |

| Adding & Removing Guilds | 
| ------------- | 
| ![image](https://user-images.githubusercontent.com/71920969/110852916-de444780-82aa-11eb-9d13-95bd70c492fb.png) |

# Things to note:

- Your bot must first be allocated a guild. You can do this by setting your server ID to the `LockGuild` object in the `Commands/settings.json` file.
- If you want the bot to be added to other servers you must enable guilds. **The server your bot joins must be permitted/whitelisted before joining or it will leave.**
- If a command is ran on a non-permitted guild, the bot will leave.
- The trust system allows a user to add/remove guilds, blacklist/whitelist users, enable/disable guilds. **They cannot allocate of users to the trust system. Give this permission to the people you trust the most.**
- Whitelisted and Trusted users are not effected by the anti nuke. They will not be banned.
- Blacklisted users are unable to join the guild(s) the bot is in.
- Once you enable guilds (can be done by setting the `AllowGuilds` object to true), make sure you add your `lockGuild` ID to the `PermittedGuilds` Array for every command to function.

### Examples

| Blacklisted User Attempt to join server | Unauthorised Ban |
| ------------- | ------------- |
![image](https://media.discordapp.net/attachments/818734089724493855/818752071330168852/unknown.png) | ![image](https://media.discordapp.net/attachments/818734089724493855/819092601478971412/unknown.png) |

# Disclaimer

This tool is designed for private use. It's meant to protect your server alone. Better suited for **one** server. Blacklisting, Trust and Whitelisting will not differ from each server your bot will be in.


## Contact Me

﹒[Discord](https://discord.com/users/709827684888215582)
﹒[Discord Server](https://discord.gg/CCe5cFtsq7)
﹒[Telegram](https://t.me/clairvoyant7teen)
﹒[Steam](https://steamcommunity.com/id/seven777teen/)

