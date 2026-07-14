import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePeopleDataStore = create(
    persist(
        (set) => ({
            peoples: [],
            setPeople: (data) =>set({peoples: data}),
            removePeople: () =>set({peoples: []})
        }),
        {
            name: "people-storage",
        }
    )
)

export {usePeopleDataStore}