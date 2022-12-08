# React-Query

- [React-Query](#react-query)
  - [Installation](#installation)
  - [Query](#query)
    - [Pagination](#pagination)
    - [`enabled` option](#enabled-option)
  - [Mutation](#mutation)
    - [Invalidation from Mutations](#invalidation-from-mutations)
    - [Optimistic Updates](#optimistic-updates)
  - [Dehydration: SSR + CSR with React Query](#dehydration-ssr--csr-with-react-query)

## Installation

```bash
Inside your React project directory, run the following:

```bash
yarn add @tanstack/react-query @tanstack/react-query-devtools
```

Build a query client and wrap your app with the `QueryClientProvider` component.

`pages/_app.tsx`

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient();

function MyApp(props: AppProps) {
 const { Component, pageProps } = props;
 return (
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
 );
}
export default MyApp;

```

## Query

- [https://tanstack.com/query/v4/docs/guides/queries](https://tanstack.com/query/v4/docs/guides/queries)

Simple query

```tsx
type IPosts = {
 posts: OptimisticPost[];
 links: {
  nextPage: string | null;
  prevPage: string | null;
  hasMore: boolean;
  totalPages: number;
 };
};

const queryOptions: UseQueryOptions<IPosts, Error> = {
 queryKey: ['posts'],
 queryFn: async () => {
  return await fetch('/api/posts').then((res) => res.json());
 },
 staleTime: 5 * 1000
};

export default function Home() {
 const { data: _data, error: _error, status } = useQuery(queryOptions);
 console.log(_data, _error, status);

  return <></>;
}
```

### Pagination

```tsx
 const [activePage, setPage] = useState(1);

 const fetchPost = (activePage: number) => {
  return fetch(`/api/posts?page=${activePage}`).then((res) => res.json());
 };
 const queryOptions: UseQueryOptions<IPosts, Error> = {
  queryKey: ['posts', activePage],//key must be unique
  queryFn: () => fetchPost(activePage),
  staleTime: 5 * 1000
 };
```

### `enabled` option

```tsx
const PostDetail = () => {
 const router = useRouter();
 const { id } = router.query;

 const { data: comments, isLoading: isCommentLoading } = useQuery<Comment[]>(
  [`/api/comments`, id],
  {
   queryFn: () => fetch(`/api/comments/${id}`).then((res) => res.json()),
   enabled: !!id // only fetch if id is defined
  }
 );

 const { data: post, isLoading: isPostLoading } = useQuery<Post>([`/api/posts`, id], {
  queryFn: () => fetch(`/api/posts/${id}`).then((res) => res.json()),
  enabled: !!id // only fetch if id is defined
 });

 return (
  <Container>
   <div>
    <Link href='/'>Home</Link>
   </div>
   {id}
   {isPostLoading && (
    <div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
     Loading post details...
    </div>
   )}
   {post && (
    <div>
     <h1 className='m-0'>{post.title}</h1>
     <p className='m-0'>{post.content}</p>
    </div>
   )}
   <div className='flex flex-col min-h-screen items-end'>
    <h1 className='text-2xl font-bold m-0'>Comments</h1>
    {isCommentLoading && (
     <div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
      Loading comment...
     </div>
    )}
    {comments &&
     comments.map((comment) => (
      <div key={comment.id}>
       <p className='m-0'>{comment.content}</p>
      </div>
     ))}
   </div>
  </Container>
 );
};

export default PostDetail;
```

## Mutation

- [https://tanstack.com/query/v4/docs/guides/mutations](https://tanstack.com/query/v4/docs/guides/mutations)

```tsx
interface IPost {
 id: string;
 title: string;
 content: string;
}
interface ICreatePerson {
 title: string;
 content: string;
}
// define fetch function
const createPost = async (values: ICreatePerson) => {
 const res = await fetch('/api/posts', {
  method: 'POST',
  body: JSON.stringify(values),
  headers: {
   'Content-Type': 'application/json'
  }
 });
 return res.json();
};

export default function Home() {

// define mutation
 const mutation = useMutation<IPost, Error, ICreatePerson>({
  mutationFn: (values) => createPost(values)
 });

 const addPost = async (values: typeof form.values) => {
  // execute mutation
  mutation.mutate(values);
 };

 return (
  <form onSubmit={form.onSubmit((values) => addPost(values))}>
      // ...
    </form>
  )
}
```

### Invalidation from Mutations

Invalidation is a way to tell React Query to `refetch` a query after a mutation has been successfully completed. This is useful for keeping your UI in sync with your data.

- [https://tanstack.com/query/v4/docs/guides/invalidations-from-mutations](https://tanstack.com/query/v4/docs/guides/invalidations-from-mutations)

```tsx
export default function Home() {
 const queryClient = useQueryClient();

 const mutation = useMutation<IPost, Error, ICreatePerson>({
  mutationFn: (values) => createPost(values),
  onSuccess: (data) => {
    // Invalidate and refetch after successful mutation
   queryClient.invalidateQueries({
    queryKey: ['posts', 1] // or ['posts', activePage]
   });
  }
 });
 const deletePost = async (id: string) => {
  await fetch(`/api/posts/${id}`, {
   method: 'DELETE'
  });
  // Invalidate and refetch after successful mutation
  queryClient.invalidateQueries({
   queryKey: ['posts', activePage]
  });
 };

  // ...
   return (
  <form onSubmit={form.onSubmit((values) => addPost(values))}>
      // ...
      {
        {_data?.posts?.map((post) => (
              <div >
                <ActionIcon onClick={async () => deletePost(post.id)}>
                  <MdDeleteForever className='h-8 w-8 text-red-500' />
                </ActionIcon>
              </div>
          ))
        }
     }
  </form>
  )
}
```

### Optimistic Updates

- [https://tanstack.com/query/v4/docs/guides/optimistic-updates](https://tanstack.com/query/v4/docs/guides/optimistic-updates)

```ts
 const mutation = useMutation<IPost, Error, ICreatePerson>({
  mutationFn: (values) => createPost(values),
  // When mutate is called:
  onMutate: (values) => {
   // optimistically update the cache
   const OPTIMISTIC_POST: OptimisticPost = {
    id: String(Math.random()),
    title: values.title,
    content: values.content,
    createdAt: new Date(),
    updatedAt: new Date(),
    optimistic: true
   };
   queryClient.setQueryData<IPosts>(
    ['posts', 1], // or ['posts', activePage]
    (oldData) => {
     return {
      posts: [OPTIMISTIC_POST, ...(oldData?.posts || [])],
      links: oldData?.links || {
       nextPage: null,
       prevPage: null,
       hasMore: false,
       totalPages: 0
      }
     };
    }
   );
  },
  // When the mutation is successful:
  onSuccess: (data) => {
    // Invalidate and refetch after successful mutation
   queryClient.invalidateQueries({
    queryKey: ['posts', 1] // or ['posts', activePage]
   });
  }
 });

 return (
  <div>
  {_data?.posts?.map((post) => (
      <div
       className='flex w-full items-center'
       key={post.id}
       style={post.optimistic ? { opacity: 0.5 } : {}}>
       //....
      </div>
     ))
  }
  </div>
  )
```

## Dehydration: SSR + CSR with React Query

- [https://tanstack.com/query/v4/docs/guides/ssr](https://tanstack.com/query/v4/docs/guides/ssr)

`pages/_app.tsx`

```tsx
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
function MyApp(props: AppProps) {
 const { Component, pageProps } = props;
 const [queryClient] = React.useState(() => new QueryClient())

 return (
     <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
       <Component {...pageProps} />
       <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
     </QueryClientProvider>
  )
}
```

`pages/index.tsx`

```tsx
export async function getServerSideProps(context: GetServerSidePropsContext) {
 let page = 1;
 if (context.query.page) {
  page = parseInt(context?.query?.page as string);
 }
 const queryClient = new QueryClient();

 await queryClient.prefetchQuery(['posts', page], {
  queryFn: () =>
   fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?page=${page}`).then((res) => res.json())
 });

 return {
  props: {
   dehydratedState: dehydrate(queryClient)
  }
 };
}

export default function Home() {
 const [activePage, setPage] = useState(1);

 const queryOptions: UseQueryOptions<IPosts, Error> = {
  queryKey: ['posts', activePage],
  queryFn: () => fetchPost(activePage),
  staleTime: 1000 * 60 * 60 * 24 // 24 hours
 };

 const { data: _data, error: _error, status } = useQuery(queryOptions);

  // ...
}

```
