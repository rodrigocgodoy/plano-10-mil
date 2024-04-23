const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const finalDate = "06/03/2024 20:00:00";

function countdown() {
  const finalDateFormat = new Date(finalDate);
  const currentDateFormat = new Date();

  const totalSeconds = (finalDateFormat - currentDateFormat) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime(hours);
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

countdown();

setInterval(countdown, 1000);

// -------------------- Form 129 ---------------------

const submitButton = document.querySelector('#_form_129_submit');
const form_to_submit = document.getElementById('_form_129_');

const addEvent = function(element, event, func) {
  if (element.addEventListener) {
      element.addEventListener(event, func);
  } else {
    const oldFunc = element['on' + event];
    element['on' + event] = function() {
      oldFunc.apply(this, arguments);
      func.apply(this, arguments);
    };
  }
}

const form_submit = function(e) {
  e.preventDefault();
  if (validate_form()) {
    // use this trick to get the submit button & disable it using plain javascript
    var submitButton = e.target.querySelector('#_form_129_submit');
    submitButton.disabled = true;
    submitButton.classList.add('processing');
    const serialized = _form_serialize(
      document.getElementById('_form_129_')
    ).replace(/%0A/g, '\\n');
    var err = form_to_submit.querySelector('._form_error');
    err ? err.parentNode.removeChild(err) : false;
    async function submitForm() {
      var formData = new FormData();
      const searchParams = new URLSearchParams(serialized);
      searchParams.forEach((value, key) => {
        formData.append(key, value);
      });

      const response = await fetch('https://lbrezende.activehosted.com/proc.php?jsonp=true', {
        headers: {
          "Accept": "application/json"
        },
        body: formData,
        method: "POST"
      });
      return response.json();
    }
    if (formSupportsPost) {
      submitForm().then((data) => {
        eval(data.js);
      });
    } else {
      _load_script('https://lbrezende.activehosted.com/proc.php?' + serialized + '&jsonp=true', null, true);
    }
  }
  return false;
};

addEvent(form_to_submit, 'submit', form_submit);
