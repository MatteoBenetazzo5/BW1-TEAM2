document
  .getElementById("proceed-btn")
  .addEventListener("click", function (event) {
    const checkbox = document.getElementById("agreement");
    if (!checkbox.checked) {
      alert("Please confirm that you will answer by yourself.");
      event.preventDefault(); // blocca l'azione del bottone/link
    } else {
      window.location.href = "/benchmark-page.html";
    }
  });
