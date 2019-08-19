$(document).ready(function () {
    var $form = $('form');

    if ($form.length > 0) {
        $('form input[type="submit"]').bind('click', function (event) {
            if (event) event.preventDefault();
            // validate_input() is a validation function I wrote, you'll have to substitute this with your own.
            register($form)
        });
    }

    function register($form) {
        $("#status").empty()
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (err) { alert("Could not connect to the registration server. Please try again later."); },
            success: function (data) {
                if (data.result != "success") {
                    $("#mc-embedded-subscribe-form").hide()
                    $("#status").append("Thanks a lot! Cya there!")
                }
                else {
                    $("#mc-embedded-subscribe-form").hide()
                    $("#status").append("Thanks a lot! Cya there!")
                }

            }
        });
    }
})