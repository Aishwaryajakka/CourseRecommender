var profileTab = document.getElementById("profile-tab");
var historyTab = document.getElementById("history-tab");
var recommendationTab = document.getElementById("recommendation-tab");
var profileBlock = document.getElementById("profile");
var historyBlock = document.getElementById("history");
var recommendationBlock = document.getElementById("recommendation");
var recommendationResultBlock = document.getElementById("result");
var submitRecommendationForm = document.getElementById("submitRecommendation");


function loadHistoryTab() {
    historyTab.click();
}

profileTab.addEventListener("click", function () {
    fetch("home/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        //body: ""
    }).then(function (res) {
        return res.text();
    }).then(function (resultHTML) {
        profileBlock.innerHTML = resultHTML;
    }).catch(function (err) {
        console.log(err);
    });
});

historyTab.addEventListener("click", function () {
    fetch("home/history", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        //body: ""
    }).then(function (res) {
        return res.text();
    }).then(function (resultHTML) {
        historyBlock.innerHTML = resultHTML;
    }).catch(function (err) {
        console.log(err);
    });
});

recommendationTab.addEventListener("click", function () {
    submitRecommendationForm.hidden = false;
    recommendationResultBlock.hidden = true;
    recommendationResultBlock.innerHTML = "";
});


submitRecommendationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // get original form data entries
    var formData = new FormData(submitRecommendationForm);
    var formDataEntries = Object.fromEntries(formData.entries())

    fetch(event.target.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataEntries)
    }).then(function (res) {
        return res.text();
    }).then(function (resultHTML) {
        submitRecommendationForm.hidden = true;
        recommendationResultBlock.hidden = false;
        recommendationResultBlock.innerHTML = resultHTML;
    }).catch(function (err) {
        console.log(err);
    });
});


function showDescription(courseSelected) {
    var courseDescriptions = document.getElementById("courseDescriptions").children;
    //console.log(courseDescriptions[0]);
    for (idx = 0; idx < courseDescriptions.length; idx++) {
        if (courseSelected.value == courseDescriptions[idx].id.replace("courseId", "")) {
            console.log(courseDescriptions[idx]);
            courseDescriptions[idx].hidden = false;
        } else {
            courseDescriptions[idx].hidden = true;
        }
    }
}