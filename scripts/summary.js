let toDoTasks = [];
let doneTasks = [];
let convertedTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];

let allUrgentTasks = [];

async function summaryAddAllValuesToBoard() {
  await loadTasksObjectFromFirebase();
  convertUnsortedTasksObjectToArray();
  sortTasksToStatus();
  pushUrgentTasks();
  countNumberOfUrgentTasks();
  renderAmountOfUrgentTasksInSummary();
  summaryAddUrgentDateValue();
}

function sortTasksToStatus() {
  let counts = countTaskStatus();
  updateTaskSummaryUI(counts);
}

function countTaskStatus() {
  let counts = {
    toDo: 0,
    done: 0,
    awaitFeedback: 0,
    inProgress: 0,
  };

  for (let i = 0; i < lokalTasksArray.length; i++) {
    if (lokalTasksArray[i].taskStatus == "to do") {
      counts.toDo += 1;
    } else if (lokalTasksArray[i].taskStatus == "done") {
      counts.done += 1;
    } else if (lokalTasksArray[i].taskStatus == "await feedback") {
      counts.awaitFeedback += 1;
    } else if (lokalTasksArray[i].taskStatus == "in progress") {
      counts.inProgress += 1;
    }
  }
  return counts;
}

function updateTaskSummaryUI(counts) {
  let toDoValue = document.getElementById("summaryToDoValue");
  let doneValue = document.getElementById("summaryDoneValue");
  let awaitFeedbackValue = document.getElementById("summaryFeedbackValue");
  let inProgressValue = document.getElementById("summaryProgressValue");
  let summaryValue = document.getElementById("summaryBoardValue");

  toDoValue.innerHTML = counts.toDo;
  doneValue.innerHTML = counts.done;
  awaitFeedbackValue.innerHTML = counts.awaitFeedback;
  inProgressValue.innerHTML = counts.inProgress;
  summaryValue.innerHTML = counts.toDo + counts.done + counts.awaitFeedback + counts.inProgress;
}

function pushUrgentTasks() {
  for (let i = 0; i < lokalTasksArray.length; i++) {
    if (lokalTasksArray[i].taskPrio == "urgent" && lokalTasksArray[i].taskStatus !== "done") {
      allUrgentTasks.push(lokalTasksArray[i]);
    }
  }
}

function countNumberOfUrgentTasks() {
  let numberOfUrgentTasks = allUrgentTasks.length;
  return numberOfUrgentTasks;
}

function renderAmountOfUrgentTasksInSummary() {
  let urgentAmount = document.getElementById("summaryUrgentValue");
  urgentAmount.innerHTML = countNumberOfUrgentTasks();
}

//Urgent Task Date

function summaryAddUrgentDateValue() {
  let urgentDateValue = document.getElementById("summaryDate");
  urgentDateValue.innerHTML = `<b>${filterLowestDate()}</b>`;
}

function filterLowestDate() {
  let allDates = [];
  for (let i = 0; i < allUrgentTasks.length; i++) {
    allDates.push(allUrgentTasks[i].taskDate);
  }

  allDates.sort((a, b) => new Date(a) - new Date(b));
  return allDates[0];
}

//Welcome Screen

function showWelcomeScreen() {
  if (document.referrer.includes("landingpage_login.html")) {
    setTimeout(() => {
      document.querySelector(".welcomeScreen").style.display = "none";
    }, 2000);
  } else {
    document.querySelector(".welcomeScreen").style.display = "none";
  }
}

function setWelcomeScreenDayTime() {
  let dayTime = document.getElementById("welcomeDayTime");
  let dayTimeDesktop = document.getElementById("welcomeDayTimeDesktop");
  let hours = new Date().getHours();
  let greeting;

  if (hours >= 5 && hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good Afternoon";
  } else if (hours >= 18 && hours < 22) {
    greeting = "Good Evening";
  } else {
    greeting = "Hello";
  }

  dayTime.innerHTML = greeting;
  dayTimeDesktop.innerHTML = greeting;
}

function setWelcomeScreenName() {
  let name = document.getElementById("welcomeName");
  let nameDesktop = document.getElementById("welcomeNameDesktop");
  let nameFromStorage = localStorage.getItem("loggedUserName");

  if (nameFromStorage) {
    name.innerHTML = nameFromStorage.split(" ")[0];
    nameDesktop.innerHTML = nameFromStorage.split(" ")[0];
  }
}
