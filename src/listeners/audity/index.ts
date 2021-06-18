import Discord, { Client, Message, User, DMChannel } from "discord.js";
import questions from "../../questions.json";
import { v4 as uuid } from "uuid";
const idadeEmbed = new Discord.MessageEmbed()
  .setColor("#0099ff")
  .setTitle("Qual sua idade?")
  .setDescription(
    ":a: 18-20 \n\n :b: 21-23 \n\n  :regional_indicator_c: 23-25 \n\n :regional_indicator_d: 25-30 \n\n :regional_indicator_e: 30 ou mais"
  );

enum Reactions {
  A = ":a:",
  B = ":b:",
  C = ":regional_indicator_c:",
  D = ":regional_indicator_d:",
  E = ":regional_indicator_e:"
}

type Audity = {
  audityId: string;
  userId: string;
  question: {
    id: number
    type: string
    text: string
    color: string
    reactions: string[]
  };
  response?: string;
};

const memoDB = new Array<Audity>();

export async function audity(client: Client) {

  //starta dm
  client.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.content === "!audity") {
      const userId = msg.author.id;
      const dmChannel = await msg.member!.createDM();

      dmChannel.send("Oi seja bem vindo blalbalbalbal responde ai");
      
      const hasAudity = !!(memoDB.find((x) => x.userId === userId));
      console.log(`hasAudity: ${hasAudity}`)
      if(!hasAudity) await createAudity(userId);
      await startAudity(dmChannel, userId)
    }
  })
  
  // faz um get dos valores do array
  client.on("message", async (msg) => {
      if (
        msg.content === "!checkUser" && //check command
        msg.channel.type === "dm" && //check channel
        !msg.author.bot //
      ) {
        msg.channel.send(JSON.stringify(memoDB));
      }
  });
  const createAudity = async (userId: string) => {
    const audityId = uuid();
    const newAudity = questions.map<Audity>((question) => ({
      userId,
      audityId,
      question,
    }));
    memoDB.push(...newAudity)
  }
  
  const startAudity = async (dmChannel: DMChannel, userId: string) => {
        console.log('comecei a auditoria')
        const currentAudity = memoDB.find(
          (x) => x.userId === userId && !x.response
        );
        console.log(`currentAudity: ${currentAudity}`)
        const question = currentAudity?.question || null;

        console.log(`question: ${question}`)
        if (!question) return;

        await dmChannel.send(question)
        dmChannel.awaitMessages(() => true, { max: 1, time: 300000, errors: ['time']}).then(collected => {
            dmChannel.send(`sua mensagem foi: ${collected}`)
            // validation
            // alter question state in db
            
            // send next
          })
        })
      
  };
}
