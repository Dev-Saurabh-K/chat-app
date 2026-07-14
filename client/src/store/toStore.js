import { create } from "zustand";

const useToStore = create((set)=>({
    to_id: 0,
    set_to_id: (id) => set(()=>({to_id: id})),
    remove_to_id: () => set(()=>({to_id: 0}))
}))

export {useToStore}