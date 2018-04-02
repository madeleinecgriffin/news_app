$(document).ready(function () {

    //scrape new articles
    $("#scrapeButton").on("submit", function (event) {

        event.preventDefault();

        $.ajax("/api/scrape", {
            type: "POST",
            data: newArticle
        }).then(
            function () {
                window.location.href = "/";
            }
        );
    });


    //save article
    $("#saveButton").on("click", function (event) {

        event.preventDefault();
        var id = $(this).data("id");

        var saveArticle = {
            id: id,
            saved: true
        }

        if (confirm("Are you sure you want to save this article?")) {
            $.ajax("/events/api/deleteArticle", {
                type: "UPDATE",
                data: saveArticle
            }).then(
                function () {
                    window.location.href = "/saved";
                }
            );
        }
    });


    //unsave article
    $(".delete").on("click", function (event) {

        event.preventDefault();
        var id = $(this).data("id");

        var deleteArticle = {
            id: id,
            saved: false
        }

        if (confirm("Are you sure you want to unsave this article?")) {
            $.ajax("/events/api/deleteArticle", {
                type: "UPDATE",
                data: deleteArticle
            }).then(
                function () {
                    window.location.href = "/saved";
                }
            );
        }
    });

    //add note - pop up modal
    $("#addNote").on("submit", function (event) {

        var id = $(this).data("id");
        event.preventDefault();

        $.ajax("/addNote/" + id, {
            type: "GET",
            data: id
        }).then(
            function () {
                console.log("adding note");
            });
    });

    //GET UPDATE PAGE
    $("#update_event").on("click", function (event) {
        
        var id = $(this).data("id");
        event.preventDefault();

        var addNote = {
            id: id,
            note: $("#note").text().trim()
        }

        $.ajax("/addNote/" + id, {
            type: "UPDATE",
            data: addNote
        }).then(
            function () {
                console.log("updated event");
            })
    });
});