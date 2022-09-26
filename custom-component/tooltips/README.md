# Creating Tooltip

## Example 1:

```tsx
type TooltipType = {
	children: React.ReactNode;
	tooltip: React.ReactNode;
};

const Tooltip = ({ children, tooltip }: TooltipType) => {
	const [entered, setEntered] = useState<boolean>(true);
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='relative'>
				<div
					// className='bg-gray-200'
					onMouseEnter={() => {
						setEntered(true);
					}}
					onMouseLeave={() => {
						setEntered(false);
					}}>
					{children}
				</div>
				{entered && (
					<div className='absolute bg-slate-600 flex items-center justify-center rounded-r-lg rounded-tl-lg w-40 h-10 -right-32 -top-8 bor'>
						{tooltip}
					</div>
				)}
			</div>
		</div>
	);
};
const Avater = () => {
	return (
		<img
			src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
			className='border border-r-2 border-black  rounded-full obejct-cover w-20 h-20'
		/>
	);
};
const TooltipBox = () => <p className='text-white'>Tooltip</p>;

const App = () => {
	return (
		<Tooltip tooltip={<TooltipBox />}>
			<Avater />
		</Tooltip>
	);
};

export default App;
```
