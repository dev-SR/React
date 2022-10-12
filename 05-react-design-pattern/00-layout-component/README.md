# Layout Component

## Main Idea

- Component should not know where they're being displayed.
- Using `children` prop to render Component's children.

## Example

### SplitScreen

```tsx
const SplitScreen = ({ children }: { children: React.ReactNode[] }) => {
 const [left, right] = children;

 return (
  <div className='flex flex-row'>
   <div className='w-1/2'>{left}</div>
   <div className='w-1/2'>{right}</div>
  </div>
 );
};

const LeftHandComponent = ({ props }: { props: any }) => {
 return <div className='bg-red-200 h-20'>Left</div>;
};

const RightHandComponent = ({ props }: { props: any }) => {
 return <div className='bg-blue-200 h-20'> Right</div>;
};


const App = () => {
 return (
  <>
   <SplitScreen>
    <LeftHandComponent props='left-hand' />
    <RightHandComponent props='right-hand' />
   </SplitScreen>
  </>
 );
};
```

### Modal

`Modal.tsx`

```tsx
const className = {
 overlay: 'fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50',
 modal_body:
  'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 h-1/2',
 content: 'p-4',
 divider: 'w-full h-px bg-gray-300'
};

type ModalProps = {
 children: React.ReactNode;
 show: boolean;
 onClose: () => void;
};

const Modal = ({ children, show, onClose }: ModalProps) => {
 return (
  <>
   {show && (
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

export default Modal;

```

`App.tsx`

```tsx
const ModalContent = () => {
 return (
  <div className='bg-green-200 h-20'>
   <p>Modal Content</p>
  </div>
 );
};
const App = () => {
 const [show, setShow] = useState<boolean>(false);
 return (
  <>
   <button
    onClick={() => setShow(true)}
    className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded'>
    Show Modal
   </button>
   <Modal show={show} onClose={() => setShow(false)}>
    <ModalContent />
   </Modal>
  </>
 );
};
export default App;
```
