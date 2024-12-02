// drag n drop logic

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("dragend", handleDragEnd);
  document.addEventListener("drop", handleInvalidDrop);
  initializeDropZoneEffects();
});

function initializeDropZoneEffects() {
  const dropZones = document.querySelectorAll("[ondrop]");
  dropZones.forEach((zone) => {
    zone.addEventListener("dragenter", handleDragEnter);
    zone.addEventListener("dragleave", handleDragLeave);
  });
}

function handleDragEnter(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drop-zone-active");
  const noTaskContainer = e.currentTarget.querySelector(".noTasksContainer");
  if (noTaskContainer) {
    noTaskContainer.classList.add("no-tasks-dragging");
  }
}

function handleDragLeave(e) {
  if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
    e.currentTarget.classList.remove("drop-zone-active");
    const noTaskContainer = e.currentTarget.querySelector(".noTasksContainer");
    if (noTaskContainer) {
      noTaskContainer.classList.remove("no-tasks-dragging");
    }
  }
}

function startDragging(id) {
  currentDraggedElementID = id;
  setDraggingStateForCardStyle("floating");
}

function handleMoveToClick(newTaskStatus, taskID) {
  setCurrentDraggedElementID(taskID);
  moveTo(newTaskStatus, taskID);
}

function setCurrentDraggedElementID(taskID) {
  currentDraggedElementID = taskID;
}

function handleDragEnd() {
  const dropZones = document.querySelectorAll("[ondrop]");
  dropZones.forEach((zone) => {
    zone.classList.remove("drop-zone-active");
    const noTaskContainer = zone.querySelector(".noTasksContainer");
    if (noTaskContainer) {
      noTaskContainer.classList.remove("no-tasks-dragging");
    }
  });
  setDraggingStateForCardStyle("landed");
}

function handleInvalidDrop(event) {
  event.preventDefault();
  const currentCardElement = document.getElementById("taskCard" + currentDraggedElementID);
  if (currentCardElement) {
    currentCardElement.classList.remove("hidden");
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(newTaskStatus, taskID = currentDraggedElementID) {
  try {
    const currentCardElement = document.getElementById("taskCard" + taskID);
    if (currentCardElement) {
      currentCardElement.remove();
    }
    updateLokalTaskArrayStatus(newTaskStatus, taskID);
    renderTaskCards();
    await putNewTaskStatus(newTaskStatus, taskID);
    await createLokalTasksArray();
  } catch (error) {
    console.error("Error updating task status:", error);
  } finally {
    const dropZones = document.querySelectorAll("[ondrop]");
    dropZones.forEach((zone) => {
      zone.classList.remove("drop-zone-active");
      const noTaskContainer = zone.querySelector(".noTasksContainer");
      if (noTaskContainer) {
        noTaskContainer.classList.remove("no-tasks-dragging");
      }
    });
  }
}

function setDraggingStateForCardStyle(state) {
  const currentCardElement = document.getElementById("taskCard" + currentDraggedElementID);
  if (!currentCardElement) return;
  if (state === "floating") {
    currentCardElement.classList.add("hidden");
  } else {
    currentCardElement.classList.remove("hidden");
  }
}

// hold to move logic
function startHold(e, taskID) {
  if (e.type === "contextmenu") {
    e.preventDefault();
  }
  window.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  touchStartTime = new Date().getTime();
  isTouchMoving = false;

  setTimeout(() => {
    if (!isTouchMoving) {
      document.getElementById(`taskCard${taskID}`).classList.add("growing");
    }
  }, 200);

  touchTimer = setTimeout(() => {
    const currentTime = new Date().getTime();
    if (!isTouchMoving && currentTime - touchStartTime >= 600) {
      e.preventDefault();
      replaceTaskCardWithMoveToTemplate(taskID);
    }
  }, 700);
}

function checkScroll(e) {
  isTouchMoving = true;
}

function clearHold() {
  touchStartTime = 0;
  clearTimeout(touchTimer);
  setTimeout(() => {
    window.oncontextmenu = null;
  }, 100);
}
