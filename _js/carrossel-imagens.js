$(document).ready(function() {
    // Para que o código só seja executado quando o DOM do HTML for carregado
    let i = 0;
    let $banners = $("#banner .banner-image");
    let max = $banners.length - 1;

    $("#btnAnte").click(function() {
        troca(-1);
    });

    $("#btnProx").click(function() {
        troca(1);
    });

    setInterval(() => troca(1), 7000); // Intervalo para trocar de imagens

    function troca(opr) {
        // Ocultar todas as imagens primeiro para certificar que aparecerá somente uma imagem por vez
        $banners.hide(); 
        
        // Depois, realizar a animação para a imagem atual
        $banners.eq(i).fadeOut(500, function() { // Tempo para animação para uma imagem desaparecer
            i += opr;
            if (i > max) {
                i = 0;
            } else if (i < 0) {
                i = max;
            }
            $banners.eq(i).fadeIn(700); // Tempo para animação para uma imagem aparecer
        });
    }
});