import { QueryClientProvider } from "./query-client-provider";

export default function AppProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider>
            {children}
        </QueryClientProvider>
    );
}
