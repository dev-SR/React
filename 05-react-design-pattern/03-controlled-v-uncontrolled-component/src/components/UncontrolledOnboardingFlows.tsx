// function App() {
// 	return (
// 		<UncontrolledOnboarding
// 			title={'Welcome to my uncontrolled onboarding'}
// 			onFinish={(data) => alert(JSON.stringify(data, null, 4))}>
// 			<Step1 header={'Welcome to A'} />
// 			<Step2 header={'Welcome to B'} />
// 			<Step3 header={'Welcome to C'} />
// 		</UncontrolledOnboarding>
// 	);
// }

import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
type AnyObject = {
	[key: string]: any;
};

interface StepProps {
	index?: number; //<- index must be optional;
	// as this will be push by `UncontrolledOnboarding` component,
	childrenLen?: number;
	goToNext?: (setData: AnyObject) => void;
	goToPrevious?: () => void;
	header: string;
}

export const Step1: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
			<div>
				{goToNext && goToPrevious && (
					<Controls
						onClickPrevious={goToPrevious}
						onClickNext={() => goToNext({ name: 'A', email: 'A@' })}
					/>
				)}
			</div>
			<h5>{`step ${index} out of ${childrenLen}`}</h5>
		</div>
	);
};
export const Step2: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
			<div>
				{goToNext && goToPrevious && (
					<Controls
						onClickPrevious={goToPrevious}
						onClickNext={() => goToNext({ password: 'A', password_2: 'A@' })}
					/>
				)}
			</div>
			<h5>{`step ${index} out of ${childrenLen}`}</h5>
		</div>
	);
};
export const Step3: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
	return (
		<div>
			<h3>{header}</h3>
			<h4>{`Step number ${index} `}</h4>
			<div>
				{goToNext && goToPrevious && (
					<Controls
						onClickPrevious={goToPrevious}
						onClickNext={() => goToNext({ address: 'A', occupation: 'A@' })}
					/>
				)}
			</div>
			<h5>{`step ${index} out of ${childrenLen}`}</h5>
		</div>
	);
};

interface OnboardingProps {
	title: string;
	onFinish: (data: AnyObject) => void;
}

export const UncontrolledOnboarding: FC<PropsWithChildren<OnboardingProps>> = ({
	children,
	title,
	onFinish
}) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [onboardingData, setOnboardingData] = useState<AnyObject>({});

	const goToNext = (setData: AnyObject) => {
		const updatedData = {
			...onboardingData,
			...setData
		};
		setOnboardingData(updatedData);
		if (currentStep < childrenArray.length) {
			setCurrentStep((s) => (s === childrenArray.length ? s : s + 1));
		} else {
			onFinish(onboardingData);
		}
	};
	const goToPrevious = () => {
		setCurrentStep((s) => (s === 1 ? s : s - 1));
	};

	// Validate
	React.Children.forEach(children, (child) => {
		if (!React.isValidElement<StepProps>(child) || child.props['header'] === undefined) {
			throw new Error('child must have a header prop');
		}
	});
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
