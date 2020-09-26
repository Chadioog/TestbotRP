const Discord = require('discord.js')
const client = new Discord.Client();
// توكن البوت
var token = "NTY0NDg1MzM5NDk4OTM4NDA4.XKoj8A.9iXanMgmqPZQqCkTRp44QUkDStU";
// الاختصار المستخدم في الاوامر
const prefix = "%";
// نشاط البوت
var activity = "testbotrp";
// حالة البوت
var status = "idle";
/**
* @param {Discord.Message} message The received message
*/
async function onMessage(message)
{
	try
	{
		if (message.content.startsWith(prefix))
		{
			var arg_index = message.content.indexOf(' ');
			var command = message.content.slice(prefix.length);
			if(arg_index > 0) // != -1
				command = command.substr(0, arg_index - 1);
			const text = message.content.substr(arg_index + 1);
			switch(command)
			{
				case "help":
					if(message.member.hasPermission(Discord.Permissions.ALL))
					{
						message.author.send("```msgall```");
						message.reply("Ay sir! I DMed you with my current abilities.");
					}
					else
					{
						message.reply("Help coming right away...");
						message.author.send().catch(() =>
						{
							message.reply("I couldn't send a direct message to you.. so I'll send you help here.")
							message.channel.areply("I couldn't send a direct message to you.. so I'll send you help here.")
						});
					}
				break;
				case "msgall":
					if(message.member.hasPermission(Discord.Permissions.ALL))
					{
						message.reply('Sbar awld 97ba');
						let members = await message.guild.members.fetch();
						var sentsuccess = 0;
						var bots = 0;
						var msg = "";
						members.forEach(member =>
						{
							try
							{
								if(!member.user.bot)
								{
									++sentsuccess;
									member.send(text).catch(() =>
									{
										//console.log("Couldn't send message to " + member.displayName);
										//msg += member.displayName;
										//message.channel.send(member.displayName);
										--sentsuccess;
									})(sentsuccess);
								}
								else
									++bots;
							}catch(exception)
							{
								console.log(exception);
							}
						});
						message.channel.send("Rani sifit lmessage awld 97ba " + sentsuccess + "/" + (message.guild.memberCount - bots) + ".");
					}
					else
					{
						message.reply("dort t9awd ma3andkch permission awld 97ba");
					}
				break;
				case 'play':
				break;
			}
		}
	}catch(exception)
	{
		console.log("Exception Handled " + exception);
		message.channel.send("**Exception Handled**\n```js" + exception + "```");
	}
}
function onClientReady()
{
	console.log('Ready!');
	// Set the client user's presence
	client.user.setPresence({ activity: { name: activity }, status: status }).then(console.log).catch(console.error);

}
// Events
client.on("message", onMessage);   // On User Sending Message
client.on('ready', onClientReady); // On Bot Start

// Login
client.login(token);
