async function summaryAddAllValuesToBoard() {
    await loadAllTasks();
    summaryShowMostUrgentDate();
    summaryCountUrgentTasks();
    summaryAddToDoValue();
    summaryAddDoneValue();
    summaryAddUrgentValue();
    summaryAddBoardValue();
    summaryAddProgressValue();
    summaryAddFeedbackValue();
  }
  
  function summaryCountUrgentTasks() {
    allUrgentTasksCount += allUrgentTasks.length;
  }
  
  function summaryAddToDoValue() {
    let toDoValue = document.getElementById("summaryToDoValue");
    toDoValue.innerHTML = toDoTasks.length;
  }
  
  function summaryAddDoneValue() {
    let doneValue = document.getElementById("summaryDoneValue");
    doneValue.innerHTML = doneTasks.length;
  }
  
  function summaryAddUrgentValue() {
    let urgentValue = document.getElementById("summaryUrgentValue");
    urgentValue.innerHTML = allUrgentTasksCount;
  }
  
  function summaryAddBoardValue() {
    let boardValue = document.getElementById("summaryBoardValue");
    boardValue.innerHTML = convertedTasks.length;
  }
  
  function summaryAddProgressValue() {
    let progressValue = document.getElementById("summaryProgressValue");
    progressValue.innerHTML = inProgressTasks.length;
  }
  
  function summaryAddFeedbackValue() {
    let feedbackValue = document.getElementById("summaryFeedbackValue");
    feedbackValue.innerHTML = awaitFeedbackTasks.length;
  }
  
  function summaryShowMostUrgentDate() {
    extractUrgentTasks();
    summaryAddUrgentDateValue();
  }
  
  function extractUrgentTasks() {
    pushToDoUrgentTasks();
    pushProgressUrgentTasks();
    pushFeedbackUrgentTasks();
  }
  
  function pushToDoUrgentTasks() {
    for (let i = 0; i < toDoTasks.length; i++) {
      if (toDoTasks[i].taskPrio == "urgent") {
        allUrgentTasks.push(toDoTasks[i]);
      }
    }
  }
  
  function pushProgressUrgentTasks() {
    for (let i = 0; i < inProgressTasks.length; i++) {
      if (inProgressTasks[i].taskPrio == "urgent") {
        allUrgentTasks.push(inProgressTasks[i]);
      }
    }
  }
  
  function pushFeedbackUrgentTasks() {
    for (let i = 0; i < awaitFeedbackTasks.length; i++) {
      if (awaitFeedbackTasks[i].taskPrio == "urgent") {
        allUrgentTasks.push(awaitFeedbackTasks[i]);
      }
    }
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