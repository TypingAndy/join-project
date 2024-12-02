let toDoTasks = [];
let doneTasks = [];
let convertedTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];

let allUrgentTasks = [];

/**
 * Loads tasks from Firebase, processes them, and updates the UI.
 * It includes loading tasks, converting them to an array, sorting, and updating urgent task information.
 */
async function summaryAddAllValuesToBoard() {
  await loadTasksObjectFromFirebase();
  convertUnsortedTasksObjectToArray();
  sortTasksToStatus();
  pushUrgentTasks();
  countNumberOfUrgentTasks();
  renderAmountOfUrgentTasksInSummary();
  summaryAddUrgentDateValue();
}

/**
 * Sorts tasks by their status and updates the UI with the task count values.
 */
function sortTasksToStatus() {
  let counts = countTaskStatus();
  updateTaskSummaryUI(counts);
}

/**
 * Counts the number of tasks based on their status.
 * @returns {Object} An object containing the count of tasks for each status.
 */
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

/**
 * Updates the UI with the count values for each task status.
 * @param {Object} counts - An object containing the count values for each status.
 */
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

/**
 * Adds all urgent tasks to the global `allUrgentTasks` array.
 */
function pushUrgentTasks() {
  for (let i = 0; i < lokalTasksArray.length; i++) {
    if (lokalTasksArray[i].taskPrio == "urgent" && lokalTasksArray[i].taskStatus !== "done") {
      allUrgentTasks.push(lokalTasksArray[i]);
    }
  }
}

/**
 * Returns the number of urgent tasks.
 * @returns {number} The number of urgent tasks.
 */
function countNumberOfUrgentTasks() {
  let numberOfUrgentTasks = allUrgentTasks.length;
  return numberOfUrgentTasks;
}

/**
 * Displays the number of urgent tasks in the UI.
 */
function renderAmountOfUrgentTasksInSummary() {
  let urgentAmount = document.getElementById("summaryUrgentValue");
  urgentAmount.innerHTML = countNumberOfUrgentTasks();
}

/**
 * Adds the earliest date of any urgent task to the UI.
 */
function summaryAddUrgentDateValue() {
  let urgentDateValue = document.getElementById("summaryDate");
  urgentDateValue.innerHTML = `<b>${filterLowestDate()}</b>`;
}

/**
 * Finds the earliest date among all urgent tasks.
 * @returns {string} The earliest date formatted as a readable string.
 */
function filterLowestDate() {
  let allDates = [];
  for (let i = 0; i < allUrgentTasks.length; i++) {
    allDates.push(allUrgentTasks[i].taskDate);
  }

  allDates.sort((a, b) => new Date(a) - new Date(b));
  return formatDate(allDates[0]);
}

/**
 * Formats a date string into a readable date format.
 * @param {string} dateString - A date string in ISO format.
 * @returns {string} The formatted date.
 */
function formatDate(dateString) {
  let date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * Displays a welcome screen based on the previous page.
 */
function showWelcomeScreen() {
  if (document.referrer.includes("landingpage_login.html")) {
    setTimeout(() => {
      document.querySelector(".welcomeScreen").style.display = "none";
    }, 2000);
  } else {
    document.querySelector(".welcomeScreen").style.display = "none";
  }
}

/**
 * Adjusts the greeting message based on the time of day.
 */
function setWelcomeScreenDayTime() {
  let dayTime = document.getElementById("welcomeDayTime");
  let dayTimeDesktop = document.getElementById("welcomeDayTimeDesktop");
  let hours = new Date().getHours();
  let greeting;

  if (hours >= 5 && hours < 12) {
    greeting = "Good morning,";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon,";
  } else if (hours >= 18 && hours < 22) {
    greeting = "Good evening,";
  } else {
    greeting = "Hello";
  }

  dayTime.innerHTML = greeting;
  dayTimeDesktop.innerHTML = greeting;
}

/**
 * Displays the name of the currently logged-in user.
 */
function setWelcomeScreenName() {
  let name = document.getElementById("welcomeName");
  let nameDesktop = document.getElementById("welcomeNameDesktop");
  let nameFromStorage = localStorage.getItem("loggedUserName");

  if (nameFromStorage) {
    name.innerHTML = nameFromStorage.split(" ")[0];
    nameDesktop.innerHTML = nameFromStorage.split(" ")[0];
  }
}
