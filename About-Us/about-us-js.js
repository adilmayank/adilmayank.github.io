$(document).ready(function(){
    
    
    setNumberOfGridItems();

    const $toggleLeft = $(".toggle-left");
    const $toggleRight = $(".toggle-right");
    const $toggleLeftMost = $(".toggle-leftmost");
    const $toggleRightMost = $(".toggle-rightmost");

    var fractionToMove;
    let currentCardIndex = 0;
    const $employeeCardNumbers = $(".employee-feedback-parent-card").length;

    // consolidated function to set currentCardIndex variable values
    function setCurrentCardIndex(buttonClicked){
        switch(buttonClicked){
            case "toggleLeft":
                if (currentCardIndex > 0) { currentCardIndex -= 1; }
                break;
    
            case "toggleRight":
                if (currentCardIndex < $employeeCardNumbers - 1) { currentCardIndex += 1; }
                break;
    
            case "toggleLeftMost":
                currentCardIndex = 0;
                break;
            
            case "toggleRightMost":
                currentCardIndex = $employeeCardNumbers - 1;
                break;
        };
    };

    // Making employee feedback toggle buttons work

    // $toggleLeft.on("click", () => moveFeedbackCard("toggleLeft"));
    $toggleLeft.on("click", () => {

        setCurrentCardIndex("toggleLeft");
        setCardInFront(currentCardIndex);
        fractionToMove = getfractionToMove(currentCardIndex);
        moveEmployeeFeedbackCard(fractionToMove);
        checkExtremeSlide(currentCardIndex, $employeeCardNumbers);

    });

    // $toggleRight.on("click", () => moveFeedbackCard("toggleRight"));
    $toggleRight.on("click", () => {

        setCurrentCardIndex("toggleRight");
        setCardInFront(currentCardIndex);
        fractionToMove = getfractionToMove(currentCardIndex);
        moveEmployeeFeedbackCard(fractionToMove);
        checkExtremeSlide(currentCardIndex, $employeeCardNumbers);

    });
    
    // $toggleLeftMost.on("click", () => moveFeedbackCard("toggleLeftMost"));
    $toggleLeftMost.on("click", () => {
    
        setCurrentCardIndex("toggleLeftMost");
        setCardInFront(currentCardIndex);
        fractionToMove = getfractionToMove(currentCardIndex);
        moveEmployeeFeedbackCard(fractionToMove);
        checkExtremeSlide(currentCardIndex, $employeeCardNumbers);
    
    });

    // $toggleRightMost.on("click", () => moveFeedbackCard("toggleRightMost"));
    $toggleRightMost.on("click", () => {
        setCurrentCardIndex("toggleRightMost");
        setCardInFront(currentCardIndex);
        fractionToMove = getfractionToMove(currentCardIndex);
        moveEmployeeFeedbackCard(fractionToMove);
        checkExtremeSlide(currentCardIndex, $employeeCardNumbers);
    });
     
    checkExtremeSlide(currentCardIndex, $employeeCardNumbers);
});


// Dynamically setting grid-template-columns property of "employee-card-carousel" class, gets called on page load
function setNumberOfGridItems(){

    const $employeeCardCarousel = $(".employee-cards-carousel");
    const $numberOfFeedbackCards = $(".employee-feedback-card").length;
    $employeeCardCarousel.css("grid-template-columns", `repeat(${$numberOfFeedbackCards}, 100%)`);
};

// function to control the movements buttons

function getfractionToMove(currentCardIndex){

    return currentCardIndex * 100;

};

function moveEmployeeFeedbackCard(amountToMove){

    $(".employee-feedback-parent-card").css("left", `-${amountToMove}%`);

}

function setCardInFront(currentCardIndex){

    const employeeFeedbackContainers = $(".employee-feedback-card");
    $(employeeFeedbackContainers[currentCardIndex]).removeClass("not-in-front");
    $(employeeFeedbackContainers).not($(employeeFeedbackContainers[currentCardIndex])).each((k,v) => $(v).addClass("not-in-front"));

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