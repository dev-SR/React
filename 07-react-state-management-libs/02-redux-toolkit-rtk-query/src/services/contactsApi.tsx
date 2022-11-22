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
