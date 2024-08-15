function aumentarFonte() {
    let corpo = document.querySelector('.acessibilidade');
    let tamanhoAtual = window.getComputedStyle(corpo).fontSize;
    let novoTamanho = parseFloat(tamanhoAtual) + 2; // Aumenta o tamanho em 2px
    corpo.style.fontSize = novoTamanho + 'px';
}

function diminuirFonte() {
    let corpo = document.querySelector('.acessibilidade');
    let tamanhoAtual = window.getComputedStyle(corpo).fontSize;
    let novoTamanho = parseFloat(tamanhoAtual) - 2; // Diminui o tamanho em 2px
    corpo.style.fontSize = novoTamanho + 'px';
}
