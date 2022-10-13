
var shora = moment().format("H"); //Get the actual hour using moment.js library
var date = moment().format("dddd, MMMM Do YYYY"); //Get the actual day using moment.js library
var day = moment().format("DD"); //Get the actual day using moment.js library
var array = ["", "", "", "", "", "", "", "", ""]; //Empty array which will be updated with the appointments


storedDay = localStorage.getItem("Day"); //Get the day saved in the localStorage
if (storedDay !== null) { //If there is a stored value 
    if (storedDay !== day){ //Check if the stored day is different to the actual day
        var almacenar = JSON.stringify(array); //Stringify the initial array with empty strings to clean everything
        localStorage.setItem("Texts", almacenar); //Store stringified array to localStorage
        localStorage.setItem("Day", day); //Store the actual day to localStorage
    }
}
$("#desc").hide(); //Hide text that shows the success message
$("#currentDay").text(date); //Place the actual day in the element with id = currentDay
var hora = Number(shora); //Convert the actual hour to number
renderText(); //Call function to render the text of the time blocks
renderColor(); //Call function to render the color of the time blocks

//Function to render the color of the time blocks
function renderColor(){
    for (var i = 9; i < 18; i++){ //Loop for all the time blocks
        var TextAreaclass = "." + i; //Create the class name dynamically
        if (i < hora){ //If the time block hour is in the past
            $(TextAreaclass).addClass("past"); //Assign class "past" to the proper time block with TextAreaclass
        } else if (i === hora){ //If the time block hour is in the present
            $(TextAreaclass).addClass("present"); //Assign class "present" to the proper time block with TextAreaclass
        } else if (i > hora){ //If the time block hour is in the future
            $(TextAreaclass).addClass("future"); //Assign class "future" to the proper time block with TextAreaclass
        }
    }
}

//Function to render the text of the time blocks
function renderText(){
    storedTodos = JSON.parse(localStorage.getItem("Texts")); //Get the texts for all time blocks stored in the localStorage and convert them to string
    if (storedTodos !== null) { //If there is something in the localStorage
        array = storedTodos; //Move the stored array
        for (var j = 0; j < array.length; j++){ //Loop for all the elements of the array
            var typearray = typeof(array[j]); //Get the type of each array element
            if (typearray == "object"){ //If the type is equal to object
                var renderclass = array[j].areaclass; //Get the textarea class
                var renderText = array[j].text; //Get the text for the each textarea
                $("div").children(renderclass).val(renderText); //Move the text to the proper textarea 
            }
        }
    }
   
}

//Function to get the text introduced by the user
function getText(event){
    $("#desc").hide();
    var ButtonId = $ (event.target).attr("id"); //Get the id of the button icon pressed by the user
    var TextAreaclass = "." + ButtonId; //Create the text area class using the button icon id
    var input = $ ("div").children(TextAreaclass).val(); //Get the text of the proper text area
    if (input !== null){ //If the input is null
        var content = { //Create an object
            areaclass : TextAreaclass, //Store the text area class
            text : input //Store the text introduced by the user
        };
        var number = Number(ButtonId); //Convert the id of the button icon to number
        number = number - 9; //Substract 9
        array[number] = content; //Change the array element in position number
        var almacenar = JSON.stringify(array); //Stringify the modified array
        localStorage.setItem("Texts", almacenar); //Store the stringified array
        localStorage.setItem("Day", day); //Store the actual day
        $("#desc").show(); //Show the success message
    }
    
}

$("i").on("click", getText); //Catch clicks on the button icons
