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
  let counts = countTaskStatuses();
  updateTaskSummaryUI(counts);
}

function countTaskStatuses() {
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


function showWelcomeScreen() {
  // Prüfen, ob die vorherige Seite die Login-Seite war
  if (document.referrer.includes('landingpage_login.html')) {
    // Wenn die vorherige Seite die Login-Seite war, den Begrüßungsbildschirm anzeigen
    setTimeout(() => {
      document.querySelector('.welcomeScreen').style.display = 'none';
    }, 2000); // Entfernt nach 2 Sekunden
  } else {
    // Andernfalls, den Begrüßungsbildschirm sofort ausblenden
    document.querySelector('.welcomeScreen').style.display = 'none';
  }
}


