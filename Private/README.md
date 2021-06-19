# Bladee: Private Mode

![Bladee-Private-Mode-Wallpaper cropped](https://user-images.githubusercontent.com/71920969/113477244-6667d800-9478-11eb-9f3e-c4728e3a6c5b.jpg)

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

### New Features:
- Add & Remove Guilds
- Enable & Disable Guilds

### Run:
> Windows:
* Run the `run.bat` file
> macOS: 
* Type this in the console: `node .`

### FAQs:
[Private Mode FAQs](https://github.com/17teen/Discord-Bladee-Server-Anti-Nuker/tree/main/FAQs#private-mode)

## Contact Me

﹒[Discord](https://discord.com/users/709827684888215582)
﹒[Discord Server](https://discord.gg/4nSYqZ8KAA)
﹒[Telegram](https://t.me/clairvoyant7teen)
﹒[Steam](https://steamcommunity.com/id/seven777teen/)
