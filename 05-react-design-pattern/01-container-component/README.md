# Container Component

## Main Idea

- Component that take care of loading and managing data for their children
- Components shouldn't know where their data is coming form.

```tsx
const CurrentUserLoader = () => {
  // load data
  return {
   // pass data to children
  }
}

const UserInfo = ({user}) => {
  // get data from parent
  return {
   // render data
  }
}
// usage
<CurrentUserLoader>
      <UserInfo />
</CurrentUserLoader>
```

### CurrentUser Component

`CurrentUserLoader.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
type CurrentUserProps = {
 children: React.ReactNode;
};
const CurrentUserLoader = ({ children }: CurrentUserProps) => {
 const [user, setUser] = useState<{ name: string; id: number } | null>(null);
 useEffect(() => {
  const loadUser = async () => {
   const { data } = await axios.get('http://localhost:3500/users/1');
   console.log(data);

   setUser(data);
  };
  loadUser();
 }, []);

 return (
  <>
   {React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
     return React.cloneElement(child as React.ReactElement, { user });
    }
    return child;
   })}
  </>
 );
};

export default CurrentUserLoader;
```

`UserInfo.tsx`

```tsx
type UserInfoProps = {
 user: { name: string; id: number } | null;
};

const UserInfo = ({ user }: UserInfoProps) => {
 return (
  <div>
   <h1>User Info</h1>
   {user ? (
    <>
     <p>{user.name}</p>
     <p>{user.id}</p>
    </>
   ) : (
    <p>No user found</p>
   )}
  </div>
 );
};
export default UserInfo;
```

`App.tsx`

```tsx
import CurrentUserLoader from './components/CurrentUser/CurrentUserLoader';
import UserInfo from './components/CurrentUser/UserInfo';

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
```

- [Typescript(ing) React.cloneElement or how to type a child element with props injected by the parent](https://medium.com/@cristiansima/typescript-ing-react-cloneelement-or-how-to-type-a-child-element-with-props-injected-by-the-parent-73b6ad485f8b)