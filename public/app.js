$(document).ready(function () {

    //scrape new articles
    $("#scrapeButton").on("click", function (event) {

        event.preventDefault();
        console.log("scrape button working");

        $.ajax("/api/articles", {
            type: "GET"
        }).then(
            function (data) {
                location.reload();
            }
        );
    });

    //go back to articles
    $(".danger").on("click", function (event) {

        event.preventDefault();
        console.log("back button working");

        var id = $(this).attr("data");
        event.preventDefault();

        $.ajax("/articles", {
            type: "GET"
        }).then(
            function (data) {
                window.location.href = "/articles";
            }
        );
    });


    //add note - pop up modal
    $(".save").on("click", function (event) {

        console.log("add note button working");

        var id = $(this).attr("data");
        event.preventDefault();

        console.log('id', id)

        $.ajax("/addNote/" + id, {
            type: "GET",
            data: id
        }).then(
            function () {
                console.log("adding note");
                window.location.href = "/addNote/" + id;

            });
    });

    //UPDATE PAGE
    $("#addNote").on("submit", function (event) {

        console.log("submit note button working");

        var id = $(this).attr("data");
        event.preventDefault();

        var addNote = {
            id: id,
            note: $(".addingnote").text().trim(),
            title: $("#addNote").attr("dataTitle"),
            link: $("#addNote").attr("dataLink")
        }

        console.log(addNote);

        $.ajax("/api/addNote/" + id, {
            type: "PUT",
            data: addNote
        }).then(
            function () {
                console.log("updated event");
                location.reload();
            })
    });
});