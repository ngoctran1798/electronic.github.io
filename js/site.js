$('#block-slider-main').slick({
    autoplay: false,
    arrows: false,
    dots: false,
});
$('.block-slider-partner').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [{
        breakpoint: 1025,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }]
});

$('document').ready(function() {
    var header = $(".box-header");
    $(window)['resize'](function() {
        if ($(window)['width']() < 991) {
            $('body').scroll(function() {
                var scroll = $('body').scrollTop();
                if (scroll >= 10) {
                    header.addClass("show-header");
                } else {
                    header.removeClass("show-header");
                }
            });
        }
    });
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
            header.addClass("show-header");
        } else {
            header.removeClass("show-header");
        }
    });
});


if ($(window).width() > 850) {
    $(".box-main").css('margin-bottom', $('.box-footer').height());
} else {
    $(".box-main").css('margin-bottom', '');
}
if ($(window).width() > 850) {
    $(window).scroll(function() {
        if ($(window).scrollTop() > $('.box-main').height() - $(window).height()) {
            $('.box-footer').css('opacity', '1');
        } else {
            $('.box-footer').css('opacity', '0');
        }
    })
}

jQuery(document).ready(function($) {
    $('.btn-search').click(function(e) {
        $('.block-header-search').fadeToggle('fast').removeClass('hide');
    });
    $('.btn-close').click(function(e) {
        $('.block-header-search').fadeToggle('fast').addClass('hide');
    });
});


/--------------------------------/
// external js: isotope.pkgd.js

// init Isotope
$(document).ready(function() {
    //Initiate equalize on load
    var $grid = $(".grid").isotope({
        itemSelector: ".element-item",
        layoutMode: "fitRows",
    });
    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find(".number").text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find(".name").text();
            return name.match(/ium$/);
        },
    };
    // bind filter button click
    $(".filters-button-group").on("click", "button", function() {
        var filterValue = $(this).attr("data-filter");
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    $(".button-group").each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on("click", "button", function() {
            $buttonGroup.find(".is-checked").removeClass("is-checked");
            $(this).addClass("is-checked");
        });
    });
});

/// ********set height*********
$(document).ready(function() {
    //Initiate equalize on load
    equalize();
});
//Equalize on resizing of window
$(window).resize(function() {
    removeHeights();
    equalize();
});

function equalize() {
    $(".grid").each(function() {
        var heights = $(this)
            .find(".element-item img")
            .map(function() {
                return $(this).height();
            })
            .get(),
            maxHeight = Math.max.apply(null, heights);
        $(this).find(".element-item img").height(maxHeight);
    });
}

function removeHeights() {
    $(".grid").each(function() {
        $(this).find(".element-item img").height("auto");
    });
}
// fix-tab
$('.box-gallery a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
    e.target;
    e.relatedTarget;
    $(".grid").slick("setPosition");
});
// hover effect

function closestEdge(x, y, w, h) {
    var topEdgeDist = distMetric(x, y, w / 2, 0);
    var bottomEdgeDist = distMetric(x, y, w / 2, h);
    var leftEdgeDist = distMetric(x, y, 0, h / 2);
    var rightEdgeDist = distMetric(x, y, w, h / 2);
    var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
    switch (min) {
        case leftEdgeDist:
            return "left";
        case rightEdgeDist:
            return "right";
        case topEdgeDist:
            return "top";
        case bottomEdgeDist:
            return "bottom";
    }
}

//Distance Formula
function distMetric(x, y, x2, y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
}

var boxes = document.querySelectorAll(".grid-content");

for (var i = 0; i < boxes.length; i++) {
    boxes[i].onmouseenter = function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
        var overlay = this.children[1];
        var image = this.children[0];

        switch (edge) {
            case "left":
                //tween overlay from the left
                overlay.style.top = "0%";
                overlay.style.left = "-100%";
                TweenMax.to(overlay, 0.5, { left: "0%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
            case "right":
                overlay.style.top = "0%";
                overlay.style.left = "100%";
                //tween overlay from the right
                TweenMax.to(overlay, 0.5, { left: "0%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
            case "top":
                overlay.style.top = "-100%";
                overlay.style.left = "0%";
                //tween overlay from the right
                TweenMax.to(overlay, 0.5, { top: "0%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
            case "bottom":
                overlay.style.top = "100%";
                overlay.style.left = "0%";
                //tween overlay from the right
                TweenMax.to(overlay, 0.5, { top: "0%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
        }
    };

    boxes[i].onmouseleave = function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
        var overlay = this.children[1];
        var image = this.children[0];

        switch (edge) {
            case "left":
                TweenMax.to(overlay, 0.5, { left: "-100%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
            case "right":
                TweenMax.to(overlay, 0.5, { left: "100%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
            case "top":
                TweenMax.to(overlay, 0.5, { top: "-100%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
            case "bottom":
                TweenMax.to(overlay, 0.5, { top: "100%" });
                TweenMax.to(image, 0.5, { scale: 1.0 });
                break;
        }
    };
}

$(document).ready(function() {
    $('.block-widget-title > ul > li > a').click(function(e) {
        e.preventDefault();
        $('.block-widget-title li').removeClass('active');
        $(this).closest('li').addClass('active');
        var checkElement = $(this).next();
        if (checkElement.is('ul') && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }
        if (checkElement.is('ul') && (!checkElement.is(':visible'))) {
            $('.block-widget-title ul ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
        }
        if ($(this).closest('li').find('ul').children().length == 0) {
            return true;
        } else {
            return false;
        }
    });

    $('.block-widget-title ul li').each(function() {
        if ($(this).find('.sub-v-menu').hasClass('sub-v-menu')) {
            $(this).addClass('has-sub');
        }
    });
});

jQuery(document).ready(function($) {
    $('.btn-minus').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('.block-quality').find('.form-control');
        var value = parseInt($input.val());
        if (value > 1) {
            value = value - 1;
        } else {
            value = 1;
        }
        $input.val(value);
    });
    $('.btn-plus').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('.block-quality').find('.form-control');
        var value = parseInt($input.val());
        if (value < 100) {
            value = value + 1;
        } else {
            value = 100;
        }
        $input.val(value);
    });
});

var mzOptions = {
    zoomMode: true,
    onExpandClose: function() { MagicZoom.refresh(); }
};
/*------------------------------------ Single Product */
(function($) {
    $('.slider-thumbnail-navigation').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        vertical: false,
        responsive: [{
                breakpoint: 480,
                settings: {
                    vertical: false,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
})(jQuery);

function collapse() {
    var category = $(".block-products-inner");
    var category_one = $(".block-widget-title");
    if ($(window).width() < 991) {
        category.addClass("collapse");
        category_one.removeClass("collapse").addClass("collapse show");
    } else {
        category.removeClass("collapse");
    }
}
$(window).resize(function() {
    collapse();
});