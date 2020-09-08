$('.box-product-relate').owlCarousel({
    loop: true,
    nav: true,
    margin: 10,
    autoplaySpeed: 800,
    navSpeed: 800,
    dotsSpeed: 800,
    smartspeed: 2000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplay: false,
    dots: false,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    items: 5
});

$(".pop").popover({
    trigger: "manual",
    html: true,
    animation: false,
    content: function () {
        var content = $(this).parents('.product-relate-item').find('#popover-content').html();
        return content;
    }
}).on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
    });
}).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 0);
});