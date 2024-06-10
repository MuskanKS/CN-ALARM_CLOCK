
let currentHour;
let currentMinute;
let currentSecond;
let currentAmPm = "AM";

const currentTimeElement = document.getElementById("clock-time");

// CURRENT TIME WITH new Date();
function setTime() {
  let now = new Date();
  currentHour = now.getHours();
  currentMinute = now.getMinutes();
  currentSecond = now.getSeconds();
  currentAmPm = "AM";
  if (currentHour > 11) {
    currentHour -= 12;
    currentAmPm = "PM";
  }

  currentHour = currentHour == 0 ? 12 : currentHour;

  currentHour = currentHour < 10 ? "0" + currentHour : currentHour;
  currentMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute;
  currentSecond = currentSecond < 10 ? "0" + currentSecond : currentSecond;

  
  currentTimeElement.innerText = `${currentHour} : ${currentMinute} : ${currentSecond}  ${currentAmPm}`;
}

// PROPER TIME
setInterval(() => {
  setTime();
  const alarmsElement = document.getElementById("alarms-list");
  for (let i = 0; i < alarmsElement.childElementCount; i++) {
    if (alarmsElement.children[i].innerText.includes(currentTimeElement.innerText)) {
      alert(`It is ${currentTimeElement.innerText}`);
    }
  }
}, 1000);

// SAVING HR, MIN, SEC IN VARIABLES
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const amPmElement = document.getElementById("am_pm");
function updateCurrentTime() {
  setTime();
  hourElement.innerText = currentHour;
  minuteElement.innerText = currentMinute;
  secondElement.innerText = currentSecond;
  amPmElement.innerText = currentAmPm;
}
updateCurrentTime();

// HOURS
const selectHoursElement = document.getElementById("select-hours");
for (let i = 1; i <= 12; i++) {
  let opt = document.createElement("option");
  opt.text = i < 10 ? "0" + i : i;
  selectHoursElement.appendChild(opt);
}
// MINS
const selectMinutesElement = document.getElementById("select-minutes");
for (let i = 0; i <= 59; i++) {
  let opt = document.createElement("option");
  opt.text = i < 10 ? "0" + i : i;
  selectMinutesElement.appendChild(opt);
}
// SEC
const selectSecondsElement = document.getElementById("select-seconds");
for (let i = 0; i <= 59; i++) {
  let opt = document.createElement("option");
  opt.text = i < 10 ? "0" + i : i;
  selectSecondsElement.appendChild(opt);
}

// TO ADD TIME
let selectedHour = hourElement.innerText;
let selectedMinute = minuteElement.innerText;
let selectedSecond = secondElement.innerText;
let selectedAmPm = amPmElement.innerText;

selectHoursElement.addEventListener("change", (event) => {
  selectedHour = event.target.value;
});
selectMinutesElement.addEventListener("change", (event) => {
  selectedMinute = event.target.value;
});
selectSecondsElement.addEventListener("change", (event) => {
  selectedSecond = event.target.value;
});
document.getElementById("select-am_pm").addEventListener("change", (event) => {
  selectedAmPm = event.target.value;
});

const alarmsElement = document.getElementById("alarms-list");
document.getElementById("set-alarm").addEventListener("click", () => {
  const noAlarm = document.getElementById("no-alarm");
  if (noAlarm) {
    noAlarm.remove();
  }
  const alarmItem = document.createElement("p"); // TARGETTING PARAGRAPH TAG
  alarmItem.classList.add("alarms-list-item");
  alarmItem.innerText = `${selectedHour} : ${selectedMinute} : ${selectedSecond} ${selectedAmPm}`;
  alarmsElement.appendChild(alarmItem);
  const deleteButton = document.createElement("button"); // DELETE BUTTON
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "delete";
  alarmItem.appendChild(deleteButton);
  const deleteButtons = document.querySelectorAll(".delete-button");
  // ADDING DELETE FOR EACH AND EVERY ALARM
  deleteButtons.forEach((element) => {
    element.addEventListener("click", () => {
      element.parentElement.remove();
      if (alarmsElement.childElementCount == 0) {
        alarmsElement.innerHTML = '<p id="no-alarm">NO ALARMS SET AT THE MOMENT</p>';
      }
    });
  });
});
