let value = 0;

const loaderInterval = setInterval(() => {
  const loaderLabel = document.querySelector(".hero-loader-label");

  if (value <= 80) {
    loaderLabel.innerHTML = `${value}%`;
    value = value + 1;
  } else {
    clearInterval(loaderInterval);
  }
}, 23);

const secondsInterval = setInterval(() => {
  clearInterval(loaderInterval);
  window.location.href = "https://leandrorezende.com.br/ux/whatsapp";
}, 3000);
