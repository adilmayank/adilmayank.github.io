$(document).ready(function(){

    let submitButton = $(".submit-button");
    submitButton.on("click", function(){

        getResponseObject();

        $(".pre-text-container").eq(0).toggleClass("fadeOut");
        $(".form-container").toggleClass("fadeOut");
        
        setTimeout(function(){
            
            var responseTextContainer = create("div", "", "submit-reponse-text");

            var responseLine1 = "Thanks for providing the information.";
            var responseLine2 = "Please keep checking your inbox regularly.";

            var responseLines = [responseLine1, responseLine2];
            
            responseLines.forEach(responseLine => {
                var responseLineNode = create("p", responseLine);   
                responseTextContainer.append(responseLineNode);                
            });

            $(".card-content-container").eq(0).html(responseTextContainer);
        }, 600, "ease-in");
    });
})


// returns a dom node
function create(element, body, className){
    var item = $(`<${element}></${element}>`);
    if (className != null || className != ""){
        item.addClass(className);
    };
    item.html(body);
    return item;
}


function getResponseObject(){

    let responseFieldNames = [];
    let responseFieldResult = [];

    let responseObject = {};

    let isServiceBrochureSelected = $("#service-checkbox-value").prop("checked");
    $(".input-label").each(function(){ responseFieldNames.push($(this).attr("data-field-name"))});
    $(".input-response").each(function() { responseFieldResult.push($(this).val())});

    for(var i = 0; i < responseFieldNames.length; i++){
        responseObject[responseFieldNames[i]] = responseFieldResult[i]; 
    }
    responseObject["serviceBrochure"] = isServiceBrochureSelected;

    if (validateResponseFields(responseObject)){
    
        // do something with response Fields...

    }

    else{
        // create a popup displaying the potential errors.
        createErrorPopup();
    }

};

function validateResponseFields(responseObject) {
    // perform validation here

        // First Name must be present

        // Business Name must be present

        // Email must be valid

        // Country must be selected
};

function createErrorPopup(){
    
    // Create error popup !!

}

