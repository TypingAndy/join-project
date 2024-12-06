// Drag and drop logic

/**
 * Sets up event listeners and effects for drag and drop functionality when the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("dragend", handleDragEnd);
  document.addEventListener("drop", handleInvalidDrop);
  initializeDropZoneEffects();
});

/**
 * Initializes drop zone effects by adding event listeners to drag events on elements with the "ondrop" attribute.
 */
function initializeDropZoneEffects() {
  const dropZones = document.querySelectorAll("[ondrop]");
  dropZones.forEach((zone) => {
    zone.addEventListener("dragenter", handleDragEnter);
    zone.addEventListener("dragleave", handleDragLeave);
  });
}

/**
 * Handles the dragenter event for a drop zone.
 * Adds active state to the drop zone and modifies the appearance of the "noTasksContainer" if present.
 *
 * @param {Event} e - The dragenter event.
 */
function handleDragEnter(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drop-zone-active");
  const noTaskContainer = e.currentTarget.querySelector(".noTasksContainer");
  if (noTaskContainer) {
    noTaskContainer.classList.add("no-tasks-dragging");
  }
}

/**
 * Handles the dragleave event for a drop zone.
 * Removes the active state from the drop zone and resets the appearance of the "noTasksContainer" if present.
 *
 * @param {Event} e - The dragleave event.
 */
function handleDragLeave(e) {
  if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
    e.currentTarget.classList.remove("drop-zone-active");
    const noTaskContainer = e.currentTarget.querySelector(".noTasksContainer");
    if (noTaskContainer) {
      noTaskContainer.classList.remove("no-tasks-dragging");
    }
  }
}

/**
 * Starts dragging a task card by setting the current dragged element ID and applying the floating state for the card.
 *
 * @param {string} id - The ID of the task card being dragged.
 */
function startDragging(id) {
  currentDraggedElementID = id;
  setDraggingStateForCardStyle("floating");
}

/**
 * Handles a click to move a task card to a new status.
 * Sets the current dragged task ID and triggers the movement of the task.
 *
 * @param {string} newTaskStatus - The new status for the task.
 * @param {string} taskID - The ID of the task being moved.
 */
function handleMoveToClick(newTaskStatus, taskID) {
  setCurrentDraggedElementID(taskID);
  moveTo(newTaskStatus, taskID);
}

/**
 * Sets the current dragged element ID to the specified task ID.
 *
 * @param {string} taskID - The ID of the task to be set as the current dragged element.
 */
function setCurrentDraggedElementID(taskID) {
  currentDraggedElementID = taskID;
}

/**
 * Handles the dragend event to reset the drop zones and card appearance.
 */
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

/**
 * Handles an invalid drop by preventing the default action and showing the dragged card again.
 *
 * @param {Event} event - The drop event.
 */
function handleInvalidDrop(event) {
  event.preventDefault();
  const currentCardElement = document.getElementById("taskCard" + currentDraggedElementID);
  if (currentCardElement) {
    currentCardElement.classList.remove("hidden");
  }
}

/**
 * Allows the drop by preventing the default behavior of the event.
 *
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Moves a task card to a new status and updates the local task array and the task's status on the server.
 *
 * @param {string} newTaskStatus - The new status for the task.
 * @param {string} [taskID=currentDraggedElementID] - The ID of the task to move.
 */
// async function moveTo(newTaskStatus, taskID = currentDraggedElementID) {
//   let currentCardElement = document.getElementById("taskCard" + taskID);
//   if (currentCardElement) {
//     currentCardElement.remove();
//   }
//   updateLokalTaskArrayStatus(newTaskStatus, taskID);
//   renderTaskCards();
//   await putNewTaskStatus(newTaskStatus, taskID);
//   await createLokalTasksArray();
//   let dropZones = document.querySelectorAll("[ondrop]");
//   dropZones.forEach((zone) => {
//     zone.classList.remove("drop-zone-active");
//     let noTaskContainer = zone.querySelector(".noTasksContainer");
//     if (noTaskContainer) {
//       noTaskContainer.classList.remove("no-tasks-dragging");
//     }
//   });
// }

/**
 * Removes the task card element from the DOM.
 * 
 * @function removeTaskCard
 * @param {string} taskID - The ID of the task card to be removed.
 * @example
 * // Removes the task card with the given task ID.
 * removeTaskCard(taskID);
 */
function removeTaskCard(taskID) {
  let currentCardElement = document.getElementById("taskCard" + taskID);
  if (currentCardElement) {
    currentCardElement.remove();
  }
}

/**
 * Updates the task's status, rerenders the task cards, and removes active drop zone styles.
 * 
 * @async
 * @function updateTaskStatusAndRender
 * @param {string} newTaskStatus - The new status of the task.
 * @param {string} taskID - The ID of the task whose status is being updated.
 * @example
 * // Updates the task status, renders the updated task cards, and manages the drop zones.
 * await updateTaskStatusAndRender(newTaskStatus, taskID);
 */
async function updateTaskStatusAndRender(newTaskStatus, taskID) {
  updateLokalTaskArrayStatus(newTaskStatus, taskID);  // Update task array status
  renderTaskCards();  // Re-render task cards
  await putNewTaskStatus(newTaskStatus, taskID);  // Update task status in the backend
  await createLokalTasksArray();  // Refresh the local tasks array

  let dropZones = document.querySelectorAll("[ondrop]");
  dropZones.forEach((zone) => {
    zone.classList.remove("drop-zone-active");
    let noTaskContainer = zone.querySelector(".noTasksContainer");
    if (noTaskContainer) {
      noTaskContainer.classList.remove("no-tasks-dragging");
    }
  });
}

/**
 * Moves a task to a new status and manages the DOM and task status update.
 * 
 * @async
 * @function moveTo
 * @param {string} newTaskStatus - The new status to move the task to.
 * @param {string} [taskID=currentDraggedElementID] - The ID of the task to be moved (default: currentDraggedElementID).
 * @example
 * // Moves the task to the new status and handles the DOM updates and status change.
 * await moveTo(newTaskStatus, taskID);
 */
async function moveTo(newTaskStatus, taskID = currentDraggedElementID) {
  removeTaskCard(taskID);  // Remove task card from DOM
  await updateTaskStatusAndRender(newTaskStatus, taskID);  // Update task status and render changes
}


/**
 * Sets the dragging state for the task card by showing or hiding the card based on the provided state.
 *
 * @param {string} state - The state of the card ("floating" or "landed").
 */
function setDraggingStateForCardStyle(state) {
  const currentCardElement = document.getElementById("taskCard" + currentDraggedElementID);
  if (!currentCardElement) return;
  if (state === "floating") {
    currentCardElement.classList.add("hidden");
  } else {
    currentCardElement.classList.remove("hidden");
  }
}

// Hold to move logic

/**
 * Starts a hold gesture to trigger the task card move functionality.
 *
 * @param {Event} e - The event triggered by holding the task card.
 * @param {string} taskID - The ID of the task being held.
 */
function startHold(e, taskID) {
  if (e.type === "contextmenu") e.preventDefault();
  window.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  touchStartTime = new Date().getTime();
  isTouchMoving = false;
  setTimeout(() => !isTouchMoving && document.getElementById(`taskCard${taskID}`).classList.add("growing"), 200);
  touchTimer = setTimeout(() => {
    if (!isTouchMoving && new Date().getTime() - touchStartTime >= 600) {
      e.preventDefault();
      replaceTaskCardWithMoveToTemplate(taskID);
    }
  }, 700);
}

/**
 * Checks for scrolling during a hold event and marks the touch as a move.
 *
 * @param {Event} e - The touch or mouse event.
 */
function checkScroll(e) {
  isTouchMoving = true;
}

/**
 * Clears the hold gesture by resetting variables and stopping the touch timer.
 */
function clearHold() {
  touchStartTime = 0;
  clearTimeout(touchTimer);
  setTimeout(() => {
    window.oncontextmenu = null;
  }, 100);
}
