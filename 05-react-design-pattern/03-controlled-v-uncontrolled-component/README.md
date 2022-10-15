# Controlled vs UnControlled Component

- [Controlled vs UnControlled Component](#controlled-vs-uncontrolled-component)
  - [Comparison](#comparison)
  - [Example](#example)
    - [Controlled modals](#controlled-modals)
    - [Uncontrolled OnBoarding](#uncontrolled-onboarding)
      - [v1](#v1)
      - [v2](#v2)
    - [Controlled OnBoarding](#controlled-onboarding)

## Comparison

- `Uncontrolled Component`:
  - Components that keep track of their own state and release data only when some event occurs (i.e the submit event for HTML forms)

```tsx
const UnControlled = ({onSubmit})=>{
 const [someState,setState] = useState(...);
 return ....;
}

const App = ()=>{
 const onSubmit = (data)=>{
  // do something with data
 }
 return <UnControlled onSubmit={onSubmit} />
}
```

- `Controlled Component`:
  - Components that do not keep track of their own state - all states is passed in as props

```tsx
const Controlled = ({data,handleDataChange,onSubmit}) =>{
 reutrn ....;
}

const App = ()=>{
 const [data,setData] = useState(...);
 const handleDataChange = (data)=>{
  setData(data);
 }
 const onSubmit = (data)=>{
  // do something with data
 }
 return <Controlled data={data} handleDataChange={handleDataChange} onSubmit={onSubmit} />
}
```

> We generally prefer to use **controlled components** because they are easier to test and debug.

## Example

### Controlled modals

```tsx
import { useState } from 'react';
import ControlledModals from './components/ControlledModals';

const ModalContent = () => {
 return (
  <div className='bg-green-200 h-20'>
   <p>Modal Content</p>
  </div>
 );
};
const App = () => {
 const [open, setOpen] = useState<boolean>(false);
 return (
  <>
   <button
    onClick={() => setOpen(true)}
    className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded'>
    Show Modal
   </button>
   <ControlledModals open={open} onClose={() => setOpen(false)}>
    <ModalContent />
   </ControlledModals>
  </>
 );
};
export default App;
```

```tsx
import React from 'react';
type ControlledModalsProps = {
 open: boolean;
 onClose: () => void;
 children: React.ReactNode;
};

const className = {
 overlay: 'fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50',
 modal_body:
  'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 h-1/2',
 content: 'p-4',
 divider: 'w-full h-px bg-gray-300'
};

const ControlledModals = ({ children, open, onClose }: ControlledModalsProps) => {
 return (
  <>
   {open && (
    <div className={className.overlay} onClick={onClose}>
     <div className={className.modal_body} onClick={(e) => e.stopPropagation()}>
      <button
       onClick={onClose}
       className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded'>
       Close Modal
      </button>
      <div className={className.divider} />
      <div className={className.content}>{children}</div>
     </div>
    </div>
   )}
  </>
 );
};
export default ControlledModals;
```

### Uncontrolled OnBoarding

#### v1

- [https://eliya-b.medium.com/react-with-typescript-by-example-pass-props-to-children-6d37332ee434](https://eliya-b.medium.com/react-with-typescript-by-example-pass-props-to-children-6d37332ee434)
- [https://www.smashingmagazine.com/2021/08/react-children-iteration-methods/](https://www.smashingmagazine.com/2021/08/react-children-iteration-methods/)

```tsx
import React, { FC,  PropsWithChildren, useState } from 'react';
interface StepProps {
 index?: number; //<- index must be optional;
 // as this will be push by `UncontrolledOnboarding` component
 header: string;
}

const Step: FC<StepProps> = ({ index, header }) => {
 return (
  <div>
   <h3>{header}</h3>
   <h4>{`Step number ${index} `}</h4>
  </div>
 );
};

function App() {
 return (
  <UncontrolledOnboarding title={'Welcome to my uncontrolled onboarding'}>
   <Step header={'Welcome to A'} />
   <Step header={'Welcome to B'} />
   <Step header={'Welcome to C'} />
  </UncontrolledOnboarding>
 );
}

export default App;

interface OnboardingProps {
 title: string;
}

const UncontrolledOnboarding: FC<PropsWithChildren<OnboardingProps>> = ({ children, title }) => {
 const [currentStep, setCurrentStep] = useState(1);
 const goToNext = () => {
  setCurrentStep((s) => (s === childrenArray.length ? s : s + 1));
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
  index: currentStep
 });

 return (
  <div className='flex justify-center items-center flex-col h-screen space-y-4'>
   <h1 className='text-3xl font-bold '>{title}</h1>
   <div className='text-green-500'>{CurrentStepComponent}</div>
   <div>
    <Controls onClickPrevious={goToPrevious} onClickNext={goToNext} />
   </div>
   <h5>{`step ${currentStep} out of ${childrenArray.length}`}</h5>
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


```

#### v2

```tsx

import React, { FC, PropsWithChildren, useState } from 'react';
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

const Step1: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
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
const Step2: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
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
const Step3: FC<StepProps> = ({ index, header, goToNext, goToPrevious, childrenLen }) => {
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
function App() {
 return (
  <UncontrolledOnboarding
   title={'Welcome to my uncontrolled onboarding'}
   onFinish={(data) => alert(JSON.stringify(data, null, 4))}>
   <Step1 header={'Welcome to A'} />
   <Step2 header={'Welcome to B'} />
   <Step3 header={'Welcome to C'} />
  </UncontrolledOnboarding>
 );
}

export default App;

interface OnboardingProps {
 title: string;
 onFinish: (data: AnyObject) => void;
}

const UncontrolledOnboarding: FC<PropsWithChildren<OnboardingProps>> = ({
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

```

### Controlled OnBoarding

```tsx
import React, { FC, PropsWithChildren, useState } from 'react';

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
 //  if (!React.isValidElement<StepProps>(child) || child.props['header'] === undefined) {
 //   throw new Error('child must have a header prop');
 //  }
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
```
