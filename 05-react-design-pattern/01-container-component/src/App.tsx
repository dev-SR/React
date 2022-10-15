import CurrentUserLoader from './components/CurrentUser/CurrentUserLoader';
import UserInfo from './components/CurrentUser/UserInfo';
{
	/* https://medium.com/@cristiansima/typescript-ing-react-cloneelement-or-how-to-type-a-child-element-with-props-injected-by-the-parent-73b6ad485f8b */
}

const App = () => {
	return (
		<>
			<div className='flex justify-center items-center h-screen'>
				<CurrentUserLoader>
					<UserInfo user={undefined as never} />
				</CurrentUserLoader>
			</div>
		</>
	);
};
export default App;
