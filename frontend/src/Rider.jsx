import { Button } from "./components/ui/button";
import { useZus } from "./store";

function Rider() {
  const stops = useZus((state) => state.ordersCount)
 return(
  <>
  <div className="mt-3 ml-2">
   <p className="text-sm font-semibold">RouteEasy • Ravi Bhai</p>
  <h1 className="text-lg font-bold">{stops} Stops Today</h1>
  <p className="text-sm font-semibold">Optimised route • 50km total</p>
  </div>
  <div className="mt-3"> 
    <h3>Current Stop</h3>
    <h2>Honey Singh</h2>
    <h3>Blue Eyes Chowk, sector16, dwarka</h3>
    <h3>Window 10:00-12:00am</h3>
    <Button type = 'button'>Navigate to stop</Button>
    <Button type = 'button'>Mark as failed</Button>
    <Button type = 'button'>Mark as delivered</Button>
  </div>
  <div className="mt-3">
    <h3>Upcoming Stops</h3>
    <p>Display the list of stops</p>
  </div>
  </>
 )
}

export default Rider; 