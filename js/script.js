//JQuery

$(document).ready(function() {

    let blockId,
        blockOffset;    

    function checkScroll() {
        if ( $(this).scrollTop() >= $(".intro").innerHeight() ) {
            $(".header").addClass("header_fixed");
        } else {
            $(".header").removeClass("header_fixed");
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
            let top = $(this).offset().top - 20,
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

    /* authorized */

    let authorization = false,
        avthorized_window = $(".avthorized-window"),
        login,
        password,
        checkbox = $("#authorized__checkbox");

    if (localStorage.getItem("authorization") == "true") {
        login = localStorage.login;
        password = localStorage.password;
        authorized();
    }

    $(".btn-login").on("click", (event) => {

        if (localStorage.getItem("authorization") == "false" && localStorage.getItem("checkboxChecked") == "false" || !localStorage.getItem("checkboxChecked")) {
            event.preventDefault();
            $(".authorized__login").val("");
            $(".authorized__password").val("");
            checkbox.prop("checked", false);
            avthorized_window.removeClass("hide");

        } else if (localStorage.getItem("authorization") == "false" && localStorage.getItem("checkboxChecked") == "true") {
            event.preventDefault();
            $(".authorized__login").val(localStorage.login);
            $(".authorized__password").val(localStorage.password);
            checkbox.prop("checked", true);
            console.log(checkbox.prop("checked"))
            avthorized_window.removeClass("hide");

        } else {
            event.preventDefault();
            notAuthorized();
        }
    })

    $(".button-close-authorized").on("click", (event) => {
        event.preventDefault();
        avthorized_window.addClass("hide");
    })

    $(".authorized-form").on("submit", function(event) {
        event.preventDefault();

        login = $(".authorized__login").val(),
        password = $(".authorized__password").val();

        localStorage.setItem("login", login);
        localStorage.setItem("password", password);
        localStorage.setItem("checkboxChecked", checkbox.prop("checked"));

        avthorized_window.addClass("hide");

        authorized();
    })

    function authorized() {
        $(".btn-login").text(`log out : ${login}`);
        authorization = true;
        localStorage.setItem("authorization", authorization);
    }

    function notAuthorized() {

        if (localStorage.getItem("checkboxChecked") == "false") {
            $(".btn-login").text("log in");
            authorization = false;
            localStorage.removeItem("login");
            localStorage.removeItem("password");
            localStorage.setItem("authorization", authorization);
        } else {
            $(".btn-login").text("log in");
            authorization = false;
            localStorage.setItem("authorization", authorization);
        }
    }

    /* form */

    let learnWindow = $(".learn-more-window"),
        learnStatus = $(".learn-more__status"),
        message = {
            loading: "loading",
            success: "thank you, we're going to contact with you",
            failure: "error, something goes wrong",

        };

        let learnForm = document.querySelector(".learn-more-form");

    $(".btn-learn").on("click", function(event) {

        event.preventDefault();
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        let formData = new FormData(learnForm);
        let obj = {};

        formData.forEach(function(value, key) {
            obj[key] = value
        });

        let json = JSON.stringify(obj);
        request.send(json);


        request.addEventListener("readystatechange", function() {
            if (request.readyState < 4) {
                learnStatus.text(message.loading);
            } else if (request.readyState === 4 & request.status === 200) {
                learnStatus.text(message.success);
            }  else {
                learnStatus.text(message.failure);
            }
        })
    })


    $(".btn").on("click", (event) => {
        event.preventDefault();
        learnWindow.removeClass("hide");
    })

    $(".button-close-learn").on("click", (event) => {
        event.preventDefault();
        learnWindow.addClass("hide");
    })

    /* slider */

    let slides = $(".slider-item"),
        prev = $(".prev"),
        next = $(".next"),
        slideIndex = 1,
        slidesLength = slides.length,
        dots = $(".dots"),
        dotItem = $(".dots-item");

    slides.addClass("hide");
    slides.eq(slideIndex - 1).removeClass("hide");
    dotItem.removeClass("dot-active");
    dotItem.eq(slideIndex - 1).addClass("dot-active");

    function showSlides() {
        slides.addClass("hide");
        slides.eq(slideIndex - 1).removeClass("hide");
        dotItem.removeClass("dot-active");
        dotItem.eq(slideIndex - 1).addClass("dot-active");
        
    }

    prev.on("click", () => {
        
        slideIndex = slideIndex - 1;

        if (slideIndex >= 1 && slideIndex <= slidesLength) {
            showSlides();
        } else {
            slideIndex = slides.length;
            showSlides();
        }

    })

    next.on("click", () => {

        slideIndex = slideIndex + 1;

        if (slideIndex <= slidesLength) {
            showSlides();
        } else {
            slideIndex = 1
            showSlides();
        }
    })

    dots.on("click", function(event) {

        if ($(event.target).hasClass("dots-item")) {
            slideIndex = $(event.target).index() + 1;
            showSlides();
        }
    })

    /* timer */

    let t;

    function getTimeRemaining() {
    
    let finalDate = "2021-07-28 00:00",
        time = Date.parse(finalDate) - Date.parse(new Date()),
        seconds = Math.floor((time / 1000) % 60),
        minutes = Math.floor((time / 1000 / 60) % 60),
        hours = Math.floor((time / 1000 /60 / 60) % 24),
        days = Math.floor(time / (1000 * 60 * 60 * 24));

        return {
            time: time,
            seconds: seconds,
            minutes:  minutes,
            hours: hours,
            days: days
        }
    }

    function setClock() {
        let days = $(".days"),
            hours = $(".hours"),
            minutes = $(".minutes"),
            seconds = $(".seconds"),
            interval = setInterval(updateClock, 1000);

        function updateClock() {
            t = getTimeRemaining();

            days.text(t.days);
            hours.text(t.hours);
            minutes.text(t. minutes);
            seconds.text(t.seconds);
            
            if (t.time <= 0) {
                clearInterval(interval);
                days.text("00");
                hours.text("00");
                minutes.text("00");
                seconds.text("00");
            }
        }
 
        
    }

    setClock();
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