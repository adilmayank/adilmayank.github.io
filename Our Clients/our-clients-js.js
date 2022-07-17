$(document).ready(function(){

    const clientNames = [];
    let isHoverToolTipVisisble = false;

    let clientDivs = $("div [data-client-name]");
    
    for(let i = 0; i < clientDivs.length; i++){
        clientNames.push(clientDivs.eq(i).attr("data-client-name"));
    };

    const toggleLeft = $(".toggle-left");
    const toggleRight = $(".toggle-right");
    const toggleLeftMost = $(".toggle-leftmost");
    const toggleRightMost = $(".toggle-rightmost");
    const progressBarLeftMaxFraction = (100-(($(".progress-indicator").width() / $(".progress-indicator").parent().width())*100))/100;
    const progressIndicatorText = $(".progress-indicator span");
    const progressBarInfo = $(".progress-bar-info");
    const infoValuesContainer =$(".info-values-container").eq(1); // selects only second info-values-container that contains services-provided items.
    const progressIndicator =  $(".progress-indicator");
    const hoverToolTipContainer = $(".hover-tool-tip-container");
    const $crossMark = $(".close-div");

    var fractionToMove;

    let currentCardIndex = 0;
    const $clientCardNumbers = $(".client-feedback-parent-card").length;

    setNumberOfGridItems($clientCardNumbers);

    // consolidated function to set currentCardIndex variable values
    function setCurrentCardIndex(buttonClicked){
        switch(buttonClicked){
            case "toggleLeft":
                if (currentCardIndex > 0) { currentCardIndex -= 1; }
                break;
    
            case "toggleRight":
                if (currentCardIndex < $clientCardNumbers - 1) { currentCardIndex += 1; }
                break;
    
            case "toggleLeftMost":
                currentCardIndex = 0;
                break;
            
            case "toggleRightMost":
                currentCardIndex = $clientCardNumbers - 1;
                break;
        };
    };

    // Slides towards left, or slides all the way to last slide, if its the first slide.
    toggleLeft.on("click", function(){

        setCurrentCardIndex("toggleLeft");
        setCardInFront(currentCardIndex);
        fractionToMove = getfractionToMove(currentCardIndex);
        moveClientCard(fractionToMove);
        setProgressBarText(currentCardIndex, clientNames, progressIndicatorText)
        moveProgressBar(currentCardIndex, $clientCardNumbers, progressBarLeftMaxFraction);
        checkExtremeSlide(currentCardIndex, $clientCardNumbers);
    });

    // Slides towards right, or slides all the way to first slide, if its the last slide.
    toggleRight.on("click", function(){

        setCurrentCardIndex("toggleRight");
        setCardInFront(currentCardIndex)
        fractionToMove = getfractionToMove(currentCardIndex);
        moveClientCard(fractionToMove);
        setProgressBarText(currentCardIndex, clientNames, progressIndicatorText)
        moveProgressBar(currentCardIndex, $clientCardNumbers, progressBarLeftMaxFraction);
        checkExtremeSlide(currentCardIndex, $clientCardNumbers);

    });

    // Slides all the way to first slide.
    toggleLeftMost.on("click", function(){

        setCurrentCardIndex("toggleLeftMost");
        setCardInFront(currentCardIndex)
        fractionToMove = getfractionToMove(currentCardIndex);
        moveClientCard(fractionToMove);
        setProgressBarText(currentCardIndex, clientNames, progressIndicatorText)
        moveProgressBar(currentCardIndex, $clientCardNumbers, progressBarLeftMaxFraction);
        checkExtremeSlide(currentCardIndex, $clientCardNumbers);

    });

    // Slides all the way to last slide.
    toggleRightMost.on("click", function(){

        setCurrentCardIndex("toggleRightMost");
        setCardInFront(currentCardIndex)
        fractionToMove = getfractionToMove(currentCardIndex);
        moveClientCard(fractionToMove);
        setProgressBarText(currentCardIndex, clientNames, progressIndicatorText)
        moveProgressBar(currentCardIndex, $clientCardNumbers, progressBarLeftMaxFraction);
        checkExtremeSlide(currentCardIndex, $clientCardNumbers);

    });

    setProgressBarText(currentCardIndex, clientNames, progressIndicatorText);
    checkExtremeSlide(currentCardIndex, $clientCardNumbers);

    progressIndicator.hover(
        () => {
                progressBarInfo.addClass("hover");
                hoverToolTipContainer.animate({opacity: 0}, 200);
                setTimeout(() => {
                    hoverToolTipContainer.css("display", "none");
                    hoverToolTipContainer.html("");
                }, 300);
            },
        () => { progressBarInfo.removeClass("hover")}
            );

    progressIndicator.on("click", function(){
        if(isHoverToolTipVisisble) { isHoverToolTipVisisble = false}
        else if(!isHoverToolTipVisisble) {isHoverToolTipVisisble = true};

        $crossMark.toggleClass("opened");
        progressBarInfo.toggleClass("click");
        infoValuesContainer.toggleClass("allow-scroll");
    });

    $crossMark.on("click", () => { 
        $crossMark.toggleClass("opened");
        progressBarInfo.toggleClass("click");
        infoValuesContainer.toggleClass("allow-scroll");
    })

    $(document).keydown(e => {
        const key = e.key;
        if (key == "ArrowLeft"){
            toggleLeft.click();
        }
        else if (key == "ArrowRight"){
            toggleRight.click();
        }
    });

});

// Functions :)

function setNumberOfGridItems(clientCardNumbers){

    let $cardCarouselContainer = $(".card-carousel-container");
    $cardCarouselContainer.css("grid-template-columns", `repeat(${clientCardNumbers}, 100%)`)
}

function moveClientCard(amountToMove){

    $(".client-feedback-parent-card").css("left", `-${amountToMove}%`);

}

function moveProgressBar(currentCardIndex, clientCardNumbers, progressBarLeftMaxFraction){

    let derivedFractionToMove = currentCardIndex*(100/(clientCardNumbers-1))*progressBarLeftMaxFraction;
    $(".progress-indicator").css("left", `+${derivedFractionToMove}%`);
    $(".progress-bar-info").css("left", `+${derivedFractionToMove}%`);
    $(".hover-tool-tip").css("left", `+${derivedFractionToMove}%`);
    
};

function setProgressBarText(currentCardIndex, clientNames, progressIndicatorText){

    progressIndicatorText.animate({opacity: 0}, 200);
    setTimeout(function(){
        progressIndicatorText.html(clientNames[currentCardIndex]);
    }, 200, "ease-in");
    progressIndicatorText.animate({opacity: 1});

};

function getfractionToMove(currentCardIndex){

    return currentCardIndex * 100;

};

function setCardInFront(currentCardIndex){

    const clientFeedbackContainers = $(".client-feedback-container");
    $(clientFeedbackContainers[currentCardIndex]).removeClass("not-in-front");
    $(clientFeedbackContainers).not($(clientFeedbackContainers[currentCardIndex])).each((k,v) => $(v).addClass("not-in-front"));

};

function checkExtremeSlide(currentCardIndex, numberOfCards){
    if (currentCardIndex == 0){
        $(".toggle-left").addClass("disabled");
        $(".toggle-leftmost").addClass("disabled");
        $(".toggle-right").removeClass("disabled");
        $(".toggle-rightmost").removeClass("disabled");
    }
    else if (currentCardIndex == numberOfCards-1){
        $(".toggle-left").removeClass("disabled");
        $(".toggle-leftmost").removeClass("disabled");
        $(".toggle-right").addClass("disabled");
        $(".toggle-rightmost").addClass("disabled");
    }
    else{
        $(".toggle-left").removeClass("disabled");
        $(".toggle-right").removeClass("disabled");
        $(".toggle-leftmost").removeClass("disabled");
        $(".toggle-rightmost").removeClass("disabled");
    }
}