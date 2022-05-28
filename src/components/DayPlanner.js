import { Text, Flex, SimpleGrid, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Hour from './Hour';
function DayPlanner() {

	const ctx = useSelector((state) => state.data);
  return (
    <Flex>
    <SimpleGrid row={24}>
		{
      ctx['hours'].map((hour, index) => (
        <Flex key={index}  width='1400px'>
            <Text width={'60px'}>{index<12 ? index+1 + " AM" : index-11 + " PM"}</Text>
            <Hour index={index} hour={hour}/>
            <Divider/>
        </Flex>
			))
    }
      </SimpleGrid>
      
    </Flex>
  );
}

export default DayPlanner;
