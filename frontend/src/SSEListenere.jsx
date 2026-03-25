import { useEffect } from "react";

function SSEListener() {
  useEffect(() => {
    const es = new EventSource("http://localhost:5000/api/order/get/cancelled");

    es.onmessage = (e) => {
      const data = JSON.parse(e.data); 
      console.log(data);
    };

    return () => es.close();
  }, []);

  return null; // 👈 renders nothing
}

export default SSEListener;