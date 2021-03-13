svg4everybody();

/* ---------------------------------------------- /*
 * slider for tasks
/* ---------------------------------------------- */
if ($('.slider-top').length) {
    $('.slider-top').on('init', function () {
        $('.slider-top').css('opacity', 1);
    });
    $('.slider-top').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: true,
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}

/* ---------------------------------------------- /*
 * slider for tasks
/* ---------------------------------------------- */
if ($('.service__slider').length) {
    $('.service__slider').on('init', function () {
        $('.service__slider').css('opacity', 1);
    });
    $('.service__slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToScroll: 1,
        slidesToShow: 2,
        arrows: true,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}

//faq accordion
$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});

//tabs

// store tabs variable
var myTabs = document.querySelectorAll(".nav-tabs .tab");

function myTabClicks(tabClickEvent) {

    for (var i = 0; i < myTabs.length; i++) {
        myTabs[i].classList.remove("active");
    }

    var clickedTab = tabClickEvent.currentTarget;

    clickedTab.classList.add("active");

    tabClickEvent.preventDefault();

    var myContentPanes = document.querySelectorAll(".tab-pane");

    for (var i = 0; i < myContentPanes.length; i++) {
        myContentPanes[i].classList.remove("active");
    }

    var anchorReference = tabClickEvent.target;
    var activePaneId = anchorReference.getAttribute("href");
    var activePane = document.querySelector(activePaneId);

    activePane.classList.add("active");

}

for (var i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks)
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//search
$('body').on('click', '.js-search', function(e){
    e.preventDefault();
    $('.search-modal').addClass('open');
    $('body').addClass('search');
})
$('body').on('click', '.js-search-close', function(e){
    e.preventDefault();
    $('.search-modal').removeClass('open');
    $('body').removeClass('search');
})
