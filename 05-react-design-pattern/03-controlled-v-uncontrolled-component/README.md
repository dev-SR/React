# Controlled vs UnControlled Component

- [Controlled vs UnControlled Component](#controlled-vs-uncontrolled-component)
	- [Comparison](#comparison)
	- [Example](#example)
		- [Controlled modals](#controlled-modals)
		- [Uncontrolled OnBoarding](#uncontrolled-onboarding)

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

- [https://eliya-b.medium.com/react-with-typescript-by-example-pass-props-to-children-6d37332ee434](https://eliya-b.medium.com/react-with-typescript-by-example-pass-props-to-children-6d37332ee434)
- [https://www.smashingmagazine.com/2021/08/react-children-iteration-methods/](https://www.smashingmagazine.com/2021/08/react-children-iteration-methods/)


```tsx
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

```
