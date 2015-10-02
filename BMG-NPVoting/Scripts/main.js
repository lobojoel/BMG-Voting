var currentUser = "";

$(document).ready(function () {
    $(".success-msg").css("display", "none");

    $(".captcha-issue").css("display", "none");

    $(".already-voted").css("display", "none");

    currentUser = "";
});
function ValidCaptcha() {
    var cityselect = $(".selectedCity").val();
    var str1 = "";
    var str2 = "1";
    if (cityselect == "Dayton") {
        str1 = removeSpaces($("#txtDaytonCaptcha").val());
        str2 = $("#txtDaytonInput").val();

    }
    else if (cityselect == "Cincinnati") {
        str1 = removeSpaces($("#txtCincinnatiCaptcha").val());
        str2 = $("#txtCincinnatiInput").val();

    }
    else if (cityselect == "Columbus") {
        str1 = removeSpaces($("#txtColumbusCaptcha").val());
        str2 = $("#txtColumbusInput").val();

    }
    if (str1.toLowerCase() != str2.toLowerCase()) {
        return false;
    }
    return true;
}


function removeSpaces(string) {
    return string.split(' ').join('');
}

function DrawCaptcha() {
    var a = 49, b = 65;
    var c = 100;
    var d = 70;
    var cityselect = $(".selectedCity").val();
    var element = "";
    if (cityselect == "Dayton") {
        element = document.getElementById("txtDaytonCaptcha");
    }
    else if (cityselect == "Cincinnati") {
        element = document.getElementById("txtCincinnatiCaptcha");
    }
    else if (cityselect == "Columbus") {
        element = document.getElementById("txtColumbusCaptcha");
    }
    element.onselectstart = function () { return false; } // ie  
    element.onmousedown = function () { return false; } // mozilla  
    if (a == 49) {
        a = 57;
    }

    element.value = "";
    var number = getRandomInt(0, 1);
    if (number === 0) {
        var a1 = String.fromCharCode(64 + Math.random() * 10 + 1);
        var b1 = String.fromCharCode(64 + (Math.random() * 10) + 1); javascript: void (0)
    } else if (number === 1) {
        var a1 = getRandomInt(0, 9);
        var b1 = getRandomInt(0, 9); javascript: void (0)
    }
    var n1 = getRandomInt(0, 9);
    var c1 = String.fromCharCode(64 + (Math.random() * 10) + 1);
    var d1 = getRandomInt(0, 9);
    element.value = a1 + " " + b1 + " " + c1 + " " + d1 + " " + String.fromCharCode(64 + (Math.random() * 10) + 2) + " " + String.fromCharCode(64 + (Math.random() * 10) + 1);

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(".btn-vote").click(function () {
    $('#citySelectionModal').modal('show');
    $(".success-msg").css("display", "none");
    $(".vote-section").css("display", "block");
});
$(".btn-select-city").click(function () {
    var selectedCity = $(this).attr('id');
    $(".selectedCity").val(selectedCity);
    $('#citySelectionModal').modal('hide')
    $('#registerModal').modal('show');

    //clear form fields
    $("#exampleFirstName1").val("");
    $("#exampleLastName1").val("");
    $("#exampleEmail1").val("");
    $("#examplePhone1").val("");
    $("#exampleBusinessName1").val("");

    var users = JSON.parse(localStorage.getItem('users'));
    if (users != null) {
        if (users.length == 1) {
            //populate info if only one users info is stored
            $("#exampleFirstName1").val(users[0].fname);
            $("#exampleLastName1").val(users[0].lname);
            $("#exampleEmail1").val(users[0].email);
            $("#examplePhone1").val(users[0].phone);
            $("#exampleBusinessName1").val(users[0].bname);
        }
    }

});


$("#exampleFirstName1").blur(function () {
    if ($("#exampleFirstName1").val()) {
        var users = JSON.parse(localStorage.getItem('users'));
        if (users != null) {//local storage value exists
            for (j = 0; j < users.length; j++) {
                if ($("#exampleFirstName1").val().toLowerCase() == users[j].fname.toLowerCase()) //check if user in existing users stored
                {
                    //populate info if only one users info is stored
                    $("#exampleFirstName1").val(users[j].fname);
                    $("#exampleLastName1").val(users[j].lname);
                    $("#exampleEmail1").val(users[j].email);
                    $("#examplePhone1").val(users[j].phone);
                    $("#exampleBusinessName1").val(users[j].bname);
                }
            }
        }
    }
});

$("#registerForm").submit(function (event) {

    $(".already-voted").css("display", "none");
    var canVote = true;
    if ($("#registerForm").valid()) {
        if (typeof (Storage) !== "undefined") {

            currentUser = $("#exampleFirstName1").val();
            var users = JSON.parse(localStorage.getItem('users'));
            if (users != null) {//local storage value exists
                var found = false;
                for (j = 0; j < users.length; j++) {
                    if (found == false) {
                        if (currentUser.toLowerCase() == users[j].fname.toLowerCase()) //check if user in existing users stored
                        {
                            found = true;//existing user found
                            //reassign values to have updated info
                            users[j].fname = $("#exampleFirstName1").val();
                            users[j].lname = $("#exampleLastName1").val();
                            users[j].email = $("#exampleEmail1").val();
                            users[j].phone = $("#examplePhone1").val();
                            users[j].bname = $("#exampleBusinessName1").val();

                            $(".voterFname").val(users[j].fname);
                            $(".voterLname").val(users[j].lname);
                            $(".voterPhone").val(users[j].email);
                            $(".voterEmail").val(users[j].phone);
                            $(".voterBname").val(users[j].bname);
                            var today = new Date();
                            today.setHours(0, 0, 0, 0);

                            var lastVoted = new Date(users[j].voteDay)
                            lastVoted.setHours(0, 0, 0, 0);
                            if (users[j].voteDay != "" && users[j].voteDay != undefined) {
                                if (lastVoted >= today) {

                                    canVote = false;
                                }
                                else {
                                    //can vote
                                }
                            }
                        }
                    }
                }
                if (!found) //new user
                {
                    var user = {};
                    user.fname = $("#exampleFirstName1").val();
                    user.lname = $("#exampleLastName1").val();
                    user.email = $("#exampleEmail1").val();
                    user.phone = $("#examplePhone1").val();
                    user.bname = $("#exampleBusinessName1").val();
                    $(".voterFname").val(user.fname);
                    $(".voterLname").val(user.lname);
                    $(".voterPhone").val(user.email);
                    $(".voterEmail").val(user.phone);
                    $(".voterBname").val(user.bname);
                    users.push(user); //add to array
                }
                localStorage.setItem('users', JSON.stringify(users)); //restore

            }
            else {
                //no info stored in local storage yet
                var user = {};
                user.fname = $("#exampleFirstName1").val();
                user.lname = $("#exampleLastName1").val();
                user.email = $("#exampleEmail1").val();
                user.phone = $("#examplePhone1").val();
                user.bname = $("#exampleBusinessName1").val();
                $(".voterFname").val(user.fname);
                $(".voterLname").val(user.lname);
                $(".voterPhone").val(user.email);
                $(".voterEmail").val(user.phone);
                $(".voterBname").val(user.bname);
                var users = [user];
                localStorage.setItem('users', JSON.stringify(users)); //store info
            }
            // Code for localStorage/sessionStorage.
        } else {
            // Sorry! No Web Storage support..
        }
        if (canVote) {
            $('#registerModal').modal('hide');

            var cityselect = $(".selectedCity").val();

            if (cityselect == "Dayton") {
                $('#voteDaytonModal').modal('show');
            }
            else if (cityselect == "Cincinnati") {

                $('#voteCincinnatiModal').modal('show');
            }
            else if (cityselect == "Columbus") {

                $('#voteColumbusModal').modal('show');
            }

            //clear form fields
            $("#txtDaytonInput").val("");
            $("#txtColumbusInput").val("");
            $("#txtCincinnatiInput").val("");
            DrawCaptcha();
        }
        else {
            $(".already-voted").css("display", "block");
        }
    }

    event.preventDefault();
});

$(".select-np").click(function () {
    if (!ValidCaptcha()) {
        $(".captcha-issue").css("display", "block");
    }
    else {
        var npVotedFor = $(this).attr("name");
        if (typeof (Storage) !== "undefined") {

            var users = JSON.parse(localStorage.getItem('users'));
            if (users != null) {//local storage value exists

                var found = false;
                for (j = 0; j < users.length; j++) {
                    if (found == false) {
                        if (currentUser.toLowerCase() == users[j].fname.toLowerCase()) //check if user in existing users stored
                        {
                            found = true;//existing user found
                            //reassign values to have updated info
                            users[j].fname = $("#exampleFirstName1").val();
                            users[j].lname = $("#exampleLastName1").val();
                            users[j].email = $("#exampleEmail1").val();
                            users[j].phone = $("#examplePhone1").val();
                            users[j].bname = $("#exampleBusinessName1").val();
                            users[j].votedFor = npVotedFor;
                            users[j].voteDay = new Date();

                            $(".voterVote").val(npVotedFor);

                            $.ajax({
                                url: '/Home/Vote',
                                type: 'POST',
                                contentType: 'application/json;',
                                data: JSON.stringify({
                                    'firstName': users[j].fname,
                                    'lastName': users[j].lname,
                                    'email': users[j].email,
                                    'phone': users[j].phone,
                                    'businessName': users[j].bname,
                                    'city': $(".selectedCity").val(),
                                    'votedFor': users[j].votedFor
                                }),
                                success: function (valid) {

                                    $(".success-msg").css("display", "block");
                                    $(".vote-section").css("display", "none");
                                }
                            });

                        }
                    }
                }
                if (!found) //new user
                {
                    var user = {};
                    user.fname = $("#exampleFirstName1").val();
                    user.lname = $("#exampleLastName1").val();
                    user.email = $("#exampleEmail1").val();
                    user.phone = $("#examplePhone1").val();
                    user.bname = $("#exampleBusinessName1").val();
                    user.votedFor = npVotedFor;
                    user.voteDay = new Date();
                    $(".voterVote").val(npVotedFor);
                    users.push(user); //add to array

                    $.ajax({
                        url: '/Home/Vote',
                        type: 'POST',
                        contentType: 'application/json;',
                        data: JSON.stringify({
                            'firstName': user.fname,
                            'lastName': user.lname,
                            'email': user.email,
                            'phone': user.phone,
                            'businessName': user.bname,
                            'city': $(".selectedCity").val(),
                            'votedFor': user.votedFor
                        }),
                        success: function (valid) {

                            $(".success-msg").css("display", "block");
                            $(".vote-section").css("display", "none");
                        }
                    });
                }
                localStorage.setItem('users', JSON.stringify(users)); //restore


            }
            else {
                //no info stored in local storage yet
                var user = {};
                user.fname = $("#exampleFirstName1").val();
                user.lname = $("#exampleLastName1").val();
                user.email = $("#exampleEmail1").val();
                user.phone = $("#examplePhone1").val();
                user.bname = $("#exampleBusinessName1").val();
                user.votedFor = npVotedFor;
                user.voteDay = new Date();
                $(".voterVote").val(npVotedFor);
                var users = [user];
                localStorage.setItem('users', JSON.stringify(users)); //store info

                $.ajax({
                    url: '/Home/Vote',
                    type: 'POST',
                    contentType: 'application/json;',
                    data: JSON.stringify({
                        'firstName': user.fname,
                        'lastName': user.lname,
                        'email': user.email,
                        'phone': user.phone,
                        'businessName': user.bname,
                        'city': $(".selectedCity").val(),
                        'votedFor': user.votedFor
                    }),
                    success: function (valid) {

                        $(".success-msg").css("display", "block");
                        $(".vote-section").css("display", "none");
                    }
                });
            }
            // Code for localStorage/sessionStorage.
        }
    }
});

$(".refresh").click(function () {
    DrawCaptcha();
});

$(".resultslink").click(function () {
    $.ajax({
        url: '/Home/Results',
        type: 'GET',
        contentType: 'application/json;',
        data: JSON.stringify({}),
        success: function (data) {
            if (data != null && data != undefined) {
                $(".totalVotes").text(data.Total);
                for (i = 0; i < data.PercentageStats.length; i++) {
                    $("#" + data.PercentageStats[i].NonProfit).text(parseFloat(data.PercentageStats[i].PercentageVotes).toFixed(2) + "%");
                }
            }
            $(".success-msg").css("display", "block");
            $(".vote-section").css("display", "none");
            var $percentages = $(".divvote>strong");
            var $graphs = $(".div-graph");
            for (i = 0; i < 11; i++) {
                var widthPer = $($percentages[i]).text();
                var w = widthPer.slice(0, -1);
                $($graphs[i]).css("width", (304 * (parseFloat(w) / 100)));
            }
            var cityselect = $(".selectedCity").val();
            if (cityselect == "Dayton") {
                $('#voteDaytonModal').modal('hide');

                $('#resultsDaytonModal').modal('show');
            }
            else if (cityselect == "Cincinnati") {
                $('#voteCincinnatiModal').modal('hide');

                $('#resultsCincinnatiModal').modal('show');
            }
            else if (cityselect == "Columbus") {
                $('#voteColumbusModal').modal('hide');

                $('#resultsColumbusModal').modal('show');
            }          
        }
    });


});


$.validator.setDefaults({
    debug: true,
    success: "valid"
});
$("#registerForm").validate({
    rules: {
        exampleFirstName1: "required",
        exampleLastName1: "required",
        exampleEmail1: {
            required: true,
            email: true
        },
        examplePhone1: {
            required: true,
            phoneUS: true
        }
    },
    messages: {
        exampleFirstName1: "Please enter your first name",
        exampleLastName1: "Please enter your last name",
        exampleEmail1: {
            required: "Please enter your email",
            email: "Please provide a valid email address"
        },
        examplePhone1: {
            required: "Please enter your phone number",
            phoneUS: "Please enter a valid phone number"
        }
    },
});