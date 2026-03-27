import { create } from 'zustand'; 

export const  useRid = create((set) => ({
  visits: [],
  updateVisits: (orders) => {
    set({visits: orders})
  }, 
}))