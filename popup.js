document.getElementById("atualizar").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "atualizarFila" });
});
