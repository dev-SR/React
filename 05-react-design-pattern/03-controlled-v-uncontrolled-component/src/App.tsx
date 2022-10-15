// import { useState } from 'react';
// import ControlledModals from './components/ControlledModals';

import UncontrolledOnboardingFlows from './components/UncontrolledOnboardingFlows';

// const ModalContent = () => {
// 	return (
// 		<div className='bg-green-200 h-20'>
// 			<p>Modal Content</p>
// 		</div>
// 	);
// };
// const App = () => {
// 	const [open, setOpen] = useState<boolean>(false);
// 	return (
// 		<>
// 			<button
// 				onClick={() => setOpen(true)}
// 				className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded'>
// 				Show Modal
// 			</button>
// 			<ControlledModals open={open} onClose={() => setOpen(false)}>
// 				<ModalContent />
// 			</ControlledModals>
// 		</>
// 	);
// };
// export default App;

// const StepOne = ({ goToNext }: { goToNext: () => void }) => {
// 	return (
// 		<div className='bg-green-200 h-20'>
// 			<p>Step One</p>
// 			<button
// 				onClick={goToNext}
// 				className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded'>
// 				Next
// 			</button>
// 		</div>
// 	);
// };

// const StepTwo = ({ goToNext }: { goToNext: () => void }) => {
// 	return (
// 		<div className='bg-green-200 h-20'>
// 			<p>Step Two</p>
// 			<button
// 				onClick={goToNext}
// 				className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded'>
// 				Next
// 			</button>
// 		</div>
// 	);
// };

// const StepThree = ({ goToNext }: { goToNext: () => void }) => {
// 	return (
// 		<div className='bg-green-200 h-20'>
// 			<p>Step Three</p>
// 			<button
// 				onClick={goToNext}
// 				className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded'>
// 				Next
// 			</button>
// 		</div>
// 	);
// };

// const App = () => {
// 	return (
// 		<UncontrolledOnboardingFlows>
// 			<StepOne goToNext={undefined as never} />
// 			<StepTwo goToNext={undefined as never} />
// 			<StepThree goToNext={undefined as never} />
// 		</UncontrolledOnboardingFlows>
// 	);
// };

// export default App;

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';

function App() {
	return (
		<Wizard title={'Welcome to my wizard'}>
			<WizardStep header={'Welcome to A'} />
			<WizardStep header={'Welcome to B'} />
			<WizardStep header={'Welcome to C'} />
		</Wizard>
	);
}

export default App;
interface WizardProps {
	title: string;
}

const Wizard: FunctionComponent<PropsWithChildren<WizardProps>> = ({ children, title }) => {
	const [currentStep, setCurrentStep] = useState(1);
	// Validate
	React.Children.forEach(children, (c) => {
		if (!React.isValidElement<WizardStepProps>(c) || c.props['header'] === undefined) {
			throw new Error('child must have a header prop');
		}
	});
	const childrenArray = React.Children.toArray(children);
	const CurrentStepComponent = React.cloneElement(childrenArray[currentStep - 1] as JSX.Element, {
		index: currentStep
	});

	return (
		<div className='flex justify-center items-center flex-col h-screen space-y-4'>
			<h1 className='text-3xl font-bold '>{title}</h1>
			<div className='text-green-500'>{CurrentStepComponent}</div>
			<div>
				<Controls
					onClickPrevious={() => setCurrentStep((s) => (s === 1 ? s : s - 1))}
					onClickNext={() => setCurrentStep((s) => (s === childrenArray.length ? s : s + 1))}
				/>
			</div>
			<h5>{`step ${currentStep} out of ${childrenArray.length}`}</h5>
		</div>
	);
};

const Controls: FunctionComponent<{ onClickPrevious: () => void; onClickNext: () => void }> = ({
	onClickPrevious,
	onClickNext
}) => {
	return (
		<div className='flex space-x-4'>
			<button
				onClick={onClickPrevious}
				className='bg-blue-500 hover:bg-blue-700text-white  py-2 px-4 rounded text-white'>
				Previous
			</button>
			<button
				onClick={onClickNext}
				className='bg-blue-500 hover:bg-blue-700text-white  py-2 px-4 rounded text-white'>
				Next
			</button>
		</div>
	);
};
interface WizardStepProps {
	index?: number;
	header: string;
}

const WizardStep: FunctionComponent<WizardStepProps> = ({ index, header }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
		</div>
	);
};
