import { persistor, store } from "../../../../../store/store";
import { QueryClientProvider } from "./query-client-provider";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function AppProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
                <QueryClientProvider>
                    {children}
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}
