import { useEffect, useState } from 'react';
import Form from './form/Form';
import TodoList from './todo-ex/TodoList';
import MultiForm from './form/Multi-Form';
import { MultiStepFormProvider } from './form/context/MultiStepContext';

const App = () => {
	return (
		<MultiStepFormProvider>
			<MultiForm />
		</MultiStepFormProvider>
	);
};

export default App;
