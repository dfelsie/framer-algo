import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import ArrayComponent from "../components/ArrayComponent";
import {
  arrayVisualWidthPx,
  arrayVisualWidthSmallScreenPx,
  boxSize,
  boxSizePx,
  boxSizeSmallScreen,
  boxSizeSmallScreenPx,
  numArrayCells,
} from "../consts/consts";
import { TaskQueueWithArray } from "../models/TaskQueueClass";
import {
  makeZeroArrayOfLengthNMotionValuePairs,
  makeSequenceArrayOfLengthN,
} from "../utils/MakeZeroArrayOfLengthN";

import QuickSortAnimationDriver from "../utils/QuickSortPushSteps";
import RandomlyPermuteArray from "../utils/RandomlyPermuteArray";
import timeout from "../utils/TimeoutFunc";

//Fix places with 85 so we can add more cells

//Draw lines to demarcate the array we're currently partitioning
export type PartitionStartEnd = { start: number; end: number };

const initialArrayToShow = RandomlyPermuteArray(
  makeSequenceArrayOfLengthN(numArrayCells)
);

const initialCellCurLocAry = makeSequenceArrayOfLengthN(
  initialArrayToShow.length
);
let taskQueue = new TaskQueueWithArray(initialCellCurLocAry);
let localAnimationVar = false;
export default function Index() {
  const [headingText, setHeadingText] = useState("Quick Sort Animation");
  const [isLargerThan960, isInBrowser] = useMediaQuery([
    "(min-width: 960px)",
    "(display-mode: browser)",
  ]);

  const [cellCurrLocAry, setCellCurrLocAry] = useState(initialCellCurLocAry);
  const [isAnimating, setIsAnimating] = useState(false);
  const [arrayToShow, setArrayToShow] = useState(initialArrayToShow);
  const [arrayOfMVals, setArrayOfMVals] = useState(
    makeZeroArrayOfLengthNMotionValuePairs(arrayToShow.length)
  );
  //  const [highlightAry, setHighlightAry] = useState([]);
  //  const [borderAry, setBorderAry] = useState([]);

  const [firstSelectedIndex, setFirstSelectedIndex] = useState(null);
  const [secondSelectedIndex, setSecondSelectedIndex] = useState(null);

  return (
    <>
      <Center
        flexDir={"column"}
        h={"100vh"}
        justifyContent={"space-around"}
        w={"100%"}
      >
        <Box
          pos="absolute"
          top={0}
          left={0}
          right={0}
          h={"75px"}
          bgColor={"lightgray"}
        >
          <Flex
            justifyContent={"space-around"}
            h={"100%"}
            alignItems={"center"}
          >
            <Button
              onClick={async () => {
                if (taskQueue.internalAry.length === 0) {
                  await QuickSortAnimationDriver(
                    arrayToShow.slice(0, arrayToShow.length),
                    taskQueue
                  );
                }
              }}
            >
              Initialize
            </Button>
            {/* <Select w={"15%"} placeholder="Select option 1">
              {arrayToShow.map((item, index) => (
                <option
                  key={index}
                  value={index}
                  onClick={() => {
                    setFirstSelectedIndex(index);
                  }}
                >
                  Cell {index}
                </option>
              ))}
            </Select>
            <Select w={"15%"} placeholder="Select option">
              {arrayToShow.map((item, index) => (
                <option
                  key={index}
                  value={index}
                  onClick={() => {
                    setSecondSelectedIndex(index);
                  }}
                >
                  Cell {index}
                </option>
              ))}
            </Select> */}
            <Box>
              {/* <IconButton
                height={"50px"}
                aria-label="Previous"
                icon={<ArrowLeftIcon />}
              >
                Reset
              </IconButton> */}
              <Button
                height={"50px"}
                aria-label="One Step"
                onClick={async () => {
                  if (taskQueue.internalAry.length === 0) {
                    setHeadingText("Please Initialize Array");
                    return;
                  }
                  if (isAnimating) {
                    return;
                  }
                  //taskQueueStuff();
                  setIsAnimating(true);
                  await taskQueue.doStep(
                    setArrayOfMVals,
                    arrayOfMVals,
                    setHeadingText,
                    !isLargerThan960 ? boxSizeSmallScreen : boxSize
                  );
                  setIsAnimating(false);
                }}
              >
                One Step
              </Button>
              <IconButton
                ml={"15px"}
                height={"50px"}
                aria-label="Play"
                icon={isAnimating ? <CloseIcon /> : <ArrowRightIcon />}
                onClick={async () => {
                  if (taskQueue.internalAry.length === 0) {
                    setHeadingText("Please Initialize Array");
                    return;
                  }
                  if (isAnimating) {
                    setIsAnimating(false);
                    localAnimationVar = false;
                    return;
                  }
                  setIsAnimating(true);
                  localAnimationVar = true;
                  while (taskQueue.internalAry.length > 0) {
                    await taskQueue.doStep(
                      setArrayOfMVals,
                      arrayOfMVals,
                      setHeadingText,
                      !isLargerThan960 ? boxSizeSmallScreen : boxSize
                    );
                    await timeout(250);
                    if (!isAnimating && !localAnimationVar) {
                      return;
                    }
                  }
                  //All done!
                  setIsAnimating(false);
                  setHeadingText("Quick Sort Animation");
                }}
              ></IconButton>
            </Box>
          </Flex>
        </Box>
        <Box pos="absolute" top={120} w="85%" textAlign={"center"}>
          <Heading fontSize={isLargerThan960 ? "4xl" : "2xl"}>
            {headingText}
          </Heading>
        </Box>
        <ArrayComponent
          arrayOfLocations={arrayOfMVals}
          arrayToShow={arrayToShow}
          firstIndexToSwap={firstSelectedIndex}
          secondIndexToSwap={secondSelectedIndex}
          arrayWidth={
            !isLargerThan960
              ? arrayVisualWidthSmallScreenPx
              : arrayVisualWidthPx
          }
          boxWidth={!isLargerThan960 ? boxSizeSmallScreenPx : boxSizePx}
        ></ArrayComponent>
      </Center>
    </>
  );
}
