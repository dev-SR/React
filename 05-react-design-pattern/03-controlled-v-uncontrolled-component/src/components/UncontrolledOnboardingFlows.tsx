import React from 'react';
type UncontrolledOnboardingFlowsProps = {
	children: React.ReactNode;
	onFinish?: () => void;
};

const UncontrolledOnboardingFlows = ({ children, onFinish }: UncontrolledOnboardingFlowsProps) => {
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);

	const goToNext = () => {
		setCurrentIndex(currentIndex + 1);
	};

	const currentChild = React.Children.toArray(children)[currentIndex] as React.ReactElement<
		any,
		string | React.JSXElementConstructor<any>
	>;

	if (React.isValidElement(currentChild)) {
		return React.cloneElement(currentChild as React.ReactElement, { goToNext });
	}

	return currentChild;
};

export default UncontrolledOnboardingFlows;
