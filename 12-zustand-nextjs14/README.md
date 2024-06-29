# Zustand

- [Zustand](#zustand)
  - [Basic](#basic)
  - [Adding middlewares](#adding-middlewares)
  - [Simplifying Immutability with Mutable Logic Using Immer in Zustand](#simplifying-immutability-with-mutable-logic-using-immer-in-zustand)
  - [Advance Pattern](#advance-pattern)

## Basic

1. First create a store


```typescript
import {  create } from 'zustand';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
	id: string;
	title: string;
	status: TaskStatus;
};

export type TStore = {
	tasks: Task[];
	addTask: (title: string) => void;
	removeTask: (id: string) => void;
	updateTitle: (id: string, title: string) => void;
	updateStatus: (id: string, status: TaskStatus) => void;
};

export const useTaskStore = create<TStore>()((set) => {
		return {
			tasks: [],
			addTask: (title: string) => {
				return set((state) => {
					return {
						tasks: [...state.tasks, { id: Date.now().toString(), title: title, status: 'TODO' }]
					};
				});
			},
			removeTask: (id: string) => {
				return set((state) => {
					return {
						tasks: state.tasks.filter((task) => task.id != id)
					};
				});
			},
			updateStatus: (id: string, status: TaskStatus) => {
				return set((state) => {
					return {
						tasks: state.tasks.map((task) => (task.id == id ? { ...task, status } : task))
					};
				});
			},
			updateTitle: (id: string, title: string) => {
				return set((state) => {
					return {
						tasks: state.tasks.map((task) => (task.id == id ? { ...task, title } : task))
					};
				});
			}
		};
    }
);
```

Concisely,

```typescript
export const useTaskStore = create<TStore>()((set) => ({
		tasks: [],
		addTask: (title) =>
			set((state) => ({
				tasks: [...state.tasks, { id: Math.random().toString(), title, status: 'TODO' }]
			})),
		removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
		updateTitle: (id, title) =>
			set((state) => ({
				tasks: state.tasks.map((task) => (task.id === id ? { ...task, title } : task))
			})),
		updateStatus: (id, status) =>
			set((state) => ({
				tasks: state.tasks.map((task) => (task.id === id ? { ...task, status } : task))
			}))
	    }
    )
);

```



2. Then bind your components, and that's it!


```typescript
    const tasks = useTaskStore((state) => state.tasks);
	const addTask = useTaskStore((state) => state.addTask);
	const updateStatus = useTaskStore((state) => state.updateStatus);
	const updateTitle = useTaskStore((state) => state.updateTitle);
	const removeTask = useTaskStore((state) => state.removeTask);
```





## Adding middlewares


```typescript
import { devtools, persist } from 'zustand/middleware';

const myMiddlewares = (stateCreator: StateCreator<TStore>) =>
	devtools(persist(stateCreator, { name: 'task_data' }), { enabled: true });

export const useTaskStore = create<TStore>()(myMiddlewares(set =>({}) ));
```


## Simplifying Immutability with Mutable Logic Using Immer in Zustand

Using `immer` with `zustand` can simplify state management by allowing you to write mutative logic in your state updates while ensuring that the underlying state remains immutable. `immer` takes a base state, applies changes to it in a mutative manner, and then produces a new immutable state. Here are some reasons and benefits of using `immer` with `zustand`:

```bash
pnpm install immer
```

```typescript
import { immer } from 'zustand/middleware/immer';

const myMiddlewares = (
	stateCreator: StateCreator<TStore, [['zustand/immer', never]], [], TStore>
) => devtools(persist(immer(stateCreator), { name: 'task_data' }), { enabled: true });

export const useTaskStore = create<TStore>()(
	myMiddlewares((set) => ({
		tasks: [],
		addTask: (title: string) =>
			set((state) => {
				state.tasks.push({ id: Math.random().toString(), title, status: 'TODO' });
			}),
		removeTask: (id: string) =>
			set((state: TStore) => {
				state.tasks = state.tasks.filter((task) => task.id != id);
			}),

		updateTitle: (id: string, title: string) =>
			set((state: TStore) => {
				const taskFound = state.tasks.find((task) => task.id == id);
				if (taskFound) {
					taskFound.title = title;
				}
			}),
		updateStatus: (id: string, status: TaskStatus) =>
			set((state: TStore) => {
				const taskFound = state.tasks.find((task) => task.id == id);
				if (taskFound) {
					taskFound.status = status;
				}
			})
	}))
);
```

## Advance Pattern