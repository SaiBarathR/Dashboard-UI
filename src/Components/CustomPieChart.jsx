import { Box, Text } from '@chakra-ui/react'
import React from 'react'
// import DonutChart from "react-donut-chart";

export default function CustomPieChart() {
  return (
    <Box className='w-[98%] lg:w-[50%] xl:w-[35%]  h-[40vh]  custom-bar-graph-container flex flex-col '>
      <Box className='flex flex-col flex-grow'>
        <Text fontSize={'22px'} fontWeight={600} color={'#000'}>
          Customers
        </Text>
        <Text fontSize={'14px'} color={'#ACACAC'}>
          Customers that buy products
        </Text>
      </Box>
      <Box className='w-[100%] h-[40vh] mt-4'>
        {/* <Dougnut /> */}
      </Box>
    </Box>
  )
}


// const reactDonutChartdata = [
//   {
//     label: "15 % Total Retained",
//     value: 15,
//     color: "#FF007A"
//   },
//   {
//     label: "65% Total New Customers",
//     value: 65,
//     color: "#4623E9"
//   },
//   {
//     label: "20% Un-Categarised",
//     value: 20,
//     color: "#F1EFFB"
//   },

// ];

// const reactDonutChartBackgroundColor = [
//   "#FF007A",
//   "#4623E9",
//   "#F1EFFB",
// ];

// const reactDonutChartSelectedOffset = 0.04;
// const reactDonutChartHandleClick = (item, toggled) => {
//   if (toggled) {
//     console.log(item);
//   }
// };
// let reactDonutChartStrokeColor = "#FFFFFF";
// const reactDonutChartOnMouseEnter = (item) => {
//   let color = reactDonutChartdata.find((q) => q.label === item.label).color;
//   reactDonutChartStrokeColor = color;
// };

// function Dougnut() {
//   return (
//     <div className="App">
//       <DonutChart
//         width={400}
//         onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
//         strokeColor={reactDonutChartStrokeColor}
//         data={reactDonutChartdata}
//         colors={reactDonutChartBackgroundColor}
//         selectedOffset={reactDonutChartSelectedOffset}
//         innerRadius={0.65}
//         onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
//         legend={false}
//       />
//     </div>
//   );
// }
