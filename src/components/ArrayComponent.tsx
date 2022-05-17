import { ArrowDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import ArrayCellComponent from "./ArrayCellComponent";

export default function ArrayComponent({
  arrayToShow,
  arrayOfLocations,
  firstIndexToSwap = null,
  secondIndexToSwap = null,
  arrayWidth,
  boxWidth,
}) {
  return (
    <Flex flexDir={"column"} m="auto">
      {/* <Flex w={arrayLengthPx} h={"100px"} justifyContent={"space-evenly"}>
        {arrayToShow.map((item, index) => (
          <Box key={`arrowBoxIconNo${index}`}>
            <ArrowDownIcon  w={boxWidth}></ArrowDownIcon>
          </Box>
        ))}
      </Flex> */}
      <Flex w={arrayWidth} h={"100px"}>
        {arrayToShow.map((item, index) => {
          const thisOneIsChosen =
            firstIndexToSwap === index || secondIndexToSwap === index;
          return (
            <Flex key={index} flexDir={"column"} width={boxWidth}>
              <ArrowDownIcon
                boxSize={"36px"}
                opacity={thisOneIsChosen ? "1" : "0"}
              ></ArrowDownIcon>
              <ArrayCellComponent
                displayLabel={item}
                motionValPair={arrayOfLocations[index]}
                boxWidth={boxWidth}
              ></ArrayCellComponent>
              <Box>{index}</Box>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
