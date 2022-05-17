import { TaskQueueWithArray } from "../models/TaskQueueClass";
import TaskQueueStep from "../models/TaskQueueStep";

export type QuickSortStepNames = "partition" | "swap" | "internal";

export class QuickSortStep extends TaskQueueStep {
  stepName: QuickSortStepNames;
  constructor(stepName: QuickSortStepNames) {
    super(stepName);
  }
}

export class QuickSortInternalStep extends QuickSortStep {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    super("internal");
    this.start = start;
    this.end = end;
  }
}

export class QuickSortPartitionStep extends QuickSortStep {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    super("partition");
    this.start = start;
    this.end = end;
  }
}

export class QuickSortSwapStep extends QuickSortStep {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    super("swap");
    this.start = start;
    this.end = end;
  }
}
//Push QuickSortSteps to taskAry, where it can provide the other args for animation

/* function makeAnimationForQuickSortStep(step: QuickSortStep) {
  return () => {
    const { functionName, payload } = step;
    switch (functionName) {
      case "partition":
        //return partitionAnimation(payload);
        return null;
        return;
      case "swap":
        return swapAnimation(payload);
      default:
        return null;
    }
  };
} */

async function QuickSortInternal(
  array: any[],
  start: number,
  end: number,
  taskAry: TaskQueueWithArray
): Promise<void> {
  if (start < end) {
    const pivotIndex = await partition(array, start, end, taskAry);
    QuickSortInternal(array, start, pivotIndex - 1, taskAry);
    QuickSortInternal(array, pivotIndex + 1, end, taskAry);
  }
}

async function partition(
  array: any[],
  start: number,
  end: number,
  taskAry: TaskQueueWithArray
): Promise<number> {
  const pivotIndex = end;
  let i = start;
  let j = start - 1;
  while (i < end) {
    if (array[i] < array[pivotIndex]) {
      j++;
      swap(array, j, i);
      if (i !== j) taskAry.push(new QuickSortSwapStep(j, i));
    }
    i++;
  }
  j++;
  swap(array, j, pivotIndex);
  if (j !== pivotIndex) taskAry.push(new QuickSortSwapStep(j, pivotIndex));

  return j;
}

async function swap(array: any[], i: number, j: number): Promise<void> {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export default async function QuickSortAnimationDriver(
  array: any[],
  taskAry: TaskQueueWithArray
): Promise<any[]> {
  await QuickSortInternal(array, 0, array.length - 1, taskAry);
  return array;
}
