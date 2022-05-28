import {
	Button,
	Heading,
	Flex,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	FormControl,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setHours } from '../store/slices/dataSlice';
import Event from './Event';

function Hour({ index, hour }) {
	const ctx = useSelector((state) => state.data);
	const dispatch = useDispatch();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1} = useDisclosure();
	const {	isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
	const name = useRef();
	const desc = useRef();
	const [editState, setEditState] = useState({});
	const [editId, setEditId] = useState(null);

	const addEvent = () => {
		const newHour = [...ctx.hours];
		newHour[index] = [
			...newHour[index],
			{ name: name.current.value, desc: desc.current.value },
		];
		dispatch(setHours(newHour));
		onClose1();
	};

	const editEventModal = (id) => {
		setEditId(id);
		setEditState({
			name: ctx.hours[index][id].name,
			desc: ctx.hours[index][id].desc,
		});
		onOpen2();
	};

	const editEvent = () => {
		console.log(editId, index);
		const newHour = [...ctx.hours];
		newHour[index] = newHour[index].map((e, i) =>
			i === editId ? { name: name.current.value, desc: desc.current.value } : e
		);
		dispatch(setHours(newHour));
		onClose2();
	};

	return (
		<Flex
			key={index}
			ml='10px'
			height='100px'
			alignItems='center'
			justifyContent='space-between'
		>
			{hour.map((event, index) => (
				<Event
					key={index}
					index={index}
					event={event}
					editEvent={editEvent}
					editEventModal={editEventModal}
				/>
			))}
			<Heading size={'2xl'} onClick={onOpen1} ml='8px'>
				<BsPlusCircleDotted />
			</Heading>
			<Modal isOpen={isOpen1} onClose={onClose1}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Blog details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={onClose1}>
							<FormControl>
								<Input
									name='title'
									placeholder='Title'
									type='text'
									mb='4px'
									ref={name}
								/>
								<Input
									name='content'
									placeholder='Description'
									type='text'
									mb='4px'
									ref={desc}
								/>
							</FormControl>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={addEvent}>
							Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={isOpen2} onClose={onClose2}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Event</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={onClose2}>
							<FormControl>
								<Input
									name='title'
									placeholder='Title'
									type='text'
									mb='4px'
									defaultValue={editState.name}
									ref={name}
								/>
								<Input
									name='content'
									placeholder='Description'
									type='text'
									mb='4px'
									defaultValue={editState.desc}
									ref={desc}
								/>
							</FormControl>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={() => editEvent(index)}>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default Hour;
