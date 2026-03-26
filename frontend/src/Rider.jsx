import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { useZus } from "./store";
import { Separator } from "@/components/ui/separator";

const data={
  "name": "rider-1",
  "visits": [
    {
      "arrival": "2026-03-26T08:00:00Z",
      "breakTime": 0,
      "customer_name": "Yash Mishra",
      "delivery_address": "Flat 9B, Royal Heights, Rohini Sector 11",
      "job": "RE-10036",
      "latlon": [
        28.727662,
        77.105078
      ],
      "location": {
        "latitude": 28.7288259,
        "longitude": 77.1068059
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.727662,
        "longitude": 77.105078
      },
      "time_window": "7:00 AM to 9:00 AM",
      "travelTime": 0,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T08:17:21Z",
      "breakTime": 0,
      "customer_name": "Gaurav Mehta",
      "delivery_address": "B-204, Green Apartments, Pitampura",
      "distance": 6893,
      "job": "RE-10010",
      "latlon": [
        28.713944,
        77.146855
      ],
      "location": {
        "latitude": 28.7139814,
        "longitude": 77.1467667
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.713944,
        "longitude": 77.146855
      },
      "time_window": "7:20 AM to 9:20 AM",
      "travelTime": 741,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T08:38:31Z",
      "breakTime": 0,
      "customer_name": "Siddharth Agarwal",
      "delivery_address": "102, Vikas Puri Block J",
      "distance": 14156,
      "job": "RE-10012",
      "latlon": [
        28.646078,
        77.070356
      ],
      "location": {
        "latitude": 28.6461538,
        "longitude": 77.0704536
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.646078,
        "longitude": 77.070356
      },
      "time_window": "7:40 AM to 9:40 AM",
      "travelTime": 970,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T08:54:05Z",
      "breakTime": 0,
      "customer_name": "Divya Saxena",
      "delivery_address": "12, Rajouri Garden Main Market, Rajouri Garden",
      "distance": 6574,
      "job": "RE-10017",
      "latlon": [
        28.646948,
        77.119865
      ],
      "location": {
        "latitude": 28.6468173,
        "longitude": 77.1199319
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.646948,
        "longitude": 77.119865
      },
      "time_window": "7:55 AM to 9:55 AM",
      "travelTime": 634,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T09:04:43Z",
      "breakTime": 0,
      "customer_name": "Siddharth Kumar",
      "delivery_address": "33, Kirti Nagar Furniture Market",
      "distance": 3877,
      "job": "RE-10018",
      "latlon": [
        28.644608,
        77.141937
      ],
      "location": {
        "latitude": 28.6446429,
        "longitude": 77.14188639999999
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.644608,
        "longitude": 77.141937
      },
      "time_window": "8:05 AM to 10:05 AM",
      "travelTime": 338,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T09:17:08Z",
      "breakTime": 0,
      "customer_name": "Riya Pandey",
      "delivery_address": "Flat 14D, Blue Enclave, Patel Nagar",
      "distance": 3618,
      "job": "RE-10004",
      "latlon": [
        28.655419,
        77.16462
      ],
      "location": {
        "latitude": 28.6554182,
        "longitude": 77.16462
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.655419,
        "longitude": 77.16462
      },
      "time_window": "8:20 AM to 10:20 AM",
      "travelTime": 445,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T09:28:55Z",
      "breakTime": 0,
      "customer_name": "Saurabh Malhotra",
      "delivery_address": "19, Karol Bagh Main Road",
      "distance": 3089,
      "job": "RE-10028",
      "latlon": [
        28.655674,
        77.187471
      ],
      "location": {
        "latitude": 28.6556793,
        "longitude": 77.1874601
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.655674,
        "longitude": 77.187471
      },
      "time_window": "8:30 AM to 10:30 AM",
      "travelTime": 407,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T09:49:22Z",
      "breakTime": 0,
      "customer_name": "Kavita Kumar",
      "delivery_address": "Flat 3C, Silver Tower, Shahdara",
      "distance": 14091,
      "job": "RE-10002",
      "latlon": [
        28.686559,
        77.292215
      ],
      "location": {
        "latitude": 28.6865527,
        "longitude": 77.2922157
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.686559,
        "longitude": 77.292215
      },
      "time_window": "8:50 AM to 10:50 AM",
      "travelTime": 927,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T09:54:22Z",
      "breakTime": 0,
      "customer_name": "Aarav Tiwari",
      "delivery_address": "Flat 3C, Silver Tower, Shahdara",
      "job": "RE-10001",
      "latlon": [
        28.686559,
        77.292215
      ],
      "location": {
        "latitude": 28.6865527,
        "longitude": 77.2922157
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.686559,
        "longitude": 77.292215
      },
      "time_window": "8:55 AM to 10:55 AM",
      "travelTime": 0,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T10:13:56Z",
      "breakTime": 0,
      "customer_name": "Sunita Tiwari",
      "delivery_address": "88, Mayur Vihar Phase 1",
      "distance": 11685,
      "job": "RE-10020",
      "latlon": [
        28.616788,
        77.29416
      ],
      "location": {
        "latitude": 28.616856,
        "longitude": 77.29401
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.616788,
        "longitude": 77.29416
      },
      "time_window": "9:15 AM to 11:15 AM",
      "travelTime": 874,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T10:37:16Z",
      "breakTime": 0,
      "customer_name": "Nisha Sharma",
      "delivery_address": "3rd Floor, Ansal Plaza, Nehru Place",
      "distance": 16090,
      "job": "RE-10035",
      "latlon": [
        28.563279,
        77.224737
      ],
      "location": {
        "latitude": 28.5630657,
        "longitude": 77.2245733
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.563279,
        "longitude": 77.224737
      },
      "time_window": "9:40 AM to 11:40 AM",
      "travelTime": 1100,
      "waitTime": 0
    },
    {
      "arrival": "2026-03-26T10:50:08Z",
      "breakTime": 0,
      "customer_name": "Sneha Tiwari",
      "delivery_address": "101, Hauz Khas Village",
      "distance": 5667,
      "job": "RE-10038",
      "latlon": [
        28.553511,
        77.194113
      ],
      "location": {
        "latitude": 28.5533997,
        "longitude": 77.1941654
      },
      "serviceTime": 300,
      "snappedLocation": {
        "latitude": 28.553511,
        "longitude": 77.194113
      },
      "time_window": "9:50 AM to 11:50 AM",
      "travelTime": 472,
      "waitTime": 0
    }
  ]
}
//data is an objects, data.visits is the array, it will be empty while it is processing. 


function Rider() {
  const stops = useZus((state) => state.ordersCount);
  const orders = useZus((state) => state.ordersData);

  
  function clickFn() {
    console.log(orders)
  }
 return(
  <>
  <div className="mt-3 ml-2">
   <p className="text-sm font-semibold">RouteEasy • Ravi Bhai</p>
  <h1 className="text-lg font-bold">{stops} Stops Today</h1>
  <p className="text-sm font-semibold">Optimised route • 50km total</p>
  </div>
  <div className="mt-3 text-white bg-black mx-2 rounded-lg mb-8"> 
    <h3 className="font-thin text-sm p-2">Current Stop:</h3>
    <h2 className="text-sm font-bold pl-2">Honey Singh</h2>
    <h3 className="text-sm pl-2 font-thin">Blue Eyes Chowk, sector16, dwarka</h3>
    <h3 className="text-sm pl-2 font-thin pb-2">Window 10:00am-12:00am</h3>
    <div className="flex flex-col p-2 gap-1">
    <Button type = 'button' onClick={clickFn} className='dark'>Navigate to stop</Button>
    <Button type = 'button' className='dark'>Mark as failed</Button>
    <Button type = 'button' className='dark'>Mark as delivered</Button>
    </div>
  </div>
  <div className="mx-2">
    <Separator className='my-3 bg-black'/>
  </div>
  <div className="mt-2">
    <h3 className="text-md font-semibold ml-2">Upcoming Stops</h3>
  </div>
  </>
 )
}

export default Rider; 

//the things which need to be handled here, 
//- if there are no deliveries alloted,i.e visits length is 0, then simply show that no deliveries have been alloted
//- if deliveries are present, we need to show them, all of these are pending 
//- the sse will send data: id, add state and set it as cancelled, in the list show cancelled.
//there will be a current variable which will point to the first order, this will be saved in localstorage. then as the orders are marked as delivered it will jump to the next one. 
//and the object in the current will not be in the list and it should not have a status of pending 