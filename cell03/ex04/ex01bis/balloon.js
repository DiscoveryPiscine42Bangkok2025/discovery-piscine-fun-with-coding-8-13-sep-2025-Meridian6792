$(document).ready(function() {
  const colors = ["red", "green", "blue"];
  let colorIndex = 0;
  let size = 200;

  function updateBalloon() {
    $("#balloon").css({
      "width": size + "px",
      "height": size + "px",
      "background-color": colors[colorIndex]
    });
  }

  $("#balloon").click(function() {
    size += 10;
    colorIndex = (colorIndex + 1) % colors.length;

    if (size > 420) {
      size = 200;
      colorIndex = 0;
    }
    updateBalloon();
  });

  $("#balloon").mouseleave(function() {
    size = Math.max(200, size - 5);
    colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    updateBalloon();
  });

  updateBalloon(); // Initial display
});