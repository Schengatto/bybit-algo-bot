"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startJobs = void 0;
const schedule = require('node-schedule');
const { fork } = require('child_process');
const startJobs = () => {
    const updatePricesJob = schedule.scheduleJob('* 0 * * * *', () => {
        const worker_process = fork(`${__dirname}/updatePrices.js`, [new Date().getTime()]);
        worker_process.on('close', () => console.log('PRICES UPDATED'));
    });
};
exports.startJobs = startJobs;
