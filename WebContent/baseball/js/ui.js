$(document).ready(function () {
    /*gnb*/
    $('.menu_wrap li a').hover(function () {
        $(this).addClass("on");
        $(this).find('ul:first').css({ visibility: "visible", display: "none" }).show();
    },
    function () {
        $(this).removeClass("on");
        $(this).find('ul:first').css({ visibility: "hidden" });
    });
    $('.menu_wrap li .level2').hover(function () {
        $(this).parent().find("a").addClass("on");
    },
    function () {
        $(this).parent().find("a").removeClass("on");
    });
});