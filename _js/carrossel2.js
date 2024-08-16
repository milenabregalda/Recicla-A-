let i = 0;
let max = $(".banner-image").length - 1;

$("#banner .banner-image").hide();
$("#banner .banner-image").eq(i).show();

$("#btnAnte").click(function () {
    troca(-1);
});

$("#btnProx").click(function () {
    troca(1);
});

setInterval(() => troca(1), 4000);

function troca(opr) {
    $("#banner .banner-image").eq(i).fadeOut(1000, function () {
        i += opr;
        if (i > max) {
            i = 0;
        } else if (i < 0) {
            i = max;
        }
        $("#banner .banner-image").eq(i).fadeIn(1000);
        $("#b" + i).prop("checked", true);
    });
}

$("input[name='banners']").click(function () {
    let getNumber = $("input[name='banners']:checked").val();
    $(".banner-image").fadeOut(1000);
    $("#banner .banner-image").eq(getNumber).fadeIn(1000);
    i = parseInt(getNumber);
});