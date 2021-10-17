const {ipcRenderer, contextBridge} = require('electron');

const receiveChannels = ['receive-ipv4'];
const sendChannels = ["send-ipv4"];

contextBridge.exposeInMainWorld("api", {
    receive: (channel, func) => {
        if (!receiveChannels.includes(channel)) {
            return;
        }

        ipcRenderer.on(channel, func);
    },
    send: (channel, data) => {
        if (!sendChannels.includes(channel)) {
            return;
        }

        ipcRenderer.send(channel, data);
    }
});