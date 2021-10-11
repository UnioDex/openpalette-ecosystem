import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {WalletProvider} from "../hooks/useWallet";
import {BackupProviderProvider} from "../hooks/useBackupProvider";
import Head from 'next/head'
import "@fontsource/roboto"

export const theme = extendTheme({
    initialColorMode: "dark",
    useSystemColorMode: false,
    styles: {
        global: {
            body: {
                backgroundColor: "#171808",
                color: "#ffffff"
            },
        },
    },
    fonts: {
        body: "Roboto, sans-serif",
    },
});

function App({children}) {
    return (
        <>
            <Head>
                <title>OpenPalette Ecosystem</title>
            </Head>
            <ChakraProvider theme={theme}>
                <BackupProviderProvider>
                    <WalletProvider>
                        {children}
                    </WalletProvider>
                </BackupProviderProvider>
            </ChakraProvider>
        </>
    );
}

export default App;
