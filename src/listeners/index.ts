import { Client } from 'discord.js';
import { audity } from './audity'

export async function listeners(client: Client){
    await audity(client);
}