import WalletConnectProvider from "@walletconnect/web3-provider";
import {providers} from "ethers";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Web3Modal from "web3modal";
import * as config from "../config.js";
import {WalletLink} from "walletlink";
import Authereum from "authereum";

export const PROVIDER_OPTIONS = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: config.infuraApiKey,
        },
    },
    'custom-walletlink': {
        display: {
            logo: '/images/coinbase-wallet.svg', // Path to wallet link logo. Source https://github.com/walletlink/walletlink/blob/master/web/src/images/wallets/coinbase-wallet.svg
            name: 'WalletLink',
            description: 'Scan with WalletLink to connect',
        },
        package: WalletLink,
        connector: async (_, options) => {
            const {appName, networkUrl, chainId} = options
            const walletLink = new WalletLink({
                appName
            });
            const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
            await provider.enable();
            return provider;
        },
    },
    authereum: {
        package: Authereum,
    },
};

export const WalletContext = React.createContext({
    connect: () => Promise.resolve(),
    disconnect: () => Promise.resolve(),
    wallet: null,
    loading: true,
});

let web3Modal;
if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        network: config.selectedNetwork.name,
        cacheProvider: false,
        providerOptions: PROVIDER_OPTIONS,
    });
}

export const WalletProvider = ({children}) => {
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);

    const connect = useCallback(async function () {
        setLoading(true);
        const provider = await web3Modal.connect();
        const web3Provider = new providers.Web3Provider(provider);

        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        setWallet({
            address,
            chainId: network.chainId,
            provider,
            web3Provider,
        });
        setLoading(false);
    }, []);

    const provider = wallet?.provider;
    const disconnect = useCallback(async () => {
        await web3Modal.clearCachedProvider();
        if (provider?.disconnect && typeof provider.disconnect === "function") {
            await provider.disconnect();
        }
        setWallet(null);
    }, [provider]);

    useEffect(() => {
        if (web3Modal && web3Modal.cachedProvider) {
            void connect();
        } else {
            setLoading(false);
        }
    }, [connect]);

    useEffect(() => {
        if (!provider?.on) return;

        const handleAccountsChanged = (accounts) => {
            console.log("accountsChanged", accounts);
            setWallet(wallet => {
                if (wallet === null) return null;
                const newAccount = accounts[0];
                if (!newAccount) return wallet;

                return {
                    ...wallet,
                    address: newAccount,
                };
            });
        };

        const handleChainChanged = (chainId) => {
            const parsedChainId = parseInt(chainId, 16);
            console.log("chainChanged", parsedChainId);
            setWallet(wallet => {
                if (wallet === null) return null;

                return {
                    ...wallet,
                    chainId: parsedChainId,
                };
            });
        };

        const handleDisconnect = (error) => {
            console.log("disconnect", error);
            void disconnect();
        };

        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("chainChanged", handleChainChanged);
        provider.on("disconnect", handleDisconnect);

        return () => {
            if (provider.removeListener) {
                provider.removeListener("accountsChanged", handleAccountsChanged);
                provider.removeListener("chainChanged", handleChainChanged);
                provider.removeListener("disconnect", handleDisconnect);
            }
        };
    }, [provider, disconnect]);

    return (
        <WalletContext.Provider
            value={{
                connect,
                disconnect,
                wallet,
                loading,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export function useWallet() {
    const walletCtx = React.useContext(WalletContext);
    const {wallet} = walletCtx;
    const isConnected = useMemo(() => Boolean(wallet), [wallet]);

    return {
        ...walletCtx,
        isConnected,
        address: wallet?.address ?? undefined,
    };
}
