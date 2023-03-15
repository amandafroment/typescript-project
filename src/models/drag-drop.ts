// Drag and Drop Interface

export interface Draggable {
  //methods
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  // signals to the browser that this is a valid drag target
  dragOverHandler(event: DragEvent): void;
  // needs to react to the drop happening
  dropHandler(event: DragEvent): void;
  // giving visual feedback to the user to show that it's dropped/or not
  dragLeaveHandler(event: DragEvent): void;
}
