export type InputProps = {
	name: string;
	label?: string;
	value: string;
	options?: string[];
	disabled?: boolean;
	required?: boolean;

	handleChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => void;
};

export type CheckBoxProps = {
	name: string;
	label: string;
	checked: boolean;
	options?: string[];
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => void;
};

export type RestProps = {
	[key: string]: any;
};
