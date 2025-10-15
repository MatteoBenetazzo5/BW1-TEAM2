//event listener per rendere required il check dell'agreement

const proceedBtn = document.getElementById('proceed-btn');

proceedBtn.addEventListener('click', function (event) {
  const checkbox = document.getElementById('agreement');
  if (!checkbox.checked) {
    alert('Please confirm that you will answer by yourself.');
    event.preventDefault(); // non manda alla pagina successiva
  } else {
    window.location.href = '/benchmark-page.html';
  }
});
