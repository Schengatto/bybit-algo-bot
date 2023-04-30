"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgoTelegramBot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
class AlgoTelegramBot {
    constructor() {
    }
    static getInstance() {
        if (!AlgoTelegramBot.instance) {
            const fs = require('fs');
            const data = JSON.parse(fs.readFileSync(`${__dirname}/data/telegram.json`, "utf-8"));
            AlgoTelegramBot.instance = new node_telegram_bot_api_1.default(data.botToken);
            AlgoTelegramBot.userId = data.userId;
        }
        return AlgoTelegramBot.instance;
    }
    static sendMessages(messages) {
        const DEFAULT_CHUNK_SIZE = 10;
        while (messages.length > 0) {
            const chunkSize = Math.min(DEFAULT_CHUNK_SIZE, messages.length);
            const chunk = messages.splice(0, chunkSize);
            const message = chunk.join("\n\n");
            if (message) {
                AlgoTelegramBot.getInstance().sendMessage(AlgoTelegramBot.userId, message)
                    .catch((error) => {
                    console.log(error.code);
                    console.log(error.response.body);
                });
            }
        }
    }
    ;
}
exports.AlgoTelegramBot = AlgoTelegramBot;
AlgoTelegramBot.userId = 0;
