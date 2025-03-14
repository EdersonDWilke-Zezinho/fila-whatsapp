let filaMensagens = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adicionarFila") {
        filaMensagens.push(request.mensagem);
        if (filaMensagens.length === 1) {
            chrome.tabs.sendMessage(sender.tab.id, { action: "responderMensagem", mensagem: filaMensagens[0] });
        }
    } else if (request.action === "mensagemRespondida") {
        filaMensagens.shift();
        if (filaMensagens.length > 0) {
            chrome.tabs.sendMessage(sender.tab.id, { action: "responderMensagem", mensagem: filaMensagens[0] });
        }
    }
});
chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
        if (tab.url && tab.url.includes("web.whatsapp.com")) {
            console.log("ID da aba do WhatsApp Web:", tab.id);
        }
    });
});