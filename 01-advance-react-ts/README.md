# Advance Topics in React

- [Advance Topics in React](#advance-topics-in-react)
  - [Why use `setState(prevState => newState)`?](#why-use-setstateprevstate--newstate)
  - [Why do we need `useMemo` and `useCallback`](#why-do-we-need-usememo-and-usecallback)
  - [The purpose of `useMemo()`](#the-purpose-of-usememo)
  - [The purpose of `useCallback()`](#the-purpose-of-usecallback)
    - [`useCallback` with `React.memo`](#usecallback-with-reactmemo)

## Why use `setState(prevState => newState)`?

Let's say you have a counter component that increments the count by 2 when the button is clicked.

```typescript
import { useState } from 'react';
const Counter = () => {
 const [count, setCount] = useState(0);

 // Increment the count by 2
 const increment = () => {
  setCount(count + 1);
  setCount(count + 1);
 };

 return (
  <div className='flex flex-col items-center'>
   <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={increment}>
    Increment
   </button>
   <p className='text-2xl font-bold'>{count}</p>
  </div>
 );
};

const App = () => {
 return (
  <div className='flex h-screen justify-center items-center'>
   <Counter />
  </div>
 );
};
export default App;
```

But when you click the button, the count only increments by 1. This is because `setState` is asynchronous. So when you call `setCount(count + 1)` twice, the first call will update the state, but the second call will use the old state value. So the count will only increment by 1.

But if you use `setState(prevState => newState)`, the state will be updated correctly.

```typescript
 const increment = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
 };
```

## Why do we need `useMemo` and `useCallback`

The answer is simple - memoization between re-renders. If a value or a function is wrapped in one of those hooks(useMemo,useCallback), react will cache it during the initial render, and return the reference to that saved value during consecutive renders. Without it, non-primitive values like arrays, objects, or functions, will be re-created from scratch on every re-render. memoization is useful when those values are compared. It’s just your normal javascript:

```typescript
function factory() {
  return (a, b) => a + b;
}
const sum1 = factory();
const sum2 = factory();
sum1(1, 2); // => 3
sum2(1, 2); // => 3
sum1 === sum2; // => false
sum1 === sum1; // => true
```

```typescript
const a = { "test": 1 };
const b = { "test": 1'};
console.log(a === b); // will be false
const c = a; // "c" is just a reference to "a"
console.log(a === c); // will be true
```

- `useMemo` - to memorize a value (i.e. output of a function) between re-renders
- `useCallback` - to memorize a function between re-renders

## The purpose of `useMemo()`

```tsx
const fibonacci = (n: number): number => {
 if (n <= 1) {
  return 1;
 }
 return fibonacci(n - 1) + fibonacci(n - 2);
};
const MemorizeOutputOfAFunction = () => {
 const [fibInput, setFibInput] = useState('0');
 const [randomInput, setRandomInput] = useState('');

  // fibonacci is re-created on each render

 const fibOutput = [fibInput, fibonacci(Number(fibInput))];
 // const [fibOutput, setFibOutput] = useState<[number, number]>([0, 0]);
 // useEffect(() => {
 //  setFibOutput([Number(fibInput), fibonacci(Number(fibInput))]);
 // }, [fibInput]);

 useEffect(() => {
  console.log('fibNumber changed');
 }, [fibOutput]);

 return (
  <div className='flex flex-col items-center'>
   <input
    type='number'
    value={fibInput}
    maxLength={40}
    onChange={(e) => setFibInput(e.target.value)}
    className='border-2 border-gray-300 rounded-md px-4 py-2'
   />
   <p className='text-2xl font-bold'>
    fib({fibOutput[0]}): {fibOutput[1]}
   </p>

   <input
    type='text'
    value={randomInput}
    onChange={(e) => setRandomInput(e.target.value)}
    className='border-2 border-gray-300 rounded-md px-4 py-2'
   />
   <p className='text-2xl font-bold'>User Input: {randomInput}</p>
  </div>
 );
};

const App = () => {
 return (
  <div className='flex h-screen justify-center items-center'>
   <MemorizeOutputOfAFunction />
  </div>
 );
};
export default App;
```

In, this example first input element takes a number to compute fibonacci of that number. The second input element takes a string and displays it.

The problem is that the `fibonacci` function is called on every re-render, even if the fibonacci input is not changed.
For example, if you type `40` in the first input element, the fibonacci function will be called. But then , if you type a character in the second input element, the fibonacci function will be called again. As a result the second input element suffers lags. Here, `fibonacci` function is re-created on each render and it is a different function object on every rendering of `MemorizeOutputOfAFunction`.

To resolve this issue, we can use `useMemo()` hook. `useMemo()` hook will memorize the output of a function between re-renders. So, if the fibonacci input is not changed, the fibonacci function will not be called again.

```tsx
const MemorizeOutputOfAFunction = () => {
 const [fibInput, setFibInput] = useState('0');
 const [randomInput, setRandomInput] = useState('');

 const fibOutput = useMemo(() => {
  return [Number(fibInput), fibonacci(Number(fibInput))];
 }, [fibInput]);


 //..
};
```

## The purpose of `useCallback()`

- [https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/](https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/)

However, the big difference between the two Hooks is that `useMemo` provides a way to memoize a `value`, whilst `useCallback` memoizes a `function`. It looks and feels almost identical to the implementation of useMemo too.

Each time a component re-renders, React will create new versions of items like function objects.


```tsx
const functionCounter = new Set();

const Example = () => {
	const [userInput, setUserInput] = useState('');
	const [n1] = useState(1);
	const [n2] = useState(2);

	const sum = () => n1 + n2;
	functionCounter.add(sum);


	useEffect(() => {
		console.log(`New sum: ${sum()} | functionCounter: ${functionCounter.size}`);
	}, [sum]);

	return (
		<div>
			<input
				type='text'
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
				className='border-2 border-gray-300 rounded-md px-4 py-2'
			/>
		</div>
	);
};

const App = () => {
	return (
		<div className='flex h-screen justify-center items-center'>
			<Example />
		</div>
	);
};
export default App;
```

Here `sum` function is re-created on each render. So, the `functionCounter` will increase on each render. If you type a character in the input element, the `functionCounter` will increase each time.

To resolve this issue, we can use `useCallback()` hook. `useCallback()` hook will memorize the function between re-renders.

```tsx
const functionCounter = new Set();
const Example = () => {
	// .......
	const sum = useCallback(() => n1 + n2, [n1, n2]);
	functionCounter.add(sum);

	// .......
};
```


### `useCallback` with `React.memo`

- [https://lo-victoria.com/a-look-at-react-hooks-usecallback](https://lo-victoria.com/a-look-at-react-hooks-usecallback)

Keep in mind that most of the performance optimizations in React are premature. React is fast by default, so every performance optimization is opt-in in case something starts to feel slow.

Let's take the following example of a React application which renders a list of user items and allows us to add and remove items with callback handlers. We are using React's useState Hook to make the list stateful:

```tsx
import { v4 as uuidv4 } from 'uuid';

type User = {
 name: string;
 id: string;
};
const UserList = () => {
 console.log('Render: App');

 const [users, setUsers] = useState<User[]>([
  { id: 'a', name: 'Robin' },
  { id: 'b', name: 'Dennis' }
 ]);

 const [text, setText] = useState('');

 const handleText = (event: ChangeEvent<HTMLInputElement>) => {
  setText(event.target.value);
 };

 const handleAddUser = () => {
  setUsers(users.concat({ id: uuidv4(), name: text }));
 };

 const handleRemove = (id: string) => {
 setUsers(users.filter((user) => user.id !== id));
 };

 return (
  <div className='flex flex-col space-y-2'>
   <div className='flex space-x-2'>
    <input
     type='text'
     value={text}
     onChange={handleText}
     className='border-2 border-gray-300 rounded-md px-4 py-2'
    />
    <button
     type='button'
     onClick={handleAddUser}
     className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
     Add User
    </button>
   </div>

   <List list={users} onRemove={handleRemove} />
  </div>
 );
};

type ListType = {
 list: User[];
 onRemove: (id: string) => void;
};

const List = ({ list, onRemove }: ListType) => {
 console.log('Render: List');

 return (
  <ul className='flex  flex-col space-y-2'>
   {list.map((item) => (
    <ListItem key={item.id} item={item} onRemove={onRemove} />
   ))}
  </ul>
 );
};

type ListItemType = {
 item: User;
 onRemove: (id: string) => void;
};
const ListItem = ({ item, onRemove }: ListItemType) => {
 console.log('Render: ListItem');

 return (
  <li>
   <div className='flex space-x-2 items-center'>
    <span>{item.name}</span>
    <button
     type='button'
     onClick={() => onRemove(item.id)}
     className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
     X
    </button>
   </div>
  </li>
 );
};

const App = () => {
 return (
  <div className='flex h-screen justify-center items-center'>
   <UserList />
  </div>
 );
};
export default App;

```

Typing into the input field for adding an item to the list should only trigger a re-render for the `UserList` component, but not for its child components (`List` and `ListItems`) which don't care about this state change. But if we look at the console output, we can see that the `List` and `ListItem` components are re-rendered as well.

Thus, React memo will be used to prevent the child components from updating:

```tsx
import { memo} from 'react';

const List = memo(({ list, onRemove }: ListType) => {
 console.log('Render: List');
 return (
  <ul className='flex  flex-col space-y-2'>
   {list.map((item) => (
    <ListItem key={item.id} item={item} onRemove={onRemove} />
   ))}
  </ul>
 );
});

const ListItem = memo(({ item, onRemove }: ListItemType) => {
 console.log('Render: ListItem');

 return (
  <li>
   <div className='flex space-x-2 items-center'>
    <span>{item.name}</span>
    <button
     type='button'
     onClick={() => onRemove(item.id)}
     className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
     X
    </button>
   </div>
  </li>
 );
});
```

However, perhaps to your surprise, both function components still re-render when typing into the input field. For every character that's typed into the input field, you should still see the same output as before:

```bash
# after typing one character into the input field

Render: App
Render: List
Render: ListItem
Render: ListItem

# ....and so no
```

Let's have a look at the props that are passed to the List component.

```tsx
const UserList = () => {
  // How we're rendering the List in the App component
  return (
    //...
    <List list={users} onRemove={handleRemove} />
  )
}
```

As long as no item is added or removed from the list prop, it should stay intact even if the `UserList` component re-renders after a user types something into the input field. **So the culprit is the `onRemove` callback handler.**

Whenever the App component re-renders after someone types into the input field, the `handleRemove` handler function in the App gets re-defined.

By passing this **new** callback handler as a prop to the List component, it notices **a prop changed compared to the previous render**. That's why the re-render for the List and ListItem components kicks in.

Finally we have our use case for React's `useCallback` Hook. We can use `useCallback` to memoize a function, which means that this function only gets re-defined if any of its dependencies in the dependency array change:

```tsx
const App = () => {
	//   ...
  // Notice the dependency array passed as a second argument in useCallback
	const handleRemove = useCallback(
		(id: string) => setUsers(users.filter((user) => user.id !== id)),
		[users]
	);
 // ....
}
```

If the users state changes by adding or removing an item from the list, the handler function gets re-defined and the child components should re-render.

However, if someone only types into the input field, the function doesn't get re-defined and stays intact. Therefore, the child components don't receive changed props and won't re-render for this case.

You might be wondering why you wouldn't use React's useCallback Hook on all your functions or why React's useCallback Hook isn't the default for all functions in the first place.

Internally, React's useCallback Hook has to compare the dependencies from the dependency array for every re-render to decide whether it should re-define the function. Often the computation for this comparison can be more expensive than just re-defining the function.

In conclusion,It's already a small performance gain when functions are passed to others components without worrying about the function being re-initialized for every re-render of the parent component. However, as you have seen, React's useCallback Hook starts to shine when used together with React's memo API.