import { useContext } from 'react';
import { StoreContext } from './RootStore';

const useStore = () => useContext(StoreContext);

export default useStore;