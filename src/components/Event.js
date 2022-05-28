import { useDispatch, useSelector } from 'react-redux';
import { setHours } from '../store/slices/dataSlice';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
	Heading,
	Text,
	Flex,
	useDisclosure,
	Menu,
	IconButton,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
function Event({ index, event, editEvent, editEventModal }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const ctx = useSelector((state) => state.data);
	const dispatch = useDispatch();

	const deleteEvent = () => {
		const newHour = [...ctx.hours];
		newHour[index] = newHour[index].filter((e, i) => i !== index);
		dispatch(setHours(newHour));
		onClose();
	};

	return (
		<Flex key={index} border='1px' p='4px' m='4px' flexDir={'column'}>
			<Menu isOpen={isOpen}>
				<MenuButton
					sx={{
						size: 'sm',
						ml: '100px',
						width: 'fit-content',
						backgroundColor: 'white',
					}}
					boxShadow={'none !important'}
					as={IconButton}
					icon={<BsThreeDotsVertical />}
					variant='outline'
					onMouseEnter={onOpen}
					onMouseLeave={onClose}
				/>
				<MenuList onMouseEnter={onOpen} onMouseLeave={onClose} minWidth='148px'>
					<MenuItem onClick={() => editEventModal(index)}> Edit </MenuItem>
					<MenuItem onClick={() => deleteEvent(index)}> Delete </MenuItem>
				</MenuList>
			</Menu>
			<Heading size={'sm'} textDecoration={'underline'}>
				{event.name}
			</Heading>
			<Text>{event.desc}</Text>
		</Flex>
	);
}

export default Event;
