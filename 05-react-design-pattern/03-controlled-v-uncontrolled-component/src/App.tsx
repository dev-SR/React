// import { useState } from 'react';
// import ControlledModals from './components/ControlledModals';

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

import React, { FC, PropsWithChildren, useState } from 'react';
type AnyObject = {
	[key: string]: any;
};

interface StepProps {
	index?: number; //<- index must be optional;
	// as this will be push by `UncontrolledOnboarding` component,
	childrenLen?: number;
	goToNext?: (setData: AnyObject, childrenLen: number) => void;
	goToPrevious?: () => void;
	header: string;
}

const Step1: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
			<div>
				{goToNext && goToPrevious && childrenLen && (
					<Controls
						onClickPrevious={goToPrevious}
						onClickNext={() => goToNext({ name: 'A', email: 'A@' }, childrenLen)}
					/>
				)}
			</div>
			<h5>{`step ${index} out of ${childrenLen}`}</h5>
		</div>
	);
};
const Step2: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
			<div>
				{goToNext && goToPrevious && childrenLen && (
					<Controls
						onClickPrevious={goToPrevious}
						onClickNext={() => goToNext({ age: 17, password: 'A@' }, childrenLen)}
					/>
				)}
			</div>
			<h5>{`step ${index} out of ${childrenLen}`}</h5>
		</div>
	);
};
const Step3: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
			<div>
				{goToNext && goToPrevious && childrenLen && (
					<Controls
						onClickPrevious={goToPrevious}
						onClickNext={() => goToNext({ address: 'A', occupation: 'A@' }, childrenLen)}
					/>
				)}
			</div>
			<h5>{`step ${index} out of ${childrenLen}`}</h5>
		</div>
	);
};
const AgeRestriction: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
			<div>
				{goToNext && goToPrevious && childrenLen && (
					<Controls
						onClickPrevious={goToPrevious}
						onClickNext={() => goToNext({ visit: true }, childrenLen)}
					/>
				)}
			</div>
			<h5>{`step ${index} out of ${childrenLen}`}</h5>
		</div>
	);
};

function App() {
	const [currentStep, setCurrentStep] = useState(1);
	const [onboardingData, setOnboardingData] = useState<AnyObject>({});

	const goToNext = (setData: AnyObject, childrenLen: number) => {
		console.log(setData);

		const updatedData = {
			...onboardingData,
			...setData
		};
		setOnboardingData(updatedData);
		if (currentStep < childrenLen) {
			setCurrentStep((s) => (s === childrenLen ? s : s + 1));
		} else {
			// onFinish(onboardingData);
		}
	};
	const goToPrevious = () => {
		setCurrentStep((s) => (s === 1 ? s : s - 1));
	};
	return (
		<ControlledOnboarding
			title={'Welcome to my uncontrolled onboarding'}
			goToNext={goToNext}
			currentStep={currentStep}
			goToPrevious={goToPrevious}>
			<Step1 header={'Welcome to A'} />
			<Step2 header={'Welcome to B'} />
			{onboardingData.age < 18 && <AgeRestriction header={'Age Restriction'} />}
			<Step3 header={'Welcome to C'} />
		</ControlledOnboarding>
	);
}

export default App;

interface OnboardingProps {
	title: string;
	goToNext: (setData: AnyObject, childrenLen: number) => void;
	goToPrevious: () => void;
	currentStep: number;
}

const ControlledOnboarding: FC<PropsWithChildren<OnboardingProps>> = ({
	children,
	title,
	goToNext,
	currentStep,
	goToPrevious
}) => {
	// Validate
	// React.Children.forEach(children, (child) => {
	// 	if (!React.isValidElement<StepProps>(child) || child.props['header'] === undefined) {
	// 		throw new Error('child must have a header prop');
	// 	}
	// });
	//
	const childrenArray = React.Children.toArray(children);
	const selectedChild = childrenArray[currentStep - 1] as JSX.Element;
	const CurrentStepComponent = React.cloneElement(selectedChild, {
		index: currentStep,
		goToNext,
		goToPrevious,
		childrenLen: childrenArray.length
	});

	return (
		<div className='flex justify-center items-center flex-col h-screen space-y-4'>
			<h1 className='text-3xl font-bold '>{title}</h1>
			<div className='text-green-500'>{CurrentStepComponent}</div>
		</div>
	);
};

const Controls: FC<{ onClickPrevious: () => void; onClickNext: () => void }> = ({
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
