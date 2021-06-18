import Discord, { ClientOptions, Invite } from 'discord.js'
import { clientToken } from './config/enviroment'
import { listeners } from './listeners';

const init = async () => {
    const client = new Discord.Client();
    client.login(clientToken);
    console.log(`clientToken: ${clientToken}`)
    console.log('Hello')  
    
    client.on('ready', () => {
        if (client.user !== null)
            console.log(`Logged in as ${client.user.tag }!`);
    });
    
    client.on('message', msg => {
      if (msg.content === 'ping') {
        msg.reply('pong');
      }
    });
    await listeners(client)
}

init()
