import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecipeApp from "./components/RecipeApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecipeApp />
  </QueryClientProvider>
);

export default App;
