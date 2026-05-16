const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const showResult = document.getElementById("bmi-value");
const analyzeBtn = document.querySelector(".calc-btn");
const bmiDiscribe = document.querySelector("#bmi-discrive");
const bmiStatus = document.getElementById("bmi-status");
const unitSelect = document.getElementById("height-unit");
const labelChange = document.querySelector(".heLab");

const unitRates = { "cm": 1, "ft": 30.48 };

// Logic to Handle Unit Change
unitSelect.addEventListener("change", () => {
    heightInput.value = ""; // Clear input on switch
    if (unitSelect.value === 'ft') {
        heightInput.placeholder = "e.g. 5.7";
        labelChange.innerText = "HEIGHT (FT.IN)";
    } else {
        heightInput.placeholder = "e.g. 175";
        labelChange.innerText = "HEIGHT (CM)";
    }
});

analyzeBtn.addEventListener("click", () => {
    let weight = Number(weightInput.value);
    let heightRaw = Number(heightInput.value);
    let unit = unitSelect.value;

    if (!weight || !heightRaw) {
        alert("कृपया वजन और हाइट दोनों सही से भरें! 😊");
        weightInput.value = "";
        heightInput.value = "";
        return;
    }

    // Calculation Logic
    let heightInCm = heightRaw * unitRates[unit];
    let meterHeight = heightInCm / 100;
    let bmiResult = (weight / (meterHeight * meterHeight)).toFixed(1);

    showResult.innerText = bmiResult;

    // Result Styling & Messages
    if (bmiResult >= 30.0) {
        bmiStatus.innerText = "CRITICAL: OBESE 🔴";
        bmiDiscribe.innerText = "यह खतरे की घंटी है! 🚨 बीमारियों का रिस्क बहुत ज्यादा है। तुरंत डाइट और एक्सरसाइज शुरू करें!";
    } else if (bmiResult >= 25.0) {
        bmiStatus.innerText = "WARNING: OVERWEIGHT 🟠";
        bmiDiscribe.innerText = "सावधान! ⚠️ वजन जरूरत से ज्यादा है। आप मोटापे की तरफ बढ़ रहे हैं, थोड़ा संभल जाएं!";
    } else if (bmiResult >= 18.5) {
        bmiStatus.innerText = "SYSTEM: OPTIMAL 🟢";
        bmiDiscribe.innerText = "बधाई हो! 🎉 आपकी हाइट और वजन का तालमेल एकदम परफेक्ट है। आप पूरी तरह फिट हैं!";
    } else {
        bmiStatus.innerText = "ALERT: UNDERWEIGHT 🟡";
        bmiDiscribe.innerText = "ध्यान दें! ⚠️ वजन जरूरत से कम है। शरीर में कमजोरी आ सकती है, अच्छी डाइट लें!";
    }
});
