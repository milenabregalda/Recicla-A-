$(document).ready(() => {
    var executar = true;
    var idIntervalo;
    const banners = $(".banner-image");
    var bannerAtivo = 0;

    /**
     * Função que cuida da troca das imagens no carrossel
     * @param {*} opr Valor booleano: 'False' troca para a imagem anterior, 'True' troca para a próxima imagem.
     * @author Eduardo Pereira Moreira
     * @since 21/08/2024
     */
    function troca(opr) {
        if (executar) {
            executar = false;

            switch (opr) {
                case false:
                    {
                        clearInterval(idIntervalo);                                 // Encerrar o loop de troca que já está rodando no fundo
                        idIntervalo = setInterval((() => troca(true)), 7000);      // Iniciar um novo loop para trocar de imagens

                        banners.eq(bannerAtivo).fadeOut(500, () => {
                            if (bannerAtivo == 0)
                                bannerAtivo = banners.length - 1;
                            else
                                bannerAtivo--;

                            banners.eq(bannerAtivo).fadeIn(500, (() => { executar = true; }));
                        });

                        break;
                    }
                case true:
                    {
                        clearInterval(idIntervalo);                                 // Encerrar o loop de troca que já está rodando no fundo
                        idIntervalo = setInterval((() => troca(true)), 7000);      // Iniciar um novo loop para trocar de imagens

                        banners.eq(bannerAtivo).fadeOut(500, () => {
                            if (bannerAtivo == banners.length - 1)
                                bannerAtivo = 0;
                            else
                                bannerAtivo++;

                            banners.eq(bannerAtivo).fadeIn(500, (() => { executar = true; }));
                        });

                        break;
                    }
            }
        }
    }

    // Timer inicial para trocar a imagem no carrossel
    idIntervalo = setInterval((() => troca(true)), 7000);

    // Botão Esquerdo no site
    $("#btnAnte").click(() => troca(false));

    // Botão Direito no site
    $("#btnProx").click(() => troca(true));

});