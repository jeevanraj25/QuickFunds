import axios from "axios";
import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const  authState = atom({
    key:"authState",
    default:null,
    effects_UNSTABLE: [persistAtom]
})

export const userAtom = atom({
    key: 'userAtom',  
    default: false,   
    effects_UNSTABLE:[persistAtom]
});


export const userDataSelector = selector({
    key: 'userDataSelector',
    get: async () => {
      try {
        const balanceResponse = await axios.get("http://localhost:3000/api/v1/tarnsaction/balance", {
          withCredentials: true,
        });
        
        
        const dataResponse = await axios.get("http://localhost:3000/api/v1/user/getdata", {
          withCredentials: true,
        });

        return {
          balance: balanceResponse.data?.bal,
          users: dataResponse.data?.users,
          transactions: dataResponse.data?.transactions,
        };
      } catch (error) {
        console.log("Failed to fetch user data:", error);
        return {
          balance: 0,
          users: 0,
          transactions: 0,
        };
      }
    },
  });
  
  