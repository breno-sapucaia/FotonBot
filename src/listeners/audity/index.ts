import Discord , { Client } from "discord.js";

const idadeEmbed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Qual sua idade?')
  .setDescription(':a: 18-20 \n :b: 21-23 \n  :regional_indicator_c: 23-25 \n :regional_indicator_d: 25-30 \n :regional_indicator_e: 30 ou mais')

export async function audity(client: Client) {
  // Entrou
  client.on('message', async msg => {
    if (msg.author.bot) return
      if (msg.content === 'dm') {
        if (msg.author.bot) return
        const dmChannel = await msg.member!.createDM()
        //bem vindo
        dmChannel.send("salve men o/")
        dmChannel.send("Manda seu email pra nois <3")
        
        client.on('message', async msg => {
          if (msg.author.bot)  return
          //TODO salvar email
          console.log(msg.content)
          dmChannel.send(`Qual seu nome completo meu mago?`)
          
          client.on('message', async msg => {
            if (msg.author.bot) return
            //TODO SALVAR NOME COMPLETO
            //TODO: reação no embed
            dmChannel.send(idadeEmbed)
            
          })
        })
      }
  })
}