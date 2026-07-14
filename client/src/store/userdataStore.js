import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDataStore = create(
    persist(
        (set) => ({
            user_id: 0,
            user_name: "",
            setUser_id: (id) => set({user_id: id}),
            removeUser_id: () => set({user_id: 0}),
            setUser_name: (name) => set({user_name: name}),
            removeUsername: () => set({user_name: ""})
        }),
        {
            name: "user-storage", 
        }
    )
)
export {useDataStore}