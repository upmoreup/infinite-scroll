import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./common/utils/queryClient";
import Infinite from "./pages/Infinite";
import MockServiceWorkerProvider from "./common/__tests__/MockServiceWorkerProvider";

const App = () => {
  return (
    <MockServiceWorkerProvider>
      <QueryClientProvider client={queryClient}>
        <Infinite />
      </QueryClientProvider>
    </MockServiceWorkerProvider>
  );
};

export default App;
