function capturarMensagens() {
    let mensagens = document.querySelectorAll("span[title][aria-label]"); // Detecta mensagens não lidas
    mensagens.forEach(mensagem => {
        let texto = mensagem.innerText;
        chrome.runtime.sendMessage({ action: "adicionarFila", mensagem: texto });
    });
}

function responderMensagem(mensagem) {
    let caixaTexto = document.querySelector("[contenteditable='true']");
    if (caixaTexto) {
        caixaTexto.textContent = mensagem;
        caixaTexto.dispatchEvent(new Event("input", { bubbles: true }));
        setTimeout(() => {
            let botaoEnviar = document.querySelector("button span[data-icon='send']");
            if (botaoEnviar) botaoEnviar.click();
            chrome.runtime.sendMessage({ action: "mensagemRespondida" });
        }, 1000);
    }
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "responderMensagem") {
        responderMensagem(request.mensagem);
    }
});

// Captura mensagens automaticamente a cada 5 segundos
setInterval(capturarMensagens, 5000);
