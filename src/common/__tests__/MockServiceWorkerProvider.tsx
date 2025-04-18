import { PropsWithChildren, useEffect, useState } from "react";
import { worker } from "./browsers";

const MockServiceWorkerProvider = ({ children }: PropsWithChildren) => {
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!started)
      worker
        .start({ onUnhandledRequest: "bypass" })
        .then(() => setStarted(true));
  }, [started]);

  return <>{children}</>;
};

export default MockServiceWorkerProvider;
