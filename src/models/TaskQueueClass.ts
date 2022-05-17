import { MotionValue } from "framer-motion";
import {
  animationHorizontalTranslationHeight,
  defaultTimeoutLength,
} from "../consts/consts";
import { QuickSortStep, QuickSortSwapStep } from "../utils/QuickSortPushSteps";
import timeout from "../utils/TimeoutFunc";

export class TaskQueueWithArray {
  internalAry: QuickSortStep[];
  cellCurrLocAry: number[];
  doneSteps: QuickSortStep[];

  constructor(cellCurrLocAry: number[]) {
    this.internalAry = [];
    this.cellCurrLocAry = cellCurrLocAry;
    this.doneSteps = [];
  }

  push(step: QuickSortStep) {
    this.internalAry.push(step);
  }

  async doStep(
    setLocAry,
    motionValueAry: MotionValue<any>[][],
    setHeadingText: (text: string) => void,
    boxSize: number
  ) {
    const step = this.internalAry.shift();
    if (step) {
      const { stepName } = step;
      switch (stepName) {
        case "partition":
          this.doneSteps.push(step);
          setHeadingText("Partitioning");
          return null;
        //return partitionAnimation(payload);
        case "swap":
          let swapStep = step as QuickSortSwapStep;
          let start = swapStep.start;
          let end = swapStep.end;
          setHeadingText("Swapping positions " + start + " and " + end);
          await this.animateSwap(
            start,
            end,
            setLocAry,
            motionValueAry,
            boxSize
          );
          this.doneSteps.push(step);
        default:
          this.doneSteps.push(step);
          return null;
      }
    }
  }

  async drawPartition(start: number, end: number) {}

  async animateSwap(
    firstSelectedIndex: number,
    secondSelectedIndex: number,
    setLocAry,
    motionValueAry: MotionValue<any>[][],
    boxSize: number
  ) {
    const firstMotionValuePair =
      motionValueAry[this.cellCurrLocAry[firstSelectedIndex]];
    const secondMotionValuePair =
      motionValueAry[this.cellCurrLocAry[secondSelectedIndex]];
    const firstSelectedCellsMoved = firstMotionValuePair[0].get() / boxSize;
    const secondSelectedCellsMoved = secondMotionValuePair[0].get() / boxSize;
    const firstCoeff = firstSelectedIndex > secondSelectedIndex ? -1 : 1;
    const secondCoeff = firstCoeff === -1 ? 1 : -1;
    const numCellsToMove = Math.abs(firstSelectedIndex - secondSelectedIndex);
    //Before first timeout
    firstMotionValuePair[1].set(animationHorizontalTranslationHeight);
    secondMotionValuePair[1].set(-animationHorizontalTranslationHeight);
    setLocAry([...motionValueAry]);
    await timeout(defaultTimeoutLength).then(async () => {
      //After first timeout
      firstMotionValuePair[0].set(
        firstMotionValuePair[0].get() + numCellsToMove * firstCoeff * boxSize
      );
      secondMotionValuePair[0].set(
        secondMotionValuePair[0].get() + numCellsToMove * secondCoeff * boxSize
      );
      setLocAry([...motionValueAry]);
      await timeout(defaultTimeoutLength).then(() => {
        firstMotionValuePair[1].set(0);
        secondMotionValuePair[1].set(0);
        let tempLoc = this.cellCurrLocAry[secondSelectedIndex];
        this.cellCurrLocAry[secondSelectedIndex] =
          this.cellCurrLocAry[firstSelectedIndex];
        this.cellCurrLocAry[firstSelectedIndex] = tempLoc;
        setLocAry([...motionValueAry]);
        //setCellCurrLocAry([...this.cellCurrLocAry]);
        return 0;
      });
    });

    /*  setTimeout(() => {
      firstMotionValuePair[1].set(animationHorizontalTranslationHeight);
      secondMotionValuePair[1].set(-animationHorizontalTranslationHeight);
      setLocAry([...motionValueAry]);
      setTimeout(() => {
        firstMotionValuePair[0].set(
          firstMotionValuePair[0].get() + numCellsToMove * firstCoeff * boxSize
        );
        secondMotionValuePair[0].set(
          secondMotionValuePair[0].get() +
            numCellsToMove * secondCoeff * boxSize
        );
        setLocAry([...motionValueAry]);
        setTimeout(() => {
          firstMotionValuePair[1].set(0);
          secondMotionValuePair[1].set(0);
          let tempLoc = this.cellCurrLocAry[secondSelectedIndex];
          this.cellCurrLocAry[secondSelectedIndex] =
            this.cellCurrLocAry[firstSelectedIndex];
          this.cellCurrLocAry[firstSelectedIndex] = tempLoc;
          setLocAry([...motionValueAry]);
          //setCellCurrLocAry([...this.cellCurrLocAry]);
          return 0;
        }, 1100);
      }, 1100);
    }); */
  }
}
