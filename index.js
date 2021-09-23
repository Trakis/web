var debugMode = false;

var rgbButton;
var rgbInputText;
var lblHex;


window.onload = function () {
    rgbButton = document.getElementById("bttRGB");
    rgbInputText = document.getElementById("txtInputRGB");
    lblHex = document.getElementById("lblHex");


    // add event listeners
    if (rgbButton) {

        rgbButton.addEventListener("click", buttonOnClickEvent);
        if (debugMode) {
            console.log("(Debug) 'Click Me' button event listener "
                + "attached sucessfully");
        }

        rgbInputText.addEventListener("keyup", function (event) {
            if (event.key === 'Enter') {
                if (debugMode) {
                    console.log("(Debug) input text 'Enter' Key clicked");
                }
                buttonOnClickEvent();

            } else {
                if (debugMode) {
                    console.log("(Debug) input text 'changed' to: " + this.value);
                }
                changeLabelText("");
            }
        });
        if (debugMode) {
            console.log("(Debug) 'keyup' button event listener "
                + "attached sucessfully");
        }

    }

};

function changeLabelText(str) {
    lblHex.innerHTML = str;
};

function buttonOnClickEvent() {
    let hexResult;
    //check input text


    hexResult = convertRgbToHex(rgbInputText);


    if (debugMode) {
        console.log("(Debug) HEX value: " + hexResult);
    }

    if (hexResult === undefined) {
        changeLabelText("Please check input value, "
            + "there might be few issues:"
            + "</br> - values can not be more than 255; "
            + "</br> - values can not be less than 0; "
            + "</br> - values needs to be an integers only; "
            + "</br> - letters are not accepted. ");

    } else {
        changeLabelText(hexResult);
    }

};

function convertRgbToHex(str) {
    if (str.value !== "") {
        let isArrayNumbersValid = true;
        //Split string by separator(,) and convert each to Integer
        var rgbColours = str.value.split(',').map(Number);

        // validation of separated array elements
        rgbColours.forEach(element => {

            if (isNaN(element) || element >= 255 || element <= 0 || !Number.isInteger(element)) {
                isArrayNumbersValid = false;

            }
        });

        if (isArrayNumbersValid && rgbColours.length === 3) {
            return rgbToHex(rgbColours[0], rgbColours[1], rgbColours[2]);
        } else {
            return undefined;
        }


    }
};

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};


