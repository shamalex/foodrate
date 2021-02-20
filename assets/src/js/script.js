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
        responsive: [
            {
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