$(document).ready(function() {
    const banners = $(".banner-image");
    var bannerAtivo = 0;
    var executar = true;

    function troca(opr) {
        if(executar) {
            executar = false;

            switch(opr) {
                case -1:
                    {
                        clearInterval(idIntervalo);                         // Encerrar o loop de troca q já está rodando no fundo
                        idIntervalo = setInterval(() => troca(1), 7000);    // Iniciar um novo loop para trocar de imagens

                        banners.eq(bannerAtivo).fadeOut(500, () => {
                            if(bannerAtivo == 0)
                                bannerAtivo = banners.length -1;
                            else
                                bannerAtivo--;

                            banners.eq(bannerAtivo).fadeIn(500, () => { executar = true; });
                        });
                        
                        break;
                    }
                case 1:
                    {
                        clearInterval(idIntervalo);                         // Encerrar o loop de troca q já está rodando no fundo
                        idIntervalo = setInterval(() => troca(1), 7000);    // Iniciar um novo loop para trocar de imagens

                        banners.eq(bannerAtivo).fadeOut(500, () => {
                            if(bannerAtivo == banners.length -1)
                                bannerAtivo = 0;
                            else
                                bannerAtivo++;

                            banners.eq(bannerAtivo).fadeIn(500, () => { executar = true; });
                        });

                        break;
                    }
            }
        }
    }

    var idIntervalo = setInterval(() => troca(1), 7000); // Iniciar o loop para trocar de imagens

    $("#btnAnte").click(function() {
        troca(-1);
    });

    $("#btnProx").click(function() {
        troca(1);
    });

});