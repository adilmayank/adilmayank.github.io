$(document).ready(function(){
    log("Welcome to Cartesian Services");

    const baseHostUrl = window.location.origin;
    const homePage = "/Home/home-html.html";

    let $siteLogo = $("#site-logo");
    $siteLogo.on("click", function(){ window.location.href = baseHostUrl + homePage; });  
    
    $navContainer = $(".nav-bar");

    // Stop bubbling when mouse comes over anchor element, so as not to trigger another mouseover event on its parent ".nav-item"
    // To see what problem it causes, uncomment the next statement and click on any of the nav-item, when the page loads, 
    // you will see navbar's bg doesn't changes as it is supposed to.
    
    $(".nav-item a").mouseover(e => e.stopPropagation());

    $(".nav-item, .nav-item a").mouseover(e=> $navContainer.addClass(e.target.id));
    $(".nav-item, .nav-item a").mouseout(e=> $navContainer.removeClass(e.target.id));

});

// logs on console
function log(obj){
    console.log(obj);
}