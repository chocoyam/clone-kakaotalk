import { createContext } from 'react';

import ScheduleStore from './ScheduleStore';

class RootStore {
    scheduleStore : ScheduleStore;

    constructor() {
        this.scheduleStore = new ScheduleStore();
    }
}

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;
export default RootStore;