import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./common/utils/queryClient";
import RouterProvider from "react-router-dom";
import Infinite from "./pages/Infinite";
import MockServiceWorkerProvider from "./common/__tests__/MockServiceWorkerProvider";

const App = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <DndProvider backend={HTML5Backend}>
    //     <StyledThemeProvider theme={defaultTheme}>
    //       <ThemeProvider theme={extendedMuiTheme}>
    //         <MuiThemeProvider theme={extendedMuiTheme}>
    //           <GlobalStyle />
    //           <RouterProvider router={router} />
    //           <SimpleDialog />
    //           <InputDialog />
    //           <CommonToastbar />
    //           <AppLoader />
    //         </MuiThemeProvider>
    //       </ThemeProvider>
    //     </StyledThemeProvider>
    //   </DndProvider>
    // </QueryClientProvider>
    <MockServiceWorkerProvider>
      <Infinite />
    </MockServiceWorkerProvider>
  );
};

export default App;
