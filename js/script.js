//JQuery

$(document).ready(function() {
    
    let blockId,
        blockOffset;    

    function checkScroll() {
        if ( $(this).scrollTop() >= $(".intro").innerHeight() ) {
            $(".header_inner").addClass("header_fixed");
        } else {
            $(".header_inner").removeClass("header_fixed");
            $(".nav").removeClass("show");
            $(".burger").removeClass("active");
            $(".nav_link").removeClass("nav_link_active");
        } 

        checkActiveElement();
    }

    /*show nav*/

    function showNav() {
        $(".nav").toggleClass("show");
        $(".burger").toggleClass("active");
    }

    /*show nav active*/

    function checkActiveElement() {
        let position = $(this).scrollTop();

        $(".section").each(function() {
            let top = $(this).offset().top - 10,
                bottom = top + $(this).innerHeight();

            if (position >= top && position <= bottom) {
                $(".nav").find("a").removeClass("nav_link_active");
                $(".nav").find('a[data-scroll=".' + $(this).attr('id') + '"]').addClass("nav_link_active");
            }
        })
    }

    $(window).on("scroll", checkScroll);

    $(".burger").on("click", showNav);

    /* nav */

    $("[data-scroll]").on("click", function() {
        
        $(".nav_link").removeClass("nav_link_active");
        blockId = $(this).data("scroll"),
        blockOffset = $(blockId).offset().top;
        blockOffsetBottom = blockOffset + $(blockId).innerHeight();

        $("html, body").animate({
            scrollTop: blockOffset
        }, 900)

        $(".nav_link").removeClass("nav_link_active");
        $(this).addClass("nav_link_active");

    })

    checkScroll();

    /* accordion */

    $("[data-collapse]").on("click", function(event) {
        event.preventDefault();

        let $this = $(this),
            accordionId = $this.data("collapse");

        $(accordionId).slideToggle();
        $this.toggleClass("accordion_active");
            
    })
});


//JS

// window.addEventListener("DOMContentLoaded", function() {

//     window.addEventListener("scroll", showHeader);

//     function showHeader() {
//         if (window.scrollY > document.querySelector(".intro").offsetHeight) {
//             document.querySelector(".header_inner").classList.add("header_fixed");
//         } else {
//             document.querySelector(".header_inner").classList.remove("header_fixed");
//         } 
//     }

//     showHeader();

//     function showNav() {
//         document.querySelector(".burger").addEventListener("click", function() {
//             document.querySelector(".nav").classList.toggle("show");
//             document.querySelector(".burger").classList.toggle("active");
//         })
//     }

//     showNav();
// })