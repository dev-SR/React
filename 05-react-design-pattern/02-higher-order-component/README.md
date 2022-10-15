# Higher Order Component

## What is a Higher Order Component?

- A higher order component is a function that takes a component and returns a new component.
- Share common functionality between components(like logging, error handling, etc)
- Adding extra functionality to a existing components

## Printing props with HOCs

- [https://maxrozen.com/implement-higher-order-component-react-typescript](https://maxrozen.com/implement-higher-order-component-react-typescript)

```tsx
import Dummy from './components/Dummy';
import printProps from './components/PrintProps';

// passing existing component to HOC and getting new component
const HOCDummy = printProps(Dummy);

const App = () => {
 return <HOCDummy username='John' userId={1} />;
};
export default App;
```

```tsx
function printProps<P>(Component: React.ComponentType<P>) {//gets a component
// returning new component
 return (props: any) => {
  console.log(props);
  return <Component {...props} />;
 };
}

export default printProps;
```

```tsx
type DummyProps = {
 username: string;
 userId: number;
};
const Dummy = ({ username, userId }: DummyProps) => {
 return (
  <div>
   {username} {userId}
  </div>
 );
};
export default Dummy;
```
