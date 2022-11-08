import { injected } from "../contants/Connectors";
import { useWeb3React } from '@web3-react/core'
import { store } from "../store";
import { setAlert } from "../actions/alert";
import formatAddress from "../utils/formatAddress";
import { loadUser, signInWithWallet } from "../actions/auth";
import api from "../utils/api";

export default function useAuth() {

    const { activate, account } = useWeb3React()

    const loginWithWallet = async () => {
        try {
            // Connect Wallet
            await activate(injected);
            if (account) {
              store.dispatch(
                setAlert('Wallet connected with ' + formatAddress(account), 'success')
              )
              // Login with Wallet
              await store.dispatch(signInWithWallet(account))
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const updateUserAvatar = async (file: any) => {
      try {
        const formData = new FormData()
        formData.append('file', file);
        const res = await api.post('/users/updateUserAvatar', formData);
        store.dispatch(loadUser())
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    
    return {loginWithWallet, updateUserAvatar};
}
