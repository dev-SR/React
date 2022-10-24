import {
	Button,
	Checkbox,
	IconButton,
	Input,
	Select,
	Stack,
	useColorMode,
	VStack,
	Text,
	useColorModeValue,
	Center
} from '@chakra-ui/react';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';

export const Customize = () => {
	const { toggleColorMode, colorMode } = useColorMode();
	const bgColor = useColorModeValue('gray.100', 'gray.900');
	const secondaryTextColor = useColorModeValue('pink.500', 'pink.100');

	return (
		<VStack width={'full'} h='100vh' alignItems={'center'} justifyContent='center'>
			<Button colorScheme={'primary'} size='sm'>
				Primary
			</Button>
			<Button colorScheme={'secondary'} size='sm' fontWeight={'light'}>
				Secondary
			</Button>
			<Button
				size='md'
				height='30px'
				width='200px'
				border='1px'
				fontWeight={'light'}
				fontSize='sm'
				borderColor='blue.600'
				backgroundColor='blue.300'
				color={'white'}
				_hover={{ bg: 'blue.400' }}
				_active={{
					bg: 'blue.700',
					transform: 'scale(0.98)',
					borderColor: '#bec3c9'
				}}>
				Custom
			</Button>
			<Checkbox>Primary colorScheme is extended by Checkbox </Checkbox>
			<Stack spacing={3}>
				<Input placeholder='By default filled' />
				<Select placeholder='Select option'>
					<option value='option1'>Option 1</option>
					<option value='option2'>Option 2</option>
					<option value='option3'>Option 3</option>
				</Select>
			</Stack>

			<IconButton
				colorScheme='gray'
				aria-label='Search database'
				onClick={toggleColorMode}
				icon={
					colorMode === 'light' ? (
						<BsMoonFill className='text-gray-500 w-6 h-6  hover:text-gray-400' />
					) : (
						<BsFillSunFill className='text-yellow-500 w-6 h-6  hover:text-yellow-400 ' />
					)
				}
			/>
			<Center bg={bgColor} w='100%' p={4} color='white'>
				<Text color={secondaryTextColor}>This is the Box</Text>
			</Center>
			<Button>Base Style</Button>
		</VStack>
	);
};
