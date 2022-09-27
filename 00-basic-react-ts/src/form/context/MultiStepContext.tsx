import { createContext, useContext, useEffect, useReducer, useState } from 'react';

type FormState = {
	billFirstName: string;
	billLastName: string;
	billAddress1: string;
	billAddress2: string;
	billCity: string;
	billState: string;
	billZip: string;

	sameAsBilling: boolean;
	shipFirstName: string;
	shipLastName: string;
	shipAddress1: string;
	shipAddress2: string;
	shipCity: string;
	shipState: string;
	shipZip: string;

	sendUpdates: boolean;
};

const initialState: FormState = {
	billFirstName: '',
	billLastName: '',
	billAddress1: '',
	billAddress2: '',
	billCity: '',
	billState: '',
	billZip: '',
	sameAsBilling: false,
	shipFirstName: '',
	shipLastName: '',
	shipAddress1: '',
	shipAddress2: '',
	shipCity: '',
	shipState: '',
	shipZip: '',
	sendUpdates: false
};

type MultiStepFormContextType = {
	canSubmit: boolean;

	disablePrev: boolean;
	disableNext: boolean;
	hidePrev: boolean;
	hideNext: boolean;
	hideSubmit: boolean;
	data: FormState;
	title: {
		[key: number]: string;
	};
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setData: React.Dispatch<React.SetStateAction<FormState>>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => void;
};

const MultiStepFormContext = createContext<MultiStepFormContextType>(
	{} as MultiStepFormContextType
);

export const MultiStepFormProvider = ({ children }: { children: React.ReactNode }) => {
	const title = {
		0: 'Billing Info',
		1: 'Shipping Info',
		2: 'Send Updates'
	};

	const [page, setPage] = useState(0);

	const [data, setData] = useState<FormState>(initialState);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(JSON.stringify(data, null, 3));
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => {
		const type = e.target.type;
		const name = e.target.name;

		const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

		setData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	useEffect(() => {
		if (data.sameAsBilling) {
			setData((prev) => ({
				...prev,
				shipFirstName: prev.billFirstName,
				shipLastName: prev.billLastName,
				shipAddress1: prev.billAddress1,
				shipAddress2: prev.billAddress2,
				shipCity: prev.billCity,
				shipState: prev.billState,
				shipZip: prev.billZip
			}));
		} else {
			setData((prev) => ({
				...prev,
				shipFirstName: '',
				shipLastName: '',
				shipAddress1: '',
				shipAddress2: '',
				shipCity: '',
				shipState: '',
				shipZip: ''
			}));
		}
	}, [data.sameAsBilling]);

	const { billAddress2, sendUpdates, shipAddress2, sameAsBilling, ...requiredInputs } = data;
	// check if all required field are filled in
	const canSubmit =
		[...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1;
	// console.log(isAllRequiredFilled);

	const canGoNextPage1 = Object.keys(data)
		.filter((key) => key.startsWith('bill') && key !== 'billAddress2')
		.map((key) => {
			return data[key as keyof FormState];
		})
		.every(Boolean);

	const canGoNextPage2 = Object.keys(data)
		.filter((key) => key.startsWith('ship') && key !== 'shipAddress2')
		.map((key) => {
			return data[key as keyof FormState];
		})
		.every(Boolean);

	const disablePrev = page === 0;
	const disableNext =
		page === Object.keys(title).length - 1 || //last page
		(page === 0 && !canGoNextPage1) || //in first page but can't go to next page as required fields are not filled in
		(page === 1 && !canGoNextPage2); //in second page but can't go to next page as required fields are not filled in

	const hidePrev = page === 0;
	const hideNext = page === Object.keys(title).length - 1;
	const hideSubmit = page !== Object.keys(title).length - 1;

	return (
		<MultiStepFormContext.Provider
			value={{
				data,
				setData,
				handleSubmit,
				handleChange,
				canSubmit,
				title,
				page,
				setPage,
				disablePrev,
				disableNext,
				hidePrev,
				hideNext,
				hideSubmit
			}}>
			{children}
		</MultiStepFormContext.Provider>
	);
};

export const useMultiStepFormContext = () => {
	return useContext(MultiStepFormContext);
};
