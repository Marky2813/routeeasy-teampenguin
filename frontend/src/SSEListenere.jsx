import { useEffect } from "react";
import { useZus } from './store'
import { useRid } from './riderstore'

function SSEListener() {
  const setData = useZus((state) => state.updateOrders);
  const setVisits = useRid((state) => state.updateVisits)
  useEffect(() => {
    const es = new EventSource("http://localhost:5000/api/order/get/status");
    es.onmessage = (e) => {
      const latestData = useZus.getState().ordersData;
      const latestRiderData = useRid.getState().visits;
      console.log(e.data)
      const newStatus = e.data;
      const jobId = Object.keys(newStatus)[0];
      setData(latestData.map(order =>
        order.job === jobId ? { ...order, status: newStatus[jobId] } : order
      ));
      setVisits(latestRiderData.map(order =>
        order.job === jobId ? { ...order, status: newStatus[jobId] } : order
      ));
    };

    es.onerror = (e) => {
      console.error("SSE connection error", e);
      es.close();
    };

    return () => es.close();
  }, []);

  return null; // 👈 renders nothing
}

export default SSEListener;