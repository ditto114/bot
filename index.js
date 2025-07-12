import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
client.login(process.env.DISCORD_TOKEN);

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', (message) => {
    // 봇 자신의 메시지는 무시
    if (message.author.bot) return;

    // 기존 ping 명령어
    if (message.content === 'ping') {
        message.reply('pong');
    }

    // 표 보여주기 명령어
    if (message.content === '표 보여줘') {
        const embed = new EmbedBuilder()
            .setTitle('📋 정보 표')
            .setColor('#0099ff')
            .addFields(
                { name: '이름', value: '1\n1\n1', inline: true },
                { name: '직업', value: '2\n2\n2', inline: true },
                { name: '나이', value: '3\n3\n3', inline: true }
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
});

client.login(token);