import {ethers} from "ethers"
import React, {useMemo} from "react"
import * as config from "../config"

export const BackupProviderContext = React.createContext({
    provider: null,
})

export const BackupProviderProvider = ({children}) => {
    const provider = useMemo(() => process.browser ? new ethers.providers.JsonRpcProvider(config.selectedNetwork.rpcUrl) : null, [])
    return (
        <BackupProviderContext.Provider value={{
            provider,
        }}>
            {children}
        </BackupProviderContext.Provider>
    )
}


export function useBackupProvider() {
    return React.useContext(BackupProviderContext)
}
