$(function () {

    $('.pre_toform').click(function (e) {
        e.preventDefault();
            $("html,body").animate({
                scrollTop: $('.s-form__top-part').offset().top - 200
            }, 1000);
        return false;
    })
    $('.arrow').on('click', function () {
        let nextSlide = $(this).closest('section,header,footer').next().offset().top;
        $("html,body").animate({
            scrollTop: nextSlide
        }, 800);
    })


})