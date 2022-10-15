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
