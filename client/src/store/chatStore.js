import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChatStore = create(
  persist(
    (set) => ({
      unreadCounts: {},
      lastMessages: {},

      incrementUnread: (userId) =>
        set((state) => {
          const currentCount = state.unreadCounts[userId] || 0;
          return {
            unreadCounts: {
              ...state.unreadCounts,
              [userId]: currentCount + 1,
            },
          };
        }),

      clearUnread: (userId) =>
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [userId]: 0,
          },
        })),

      updateLastMessage: (userId, content, time) =>
        set((state) => ({
          lastMessages: {
            ...state.lastMessages,
            [userId]: { content, time: time || new Date().toISOString() },
          },
        })),

      resetChatStore: () =>
        set({
          unreadCounts: {},
          lastMessages: {},
        }),
    }),
    {
      name: "chat-notifications",
    }
  )
);

export { useChatStore };
