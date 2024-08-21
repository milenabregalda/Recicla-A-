$(document).ready(function() {
    var executar = true;
    var idIntervalo;
    const banners = $(".banner-image");
    var bannerAtivo = 0;

    function troca(opr) {
        if(executar) {
            executar = false;

            switch(opr) {
                case false:
                    {
                        clearInterval(idIntervalo);                         // Encerrar o loop de troca q já está rodando no fundo
                        idIntervalo = setInterval( (() => troca(true)), 7000);    // Iniciar um novo loop para trocar de imagens

                        banners.eq(bannerAtivo).fadeOut(500, () => {
                            if(bannerAtivo == 0)
                                bannerAtivo = banners.length -1;
                            else
                                bannerAtivo--;

                            banners.eq(bannerAtivo).fadeIn(500, (() => { executar = true; }) );
                        });
                        
                        break;
                    }
                case true:
                    {
                        clearInterval(idIntervalo);                         // Encerrar o loop de troca q já está rodando no fundo
                        idIntervalo = setInterval( (() => troca(true)), 7000);    // Iniciar um novo loop para trocar de imagens

                        banners.eq(bannerAtivo).fadeOut(500, () => {
                            if(bannerAtivo == banners.length -1)
                                bannerAtivo = 0;
                            else
                                bannerAtivo++;

                            banners.eq(bannerAtivo).fadeIn(500, (() => { executar = true; }) );
                        });

                        break;
                    }
            }
        }
    }

    // Timer inicial
    idIntervalo = setInterval( (() => troca(true)), 7000); // Iniciar o loop para trocar de imagens

    // Botão Esquerdo
    $("#btnAnte").click(() => troca(false));

    // Botão Direito
    $("#btnProx").click(() => troca(true));

});