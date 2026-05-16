const inputSelect = document.getElementById("val");
const ClickBtn = document.querySelector(".button");
const showAnswer = document.getElementById("result");
const modeSelect = document.getElementById("mode");

modeSelect.addEventListener("change",(e)=>{
    let changeValue = e.target.value;
    if (changeValue === "f-to-c"){
        inputSelect.placeholder="ENTER_FAHRENHEIT"
    }else{
        inputSelect.placeholder="ENTER_CELSIUS"
    }
})
ClickBtn.addEventListener("click", () => {
    let mode = modeSelect.value;
    if (inputSelect.value == "") {
        showAnswer.innerText = "---"
        return;
    };

    if (mode === "f-to-c") {
        let finelFtoC = (Number(inputSelect.value) - 32) / 1.8;
        showAnswer.innerText = finelFtoC.toFixed(1) + "°C";

    } else {
        let mulValue = 32 + (Number(inputSelect.value) * 1.8);
        showAnswer.innerText = mulValue.toFixed(1) + "°F";

    }
});
