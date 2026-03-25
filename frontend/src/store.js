import { create } from 'zustand'; 

export const  useZus = create((set) => ({
  ordersData: [], 
  ordersCount: 0,
  failedDeliveries: 0,
  updateOrders: (orders) => {
    set({ordersData: orders,ordersCount: orders.length})
  }, 
}))