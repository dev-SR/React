import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
interface TreeBranch {
	readonly id: string;
	readonly label: string;
	// branches?: Tree;
	branches?: ReadonlyArray<TreeBranch>;
	readonly selected?: boolean;
}

type Tree = ReadonlyArray<TreeBranch>;

const mockOrgTreeList: Tree = [
	{
		label: 'Liberty Health',
		id: '1',
		branches: [
			{
				label: 'Pacific Northwest',
				id: '2',
				branches: [
					{
						label: 'East Portland Clinic',
						id: '3',
						branches: []
					},
					{
						label: 'Beaverton / Tigard',
						id: '4',
						branches: []
					},
					{
						label: 'Lake Oswego Regency',
						id: '5',
						branches: []
					}
				]
			},
			{
				label: 'Alaska',
				id: '6',
				branches: []
			}
		]
	},
	{
		label: 'Northstar Alliance',
		id: '7',
		branches: [
			{
				label: 'Chicago',
				id: '8',
				branches: [
					{
						label: 'Southwest Region',
						id: '9',
						branches: [
							{
								label: 'Desplains',
								id: '10',
								branches: []
							},
							{
								label: 'Oak Lawn',
								id: '11',
								branches: []
							}
						]
					},
					{
						label: 'Northwest Region',
						id: '12',
						branches: [
							{
								label: 'East Morland',
								id: '13',
								branches: []
							}
						]
					}
				]
			},
			{
				label: 'New York',
				id: '14',
				branches: [
					{
						label: 'Manhattan',
						id: '15',
						branches: []
					},
					{
						label: 'Queens',
						id: '16',
						branches: []
					},
					{
						label: '5372 Arlington Heights',
						id: '17',
						branches: []
					},
					{
						label: 'The Earlmore Institute of Health',
						id: '18',
						branches: []
					}
				]
			}
		]
	}
];
interface TreeItemProps {
	readonly id: string;
	readonly onSelectCallback: (e: React.MouseEvent<HTMLInputElement>) => void;
	readonly label: string;
	readonly isSelected: boolean | undefined;
	readonly children: ReadonlyArray<JSX.Element>;
}

interface RecursiveTreeProps {
	readonly listMeta: Tree;
	readonly onSelectCallback: (value: TreeBranch) => void;
}

const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ');

const TreeItem = ({ onSelectCallback, label, isSelected, children }: TreeItemProps) => {
	const [isOpen, toggleItemOpen] = useState<boolean | null>(null);
	const [selected, setSelected] = useState(isSelected);
	console.log(selected);

	return (
		<div>
			<div
				className='flex items-center cursor-pointer hover:text-indigo-500 font-bold'
				onClick={() => toggleItemOpen(!isOpen)}>
				{children.length > 0 && (
					<div className=''>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</div>
				)}
				<div
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						setSelected(!selected);
						onSelectCallback(e);
					}}
					className={classNames(
						children.length === 0 && 'ml-6',
						selected && 'text-indigo-800'
					)}>
					{label}
				</div>
			</div>
			<div className='pl-4'>{isOpen && children}</div>
		</div>
	);
};
const RecursiveTree = ({ listMeta, onSelectCallback }: RecursiveTreeProps) => {
	const createTree = (branch: TreeBranch) =>
		branch.branches && (
			<TreeItem
				id={branch.id}
				key={branch.id}
				onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
					onSelectCallback(branch);
				}}
				isSelected={branch.selected}
				label={branch.label}>
				{branch.branches.map((branch: TreeBranch) => {
					return <div key={branch.id}>{createTree(branch)}</div>;
				})}
			</TreeItem>
		);

	return (
		<div>
			{listMeta.map((branch: TreeBranch, i: any) => (
				<div key={i}>{createTree(branch)}</div>
			))}
		</div>
	);
};

const App = () => {
	return (
		<div className='pl-10 mt-10 select-none'>
			<div className='text-xl font-bold'>Organization:</div>
			<RecursiveTree
				listMeta={mockOrgTreeList}
				onSelectCallback={(value: TreeBranch) => console.log(value)}
			/>
		</div>
	);
};

export default App;
