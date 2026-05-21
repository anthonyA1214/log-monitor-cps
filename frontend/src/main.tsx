import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./index.css"

const queryClient = new QueryClient()

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </QueryClientProvider>
  )
}
