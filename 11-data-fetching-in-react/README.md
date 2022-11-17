# Data Fetching Problem in React/Nextjs

Let's we are on `Home` page and want to go to the `Product Lists` page. When we go the the `Product List` page, react will fetch the data from the server and render the page. Then if we go to the `Product Detail` page, react will fetch the details of the product from the server and render the page. *But if we go back to the `Product List` page, react will fetch the product lists again from the server*. This is not good for the performance of the app. We don't want to fetch the data again and again.

To solve this problem, we can use the `React-Query`, `SWR`, `RTK-Query` or `Apollo Client` libraries.

[SWR](https://swr.vercel.app/), for example, first returns the data from **cache** (stale/not fresh), then sends the request (revalidate) to the server, and finally comes with the up-to-date data again. Therefore, when we visit the `Product List` page, react will fetch the data and store it in the cache. Then on every time we visit the `Product List` page, react will used the coached data. This is good for the performance of the app.