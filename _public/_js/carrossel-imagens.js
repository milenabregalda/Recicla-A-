$(document).ready(() => {                   // Espera para o carregamento completo da página antes de executar o código
    var executar = true;                        // Flag para evitar a execução simultânea da função 'troca' 
    var idIntervalo;                            // ID do timer que troca de imagens automaticamente
    const banners = $(".banner-image");         // Vetor dos elementos das imagens no carrossel
    var bannerAtivo = 0;                        // Qual imagem no vetor acima está sendo exibida

    /**
     * Função que cuida da lógica de troca das imagens pelos botões do carrossel
     * @param {*} direcao Boolean: 'False' troca para a imagem anterior, 'True' troca para a próxima imagem.
     * @author Eduardo Pereira Moreira
     * @since 21/08/2024
     */
    function troca(direcao) {
        if (executar) {                                                                 // Verifica se esta função foi chamada e ainda está em execução
            executar = false;                                                           // Sinaliza que esta função não pode ser executada novamente (por enquanto)

            switch (direcao) {
                case false: {                                                               // 'Case' que define a troca para a imagem anterior
                        clearInterval(idIntervalo);                                             // Encerra o timer de troca que já está rodando
                        idIntervalo = setInterval(() => troca(true), 7000);                     // Inicia um novo timer para a troca de imagens automática e guarda o seu ID

                        banners.eq(bannerAtivo).fadeOut(500, () => {                                // Faz sumir a imagem atual no carrossel
                            if (bannerAtivo == 0)
                                bannerAtivo = banners.length - 1;
                            else
                                bannerAtivo--;

                            banners.eq(bannerAtivo).fadeIn(500, () => executar = true);             // Faz surgir a imagem anterior no carrossel e sinaliza que essa função pode ser executada novamente
                        });

                        break;
                    }
                case true: {                                                                // 'Case' que define a troca para a próxima imagem
                        clearInterval(idIntervalo);                                             // Encerra o timer de troca que já está rodando
                        idIntervalo = setInterval(() => troca(true), 7000);                     // Inicia um novo timer para a troca de imagens automática e guarda o seu ID

                        banners.eq(bannerAtivo).fadeOut(500, () => {                                // Faz sumir a imagem atual no carrossel
                            if (bannerAtivo == banners.length - 1)
                                bannerAtivo = 0;
                            else
                                bannerAtivo++;

                            banners.eq(bannerAtivo).fadeIn(500, () => executar = true);             // Faz surgir a próxima imagem no carrossel e sinaliza que essa função pode ser executada novamente
                        });

                        break;
                    }
            }
        }
    }

    idIntervalo = setInterval(() => troca(true), 7000);         // Inicia a execução do timer inicial de troca de imagens e guarda o seu ID

    $("#btnAnte").click(() => troca(false));                    // Detecta se o botão esquerdo do carrossel foi pressionado. Se detectar, chama a função 'troca' com 'direcao' = false
    $("#btnProx").click(() => troca(true));                     // Detecta se o botão direito do carrossel foi pressionado. Se detectar, chama a função 'troca' com 'direcao' = true
});