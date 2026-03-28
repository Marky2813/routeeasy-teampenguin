import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import axios from 'axios';
import { Separator } from "@/components/ui/separator";
import { useRid } from './riderstore'
//   "name": "rider-1",
//   "visits": [
//     {
//       "arrival": "2026-03-26T08:00:00Z",
//       "breakTime": 0,
//       "customerName": "Sunita Joshi",
//       "deliveryAddress": "88, Mayur Vihar Phase 1",
//       "job": "RE-10011",
//       "latlon": [
//         28.616788,
//         77.29416
//       ],
//       "location": {
//         "latitude": 28.616856,
//         "longitude": 77.29401
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.616788,
//         "longitude": 77.29416
//       },
//       "status": "pending",
//       "timeWindow": "7:00 AM to 9:00 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T08:20:27Z",
//       "breakTime": 0,
//       "customerName": "Nisha Patel",
//       "deliveryAddress": "78, Lajpat Nagar Central Market",
//       "distance": 12411,
//       "job": "RE-10033",
//       "latlon": [
//         28.569925,
//         77.241292
//       ],
//       "location": {
//         "latitude": 28.5699034,
//         "longitude": 77.24134529999999
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.569925,
//         "longitude": 77.241292
//       },
//       "status": "pending",
//       "timeWindow": "7:20 AM to 9:20 AM",
//       "travelTime": 927,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T08:30:35Z",
//       "breakTime": 0,
//       "customerName": "Nikhil Pandey",
//       "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
//       "distance": 4740,
//       "job": "RE-10019",
//       "latlon": [
//         28.563279,
//         77.224737
//       ],
//       "location": {
//         "latitude": 28.5630657,
//         "longitude": 77.2245733
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.563279,
//         "longitude": 77.224737
//       },
//       "status": "pending",
//       "timeWindow": "7:30 AM to 9:30 AM",
//       "travelTime": 308,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T08:35:35Z",
//       "breakTime": 0,
//       "customerName": "Nisha Sharma",
//       "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
//       "job": "RE-10035",
//       "latlon": [
//         28.563279,
//         77.224737
//       ],
//       "location": {
//         "latitude": 28.5630657,
//         "longitude": 77.2245733
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.563279,
//         "longitude": 77.224737
//       },
//       "status": "pending",
//       "timeWindow": "7:35 AM to 9:35 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T08:51:01Z",
//       "breakTime": 0,
//       "customerName": "Manish Tiwari",
//       "deliveryAddress": "91, Greater Kailash Part 2",
//       "distance": 6367,
//       "job": "RE-10007",
//       "latlon": [
//         28.529,
//         77.246313
//       ],
//       "location": {
//         "latitude": 28.5289481,
//         "longitude": 77.24642
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.529,
//         "longitude": 77.246313
//       },
//       "status": "pending",
//       "timeWindow": "7:55 AM to 9:55 AM",
//       "travelTime": 626,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T08:56:01Z",
//       "breakTime": 0,
//       "customerName": "Kavita Sharma",
//       "deliveryAddress": "91, Greater Kailash Part 2",
//       "job": "RE-10008",
//       "latlon": [
//         28.529,
//         77.246313
//       ],
//       "location": {
//         "latitude": 28.5289481,
//         "longitude": 77.24642
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.529,
//         "longitude": 77.246313
//       },
//       "status": "pending",
//       "timeWindow": "8:00 AM to 10:00 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T09:09:54Z",
//       "breakTime": 0,
//       "customerName": "Siddharth Gupta",
//       "deliveryAddress": "34, Malviya Nagar",
//       "distance": 6426,
//       "job": "RE-10015",
//       "latlon": [
//         28.533771,
//         77.209422
//       ],
//       "location": {
//         "latitude": 28.5337869,
//         "longitude": 77.2094001
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.533771,
//         "longitude": 77.209422
//       },
//       "status": "pending",
//       "timeWindow": "8:10 AM to 10:10 AM",
//       "travelTime": 533,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T09:14:54Z",
//       "breakTime": 0,
//       "customerName": "Meera Rao",
//       "deliveryAddress": "34, Malviya Nagar",
//       "job": "RE-10024",
//       "latlon": [
//         28.533771,
//         77.209422
//       ],
//       "location": {
//         "latitude": 28.5337869,
//         "longitude": 77.2094001
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.533771,
//         "longitude": 77.209422
//       },
//       "status": "pending",
//       "timeWindow": "8:15 AM to 10:15 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T09:33:04Z",
//       "breakTime": 0,
//       "customerName": "Sunita Joshi",
//       "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
//       "distance": 10574,
//       "job": "RE-10014",
//       "latlon": [
//         28.527846,
//         77.158485
//       ],
//       "location": {
//         "latitude": 28.5274118,
//         "longitude": 77.1585822
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.527846,
//         "longitude": 77.158485
//       },
//       "status": "pending",
//       "timeWindow": "8:35 AM to 10:35 AM",
//       "travelTime": 790,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T09:38:04Z",
//       "breakTime": 0,
//       "customerName": "Kavita Sharma",
//       "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
//       "job": "RE-10026",
//       "latlon": [
//         28.527846,
//         77.158485
//       ],
//       "location": {
//         "latitude": 28.5274118,
//         "longitude": 77.1585822
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.527846,
//         "longitude": 77.158485
//       },
//       "status": "pending",
//       "timeWindow": "8:40 AM to 10:40 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T09:55:53Z",
//       "breakTime": 0,
//       "customerName": "Sneha Tiwari",
//       "deliveryAddress": "101, Hauz Khas Village",
//       "distance": 9677,
//       "job": "RE-10038",
//       "latlon": [
//         28.553511,
//         77.194113
//       ],
//       "location": {
//         "latitude": 28.5533997,
//         "longitude": 77.1941654
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.553511,
//         "longitude": 77.194113
//       },
//       "status": "pending",
//       "timeWindow": "8:55 AM to 10:55 AM",
//       "travelTime": 769,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T10:00:53Z",
//       "breakTime": 0,
//       "customerName": "Shweta Pandey",
//       "deliveryAddress": "101, Hauz Khas Village",
//       "job": "RE-10030",
//       "latlon": [
//         28.553511,
//         77.194113
//       ],
//       "location": {
//         "latitude": 28.5533997,
//         "longitude": 77.1941654
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.553511,
//         "longitude": 77.194113
//       },
//       "status": "pending",
//       "timeWindow": "9:00 AM to 11:00 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T10:19:23Z",
//       "breakTime": 0,
//       "customerName": "Divya Malhotra",
//       "deliveryAddress": "7, Connaught Place Inner Circle",
//       "distance": 11644,
//       "job": "RE-10023",
//       "latlon": [
//         28.63256,
//         77.218197
//       ],
//       "location": {
//         "latitude": 28.6325109,
//         "longitude": 77.2179999
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.63256,
//         "longitude": 77.218197
//       },
//       "status": "pending",
//       "timeWindow": "9:20 AM to 11:20 AM",
//       "travelTime": 810,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T10:30:49Z",
//       "breakTime": 0,
//       "customerName": "Saurabh Malhotra",
//       "deliveryAddress": "19, Karol Bagh Main Road",
//       "distance": 5255,
//       "job": "RE-10028",
//       "latlon": [
//         28.655674,
//         77.187471
//       ],
//       "location": {
//         "latitude": 28.6556793,
//         "longitude": 77.1874601
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.655674,
//         "longitude": 77.187471
//       },
//       "status": "pending",
//       "timeWindow": "9:30 AM to 11:30 AM",
//       "travelTime": 386,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T10:35:49Z",
//       "breakTime": 0,
//       "customerName": "Sunita Patel",
//       "deliveryAddress": "19, Karol Bagh Main Road",
//       "job": "RE-10034",
//       "latlon": [
//         28.655674,
//         77.187471
//       ],
//       "location": {
//         "latitude": 28.6556793,
//         "longitude": 77.1874601
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.655674,
//         "longitude": 77.187471
//       },
//       "status": "pending",
//       "timeWindow": "9:35 AM to 11:35 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T10:47:18Z",
//       "breakTime": 0,
//       "customerName": "Divya Mishra",
//       "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
//       "distance": 3076,
//       "job": "RE-10003",
//       "latlon": [
//         28.655419,
//         77.16462
//       ],
//       "location": {
//         "latitude": 28.6554182,
//         "longitude": 77.16462
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.655419,
//         "longitude": 77.16462
//       },
//       "status": "pending",
//       "timeWindow": "9:50 AM to 11:50 AM",
//       "travelTime": 389,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T10:52:18Z",
//       "breakTime": 0,
//       "customerName": "Riya Pandey",
//       "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
//       "job": "RE-10004",
//       "latlon": [
//         28.655419,
//         77.16462
//       ],
//       "location": {
//         "latitude": 28.6554182,
//         "longitude": 77.16462
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.655419,
//         "longitude": 77.16462
//       },
//       "status": "pending",
//       "timeWindow": "9:55 AM to 11:55 AM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T11:03:47Z",
//       "breakTime": 0,
//       "customerName": "Neha Malhotra",
//       "deliveryAddress": "33, Kirti Nagar Furniture Market",
//       "distance": 4561,
//       "job": "RE-10021",
//       "latlon": [
//         28.644608,
//         77.141937
//       ],
//       "location": {
//         "latitude": 28.6446429,
//         "longitude": 77.14188639999999
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.644608,
//         "longitude": 77.141937
//       },
//       "status": "pending",
//       "timeWindow": "10:05 AM to 12:05 PM",
//       "travelTime": 389,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T11:08:47Z",
//       "breakTime": 0,
//       "customerName": "Siddharth Kumar",
//       "deliveryAddress": "33, Kirti Nagar Furniture Market",
//       "job": "RE-10018",
//       "latlon": [
//         28.644608,
//         77.141937
//       ],
//       "location": {
//         "latitude": 28.6446429,
//         "longitude": 77.14188639999999
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.644608,
//         "longitude": 77.141937
//       },
//       "status": "pending",
//       "timeWindow": "10:10 AM to 12:10 PM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T11:19:20Z",
//       "breakTime": 0,
//       "customerName": "Divya Saxena",
//       "deliveryAddress": "12, Rajouri Garden Main Market, Rajouri Garden",
//       "distance": 3911,
//       "job": "RE-10017",
//       "latlon": [
//         28.646948,
//         77.119865
//       ],
//       "location": {
//         "latitude": 28.6468173,
//         "longitude": 77.1199319
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.646948,
//         "longitude": 77.119865
//       },
//       "status": "pending",
//       "timeWindow": "10:20 AM to 12:20 PM",
//       "travelTime": 333,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T11:31:08Z",
//       "breakTime": 0,
//       "customerName": "Rahul Mishra",
//       "deliveryAddress": "C-15, Block C, Janakpuri",
//       "distance": 5259,
//       "job": "RE-10029",
//       "latlon": [
//         28.621695,
//         77.096352
//       ],
//       "location": {
//         "latitude": 28.6210479,
//         "longitude": 77.0960163
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.621695,
//         "longitude": 77.096352
//       },
//       "status": "pending",
//       "timeWindow": "10:35 AM to 12:35 PM",
//       "travelTime": 408,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T11:36:08Z",
//       "breakTime": 0,
//       "customerName": "Divya Mishra",
//       "deliveryAddress": "C-15, Block C, Janakpuri",
//       "job": "RE-10037",
//       "latlon": [
//         28.621695,
//         77.096352
//       ],
//       "location": {
//         "latitude": 28.6210479,
//         "longitude": 77.0960163
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.621695,
//         "longitude": 77.096352
//       },
//       "status": "pending",
//       "timeWindow": "10:40 AM to 12:40 PM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T11:48:04Z",
//       "breakTime": 0,
//       "customerName": "Ajay Pandey",
//       "deliveryAddress": "45A, Sector 7, Dwarka",
//       "distance": 6655,
//       "job": "RE-10006",
//       "latlon": [
//         28.593529,
//         77.076338
//       ],
//       "location": {
//         "latitude": 28.593306,
//         "longitude": 77.0762699
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.593529,
//         "longitude": 77.076338
//       },
//       "status": "pending",
//       "timeWindow": "10:50 AM to 12:50 PM",
//       "travelTime": 416,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T11:53:04Z",
//       "breakTime": 0,
//       "customerName": "Vikram Joshi",
//       "deliveryAddress": "45A, Sector 7, Dwarka",
//       "job": "RE-10005",
//       "latlon": [
//         28.593529,
//         77.076338
//       ],
//       "location": {
//         "latitude": 28.593306,
//         "longitude": 77.0762699
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.593529,
//         "longitude": 77.076338
//       },
//       "status": "pending",
//       "timeWindow": "10:55 AM to 12:55 PM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T12:36:50Z",
//       "breakTime": 1800,
//       "customerName": "Divya Mishra",
//       "deliveryAddress": "67, Uttam Nagar East",
//       "distance": 7825,
//       "job": "RE-10032",
//       "latlon": [
//         28.62808,
//         77.053063
//       ],
//       "location": {
//         "latitude": 28.62808,
//         "longitude": 77.05303649999999
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.62808,
//         "longitude": 77.053063
//       },
//       "status": "pending",
//       "timeWindow": "11:40 AM to 1:40 PM",
//       "travelTime": 526,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T12:41:50Z",
//       "customerName": "Divya Mishra",
//       "deliveryAddress": "67, Uttam Nagar East",
//       "job": "RE-10027",
//       "latlon": [
//         28.62808,
//         77.053063
//       ],
//       "location": {
//         "latitude": 28.62808,
//         "longitude": 77.05303649999999
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.62808,
//         "longitude": 77.053063
//       },
//       "status": "pending",
//       "timeWindow": "11:45 AM to 1:45 PM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T12:54:42Z",
//       "customerName": "Siddharth Agarwal",
//       "deliveryAddress": "102, Vikas Puri Block J",
//       "distance": 3616,
//       "job": "RE-10012",
//       "latlon": [
//         28.646078,
//         77.070356
//       ],
//       "location": {
//         "latitude": 28.6461538,
//         "longitude": 77.0704536
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.646078,
//         "longitude": 77.070356
//       },
//       "status": "pending",
//       "timeWindow": "11:55 AM to 1:55 PM",
//       "travelTime": 472,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T13:09:28Z",
//       "customerName": "Kavita Gupta",
//       "deliveryAddress": "5, Paschim Vihar Block A",
//       "distance": 6204,
//       "job": "RE-10040",
//       "latlon": [
//         28.679477,
//         77.089871
//       ],
//       "location": {
//         "latitude": 28.6794931,
//         "longitude": 77.0897425
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.679477,
//         "longitude": 77.089871
//       },
//       "status": "pending",
//       "timeWindow": "12:10 PM to 2:10 PM",
//       "travelTime": 586,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T13:14:28Z",
//       "customerName": "Rahul Gupta",
//       "deliveryAddress": "5, Paschim Vihar Block A",
//       "job": "RE-10022",
//       "latlon": [
//         28.679477,
//         77.089871
//       ],
//       "location": {
//         "latitude": 28.6794931,
//         "longitude": 77.0897425
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.679477,
//         "longitude": 77.089871
//       },
//       "status": "pending",
//       "timeWindow": "12:15 PM to 2:15 PM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T13:32:38Z",
//       "customerName": "Yash Mishra",
//       "deliveryAddress": "Flat 9B, Royal Heights, Rohini Sector 11",
//       "distance": 9818,
//       "job": "RE-10036",
//       "latlon": [
//         28.727662,
//         77.105078
//       ],
//       "location": {
//         "latitude": 28.7288259,
//         "longitude": 77.1068059
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.727662,
//         "longitude": 77.105078
//       },
//       "status": "pending",
//       "timeWindow": "12:35 PM to 2:35 PM",
//       "travelTime": 790,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T13:49:59Z",
//       "customerName": "Gaurav Mehta",
//       "deliveryAddress": "B-204, Green Apartments, Pitampura",
//       "distance": 6893,
//       "job": "RE-10010",
//       "latlon": [
//         28.713944,
//         77.146855
//       ],
//       "location": {
//         "latitude": 28.7139814,
//         "longitude": 77.1467667
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.713944,
//         "longitude": 77.146855
//       },
//       "status": "pending",
//       "timeWindow": "12:50 PM to 2:50 PM",
//       "travelTime": 741,
//       "waitTime": 0
//     },
//     {
//       "arrival": "2026-03-26T13:54:59Z",
//       "customerName": "Akash Verma",
//       "deliveryAddress": "B-204, Green Apartments, Pitampura",
//       "job": "RE-10009",
//       "latlon": [
//         28.713944,
//         77.146855
//       ],
//       "location": {
//         "latitude": 28.7139814,
//         "longitude": 77.1467667
//       },
//       "serviceTime": 300,
//       "snappedLocation": {
//         "latitude": 28.713944,
//         "longitude": 77.146855
//       },
//       "status": "pending",
//       "timeWindow": "12:55 PM to 2:55 PM",
//       "travelTime": 0,
//       "waitTime": 0
//     },
//   ],
// }


//data is an objects, data.visits is the array, it will be empty while it is processing. 


function Rider() {
  const [allocated, setAllocated] = useState(false);
  const visits = useRid((state) => state.visits);
  const setVisits = useRid((state) => state.updateVisits)
  const [currentIndex, setCurrentIndex] = useState(() => Number(localStorage.getItem("index")) || 0);
  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    addEventListener("beforeunload", setIndex)
    function setIndex() {
      window.localStorage.setItem("index", currentIndexRef.current);
    }
    return () => {
      window.removeEventListener("beforeunload", setIndex);
      setIndex();
    }
  }, [])

  useEffect(() => {
    // make the call to the backend and get data. if data .length is greater than zero, means that the orders have been allocated, else not
    const fetchRiderData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rider');
        const data = res.data;
        if (data?.visits?.length > 0) {
          setAllocated(true);
          setVisits(data.visits);
        }
      } catch (err) {
        console.error("Could not get rider order data", err)
      }
    }
    fetchRiderData()
  }, [])
  //this won't work because the useEffect expects a callback which either returns nothing or a clenaup function. not a promise. 



  const currentStop = visits[currentIndex];
  const remainingStops = visits.filter((ele, index) => (currentStop.job !== ele.job) && (ele.status === "pending" || (ele.status === "cancelled" && index > currentIndex))).map((ele) => ({
    ...ele, deliveryAddress: ele.deliveryAddress.split(",").slice(1).join(",")
  }));


  //formatting the delivery addresses 
  // for(let i = 0; i < remainingStops.length; i++) {
  //   const address = remainingStops[i].delivery_address.split(",");
  //   address.splice(0,1);
  //   let newAddress = address.join(","); 
  //   remainingStops[i].delivery_address = newAddress.trimStart(); 
  // }


  //current stop revers to the object which refers to the data being delivered now.  

  function clickFn() {
    console.log(remainingStops)
  }

  async function orderFailed(job) {
    //this function needs to set the status as failed, then take the id and send it to the backend and shift the next to the next one
    try {
    await axios.get(`http://localhost:5000/api/order/fail/${job}`)
    currentStop.status = "failed";
    currentIndexRef.current = ++currentIndexRef.current;
    if(currentIndexRef.current === visits.length) {
      currentIndexRef.current = 0; 
      setAllocated(false); 
      setCurrentIndex(0); 
      alert("all orders have been delivered successfully")
      //make one completed deliveries state
      return; 
    }
    setCurrentIndex(prev => prev + 1);
    console.log(currentIndex, currentIndexRef.current)
    } catch(err) {
      console.error("Unable to mark delivery as failed", err)
    }
  }

  async function orderDelivered(job) {
    try {
    await axios.get(`http://localhost:5000/api/order/complete/${job}`)
    currentStop.status = "success";
    currentIndexRef.current = ++currentIndexRef.current;
    if(currentIndexRef.current === visits.length) {
      currentIndexRef.current = 0; 
      setAllocated(false); 
      setCurrentIndex(0); 
      alert("all orders have been delivered successfully")
      //make one completed deliveries state
      return; 
    }
    setCurrentIndex(prev => prev + 1);
    } catch(err) {
      console.error("Unable to mark delivery as success", err)
    }
  }
  return (
    <>
      <div className="mt-3 ml-2">
        {allocated ? (
          <>
            <p className="text-sm font-semibold">RouteEasy • Ravi Bhadhur</p>
            <h1 className="text-lg font-bold">{remainingStops.length + 1} Stops Today</h1>
            <p className="text-sm font-semibold">Optimised route • 50km total</p>
          </>
        )
          :
          (
            <>
              <p className="text-sm font-semibold">RouteEasy • Ravi Bhadhur</p>
              <h1 className="text-lg font-bold">No orders alloted</h1>
              <p className="text-sm font-semibold">Optimised route • -</p>
            </>
          )}
      </div>
      <div className="mt-3 text-white bg-black mx-2 rounded-lg mb-8">
        {allocated ? (
          <>
            <h3 className="font-thin text-sm p-2">Current Stop:</h3>
            <h2 className="text-sm font-bold pl-2">{currentStop.customerName}</h2>
            <h3 className="text-sm pl-2 font-thin">{currentStop.deliveryAddress}</h3>
            <h3 className="text-sm pl-2 font-thin pb-2">Window: {currentStop.timeWindow}</h3>
            <div className="flex flex-col p-2 gap-1">
              <Button type='button' onClick={clickFn} className='dark'>Navigate to stop</Button>
              <Button type='button' className='dark' onClick={() => orderFailed(currentStop.job)}>Mark as failed</Button>
              <Button type='button' className='dark' onClick={() => orderDelivered(currentStop.job)}>Mark as delivered</Button>
            </div>
          </>
        )
          :
          (
            <>
              <h3 className="font-thin text-sm p-2">Current Stop:</h3>
              <h2 className="text-sm font-bold pl-2">-</h2>
              <h3 className="text-sm pl-2 font-thin">-</h3>
              <h3 className="text-sm pl-2 font-thin pb-2">Window: -</h3>
              <div className="flex flex-col p-2 gap-1">
                <Button type='button' className='dark'>Navigate to stop</Button>
                <Button type='button' className='dark'>Mark as failed</Button>
                <Button type='button' className='dark'>Mark as delivered</Button>
              </div>
            </>
          )}

      </div>
      <div className="mx-2">
        <Separator className='my-3 bg-black' />
      </div>
      <div className="mt-2">
        <h3 className="text-md font-semibold ml-2">Upcoming Stops</h3>
        <div className="h-80 overflow-x-auto mx-4 text-sm ">
          {remainingStops.map((ele) => {
            return (
              <>
                <div className="flex gap-15 my-2">
                  <div className="flex flex-col">
                    <div className="text-base font-semibold">{ele.customerName}</div>
                    <div className="text-xs w-35">{ele.deliveryAddress}</div>
                  </div>
                  <div className="text-sm font-semibold">{ele.status === "pending" ? <>{ele.timeWindow}</>:<p className="text-red-600">cancelled</p>}</div>
                </div>
                <Separator className='my-2 bg-black' />
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Rider;

//agendas for today
//- when rider marks the deliveries as failed or completed. 
//a) the top 4 orders remain static and the rest keep changing, why is this. 
//b) they aren't being updated on the dashboard front.
//local storage needs to reset everyday or on every upload.   