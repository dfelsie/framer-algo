import { Box, Text } from "@chakra-ui/react";
import { motion, MotionValue } from "framer-motion";
import React from "react";
import { boxSizePx, defaultAnimationStepDuration } from "../consts/consts";

type Props = {
  displayLabel: string;
  motionValPair: Array<MotionValue>;
  boxWidth: string;
};

export default function ArrayCellComponent({
  displayLabel,
  motionValPair,
  boxWidth,
}: Props) {
  const [motionValX, motionValY] = motionValPair;
  const variant = {
    initial: {
      x: motionValX.get(),
      y: motionValY.get(),
      transition: { duration: defaultAnimationStepDuration },
    },
  };
  //set duration to .5
  return (
    <motion.div
      style={{ width: boxWidth }}
      variants={variant}
      animate={"initial"}
    >
      <Box h={"50px"} w={boxWidth} border={"1px solid purple"}>
        <Text>{displayLabel}</Text>
      </Box>
    </motion.div>
  );
}
