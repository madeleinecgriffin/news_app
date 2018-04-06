
$(document).on("click", "#scrapeButton", function () {

  $.ajax("/api/scrape", {
    type: "GET"
  }).then(
    function (data) {
      location.reload();
    }
  );
});


$(document).on("click", "#home", function () {

  $.ajax("/articles", {
    type: "GET"
  }).then(
    function (data) {
      window.location.href = "/";
    }
  );
});


$(document).on("click", ".clickNote", function () {

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      window.location.href = "/articles/" + thisId;
    });
});



$(document).on("click", "#savenote", function () {

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {
      window.location.href = "/";
    });
});
