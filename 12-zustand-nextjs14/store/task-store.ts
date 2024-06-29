import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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

// const myMiddlewares = (stateCreator: StateCreator<TStore>) =>
// 	devtools(persist(stateCreator, { name: 'task_data' }), { enabled: true });

// export const useTaskStore = create<TStore>()(
// 	myMiddlewares((set) => ({
// 		tasks: [],
// 		addTask: (title) =>
// 			set((state) => ({
// 				tasks: [...state.tasks, { id: Math.random().toString(), title, status: 'TODO' }]
// 			})),
// 		removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
// 		updateTitle: (id, title) =>
// 			set((state) => ({
// 				tasks: state.tasks.map((task) => (task.id === id ? { ...task, title } : task))
// 			})),
// 		updateStatus: (id, status) =>
// 			set((state) => ({
// 				tasks: state.tasks.map((task) => (task.id === id ? { ...task, status } : task))
// 			}))
// 	}))
// );

// export const useTaskStore = create<TStore>()(
// 	myMiddlewares((set) => {
// 		return {
// 			tasks: [],
// 			addTask: (title: string) => {
// 				return set((state) => {
// 					return {
// 						tasks: [...state.tasks, { id: Date.now().toString(), title: title, status: 'TODO' }]
// 					};
// 				});
// 			},
// 			removeTask: (id: string) => {
// 				return set((state) => {
// 					return {
// 						tasks: state.tasks.filter((task) => task.id != id)
// 					};
// 				});
// 			},
// 			updateStatus: (id: string, status: TaskStatus) => {
// 				return set((state) => {
// 					return {
// 						tasks: state.tasks.map((task) => (task.id == id ? { ...task, status } : task))
// 					};
// 				});
// 			},
// 			updateTitle: (id: string, title: string) => {
// 				return set((state) => {
// 					return {
// 						tasks: state.tasks.map((task) => (task.id == id ? { ...task, title } : task))
// 					};
// 				});
// 			}
// 		};
// 	})
// );
