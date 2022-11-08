import { useWeb3React } from '@web3-react/core'

export default function useWallet() {
    const { activate, active, account } = useWeb3React()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connect = async (_connector: any) => {
        try {
            await activate(_connector);
        } catch (error) {
            console.log(error);
        }
    }
      
    return {activate, active, account, connect};
}
