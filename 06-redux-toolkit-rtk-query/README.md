# Redux-Toolkit-RTK-Query

<div align="center">
<img src="img/rtq-1.gif" alt="rtq-1.gif" width="800px">
</div>

- [Redux-Toolkit-RTK-Query](#redux-toolkit-rtk-query)
	- [Core Concepts](#core-concepts)
		- [Automated Re-fetching](#automated-re-fetching)
			- [Providing tags](#providing-tags)
			- [Invalidating tags](#invalidating-tags)
	- [Usage](#usage)
		- [store.ts](#storets)
		- [api definition](#api-definition)
		- [hooks usage](#hooks-usage)
	- [Resources](#resources)

## Core Concepts

### Automated Re-fetching

- [https://redux-toolkit.js.org/rtk-query/usage/automated-refetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching)

#### Providing tags

*A query can have its cached data provide tags. Doing so determines which 'tag' is attached to the cached data returned by the query.*

The `providesTags` argument can either be an array of string (such as `['Post']`), `{type: string, id?: string|number}` (such as `[{type: 'Post', id: 1}]`), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the query method as the third argument. Note that either the result or error arguments may be undefined based on whether the query was successful or not.

#### Invalidating tags

A mutation can invalidate specific cached data based on the tags. Doing so determines which cached data will be either refetched or removed from the cache.

The `invalidatesTags` argument can either be an array of string (such as `['Post']`), `{type: string, id?: string|number}` (such as `[{type: 'Post', id: 1}]`), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the query method as the third argument. Note that either the result or error arguments may be undefined based on whether the mutation was successful or not.

## Usage

### store.ts

```ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { contactsApi } from '../services/contactsApi';

const store = configureStore({
 reducer: {
  [contactsApi.reducerPath]: contactsApi.reducer
 },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApi.middleware),
 devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### api definition

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Contact {
 id: number;
 name: string;
 email: string;
 contact: string;
}

export const contactsApi = createApi({
 reducerPath: 'contactsApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
 tagTypes: ['Contact'],
 endpoints: (builder) => ({
  // <Return Type,Payload Type>
  getContacts: builder.query<Contact[], void>({
   query: () => '/contacts',
   providesTags: ['Contact']
  }),
  getSingleContact: builder.query<Contact, number>({
   query: (id) => `/contacts/${id}`,
   // providesTags: (result, error, id) => [{ type: 'Contact', id }]
   providesTags: ['Contact']
  }),
  addContact: builder.mutation<void, Contact>({
   query: (contact) => ({
    url: '/contacts',
    method: 'POST',
    body: contact
   }),
   invalidatesTags: ['Contact'] // invalidates the 'Contact' tag; this will cause the 'getContacts' query to be refetched when this mutation is dispatched
  }),
  deleteContact: builder.mutation<void, number>({
   query: (id) => ({
    url: `/contacts/${id}`,
    method: 'DELETE'
   }),
   invalidatesTags: ['Contact']
  }),
  updateContact: builder.mutation<void, Contact>({
   query: ({ id, ...rest }) => ({
    url: `/contacts/${id}`,
    method: 'PUT',
    body: rest
   }),
   invalidatesTags: ['Contact']
  })
 })
});

export const {
 useGetContactsQuery,
 useAddContactMutation,
 useDeleteContactMutation,
 useGetSingleContactQuery,
 useUpdateContactMutation
} = contactsApi;
```

### hooks usage

`Home.tsx`

```tsx
const Home = () => {
 const { data, error, isLoading, isSuccess, isFetching } = useGetContactsQuery();
 const [deleteContact, { isLoading: deleteLoading }] = useDeleteContactMutation();

 const handleDelete = async (id: any) => {
  if (window.confirm('Are you sure that you wanted to delete that user ?')) {
   await deleteContact(id);
   !deleteLoading && toast.success('Contact Deleted Successfully');
  }
 };
 useEffect(() => {
  if (error) {
   toast.error('Something went wrong');
  }
 }, [error]);

 useEffect(() => {
  if (deleteLoading) {
   toast.loading('Deleting...');
  }
  return () => toast.dismiss(); //VERY IMPORTANT; or else the toast will stay forever
 }, [deleteLoading]);

 let content: React.ReactNode = <></>;
 if (isLoading) {
  content = <BeatLoader color='#36d7b7' />;
 } else if (error) {
  content = <p className='text-center text-2xl text-red-500 font-semibold'>Failed to fetch</p>;
 } else if (isSuccess && data) {
  content = (...)
 }
 return (
  <div >
   {content}
  </div>
 );
};
```

`AddEditUser.tsx`

```tsx
const initialState = {
 name: '',
 email: '',
 contact: ''
};

const AddEditUser = () => {
 const [formValue, setFormValue] = useState(initialState);
 const [editMode, setEditMode] = useState(false);
 const { name, email, contact } = formValue;
 const navigate = useNavigate();
 const { id } = useParams();

 // redux-toolkit-rtk-query
 const [addContact, { isLoading }] = useAddContactMutation();
 const [updateContact, { isLoading: updateLoading }] = useUpdateContactMutation();
 const { data, error, isSuccess } = useGetSingleContactQuery(Number(id));

 useEffect(() => {
  if (id) {
   setEditMode(true);
   if (isSuccess && data) {
    setFormValue(data);
   }
  } else {
   setEditMode(false);
  }
 }, [id, data, isSuccess]);

 useEffect(() => {
  if (isLoading) {
   toast.loading('Loading...');
  }
  return () => toast.dismiss(); //VERY IMPORTANT; or else the toast will stay forever; even in the next page
 }, [isLoading]);

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  if (!name && !email && !contact) {
   toast.error('Please provide value into each input field');
  } else {
   if (!editMode) {
    // redux-toolkit-rtk-query
    await addContact({ ...formValue, id: Math.floor(Math.random() * 1000) });
    !isLoading && navigate('/');
    toast.success('Contact Added Successfully');
   } else {
    await updateContact({ ...formValue, id: Number(id) });
    navigate('/');
    setEditMode(false);
    toast.success('Contact Updated Successfully');
   }
  }
 };

 const handleInputChange = (e: any) => {
  let { name, value } = e.target;
  setFormValue({ ...formValue, [name]: value });
 };

 return (
  (...)
 );
```

`UserInfo.tsx`

```tsx
const UserInfo = () => {
 const { id } = useParams();
 const { data, error, isLoading, isSuccess } = useGetSingleContactQuery(Number(id));
 useEffect(() => {
  if (error) {
   toast.error('Something went wrong');
  }
 }, [error]);

 let content: React.ReactNode = <></>;
 if (isLoading) {
  content = <BeatLoader color='#36d7b7' />;
 } else if (error) {
  content = <p className='text-center text-2xl text-red-500 font-semibold'>Failed to fetch</p>;
 } else if (isSuccess && data) {
  content = ()

 return (
  <div>{content}</div>
 );
}
```

## Resources

- [Redux-Toolkit-RTK-Query](https://redux-toolkit.js.org/rtk-query/overview)
