import { useState, useRef } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import './App.css'
import { AppSidebar } from '@/components/app-sidebar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from '@/components/ui/button'
import { useDropzone } from "react-dropzone"
import * as XLSX from "xlsx"
import Map from './Map'
import OrdersTable from './OrdersTable'
import axios from "axios"
const dummyData = [
    {
        "orderId": "RE-10001",
        "customerName": "Sunita Joshi",
        "phoneNumber": "+91 8964233435",
        "deliveryAddress": "88, Mayur Vihar Phase 1",
        "pincode": "110091",
        "packageWeight(kg)": 1.37,
        "coordinates": [
            28.616856,
            77.29401
        ]
    },
    {
        "orderId": "RE-10002",
        "customerName": "Siddharth Agarwal",
        "phoneNumber": "+91 9388860209",
        "deliveryAddress": "102, Vikas Puri Block J",
        "pincode": "110018",
        "packageWeight(kg)": 0.86,
        "coordinates": [
            28.6461538,
            77.0704536
        ]
    },
    {
        "orderId": "RE-10003",
        "customerName": "Meera Tiwari",
        "phoneNumber": "+91 9366590375",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": "110092",
        "packageWeight(kg)": 2.19,
        "coordinates": [
            28.6362652,
            77.28183489999999
        ]
    },
    {
        "orderId": "RE-10004",
        "customerName": "Sunita Joshi",
        "phoneNumber": "+91 7498970487",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 2.27,
        "coordinates": [
            28.5274118,
            77.1585822
        ]
    },
    {
        "orderId": "RE-10005",
        "customerName": "Siddharth Gupta",
        "phoneNumber": "+91 8536951468",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 5.21,
        "coordinates": [
            28.5337869,
            77.2094001
        ]
    },
    {
        "orderId": "RE-10006",
        "customerName": "Aarav Tiwari",
        "phoneNumber": "+91 7667657517",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 0.52,
        "coordinates": [
            28.6865527,
            77.2922157
        ]
    },
    {
        "orderId": "RE-10007",
        "customerName": "Mohit Mishra",
        "phoneNumber": "+91 7168156861",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": "110007",
        "packageWeight(kg)": 1.32,
        "coordinates": [
            28.683744,
            77.203908
        ]
    },
    {
        "orderId": "RE-10008",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 8951033281",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 1.06,
        "coordinates": [
            28.6554182,
            77.16462
        ]
    },
    {
        "orderId": "RE-10009",
        "customerName": "Divya Saxena",
        "phoneNumber": "+91 9240864922",
        "deliveryAddress": "12, Rajouri Garden Main Market, Rajouri Garden",
        "pincode": "110027",
        "packageWeight(kg)": 0.86,
        "coordinates": [
            28.6468173,
            77.1199319
        ]
    },
    {
        "orderId": "RE-10010",
        "customerName": "Siddharth Kumar",
        "phoneNumber": "+91 8015190922",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": "110015",
        "packageWeight(kg)": 0.47,
        "coordinates": [
            28.6446429,
            77.14188639999999
        ]
    },
    {
        "orderId": "RE-10011",
        "customerName": "Nikhil Pandey",
        "phoneNumber": "+91 7657917261",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 1.66,
        "coordinates": [
            28.5630657,
            77.2245733
        ]
    },
    {
        "orderId": "RE-10012",
        "customerName": "Kavita Kumar",
        "phoneNumber": "+91 8159372409",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 0.29,
        "coordinates": [
            28.6865527,
            77.2922157
        ]
    },
    {
        "orderId": "RE-10013",
        "customerName": "Mohit Kumar",
        "phoneNumber": "+91 8992463516",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 0.27,
        "coordinates": [
            28.6554182,
            77.16462
        ]
    },
    {
        "orderId": "RE-10014",
        "customerName": "Suresh Patel",
        "phoneNumber": "+91 7582163723",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 2.39,
        "coordinates": [
            28.5630657,
            77.2245733
        ]
    },
    {
        "orderId": "RE-10015",
        "customerName": "Manish Saxena",
        "phoneNumber": "+91 9614740658",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 2.79,
        "coordinates": [
            28.6865527,
            77.2922157
        ]
    },
    {
        "orderId": "RE-10016",
        "customerName": "Sneha Gupta",
        "phoneNumber": "+91 8642447711",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 0.61,
        "coordinates": [
            28.5274118,
            77.1585822
        ]
    },
    {
        "orderId": "RE-10017",
        "customerName": "Vikram Joshi",
        "phoneNumber": "+91 8235262310",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 4.56,
        "coordinates": [
            28.593306,
            77.0762699
        ]
    },
    {
        "orderId": "RE-10018",
        "customerName": "Sunita Tiwari",
        "phoneNumber": "+91 9666258624",
        "deliveryAddress": "88, Mayur Vihar Phase 1",
        "pincode": "110091",
        "packageWeight(kg)": 0.33,
        "coordinates": [
            28.616856,
            77.29401
        ]
    },
    {
        "orderId": "RE-10019",
        "customerName": "Ajay Pandey",
        "phoneNumber": "+91 9525868192",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 1.47,
        "coordinates": [
            28.593306,
            77.0762699
        ]
    },
    {
        "orderId": "RE-10020",
        "customerName": "Neha Malhotra",
        "phoneNumber": "+91 7346551147",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": "110015",
        "packageWeight(kg)": 2.15,
        "coordinates": [
            28.6446429,
            77.14188639999999
        ]
    },
    {
        "orderId": "RE-10021",
        "customerName": "Riya Pandey",
        "phoneNumber": "+91 7971167425",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 0.82,
        "coordinates": [
            28.6554182,
            77.16462
        ]
    },
    {
        "orderId": "RE-10022",
        "customerName": "Rahul Gupta",
        "phoneNumber": "+91 8648748408",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": "110063",
        "packageWeight(kg)": 4.47,
        "coordinates": [
            28.6794931,
            77.0897425
        ]
    },
    {
        "orderId": "RE-10023",
        "customerName": "Priya Agarwal",
        "phoneNumber": "+91 8412048126",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 9.84,
        "coordinates": [
            28.6865527,
            77.2922157
        ]
    },
    {
        "orderId": "RE-10024",
        "customerName": "Divya Malhotra",
        "phoneNumber": "+91 8241798898",
        "deliveryAddress": "7, Connaught Place Inner Circle",
        "pincode": "110001",
        "packageWeight(kg)": 5.97,
        "coordinates": [
            28.6325109,
            77.2179999
        ]
    },
    {
        "orderId": "RE-10025",
        "customerName": "Meera Rao",
        "phoneNumber": "+91 7014197433",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 4.24,
        "coordinates": [
            28.5337869,
            77.2094001
        ]
    },
    {
        "orderId": "RE-10026",
        "customerName": "Divya Agarwal",
        "phoneNumber": "+91 9153464619",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": "110007",
        "packageWeight(kg)": 1.61,
        "coordinates": [
            28.683744,
            77.203908
        ]
    },
    {
        "orderId": "RE-10027",
        "customerName": "Kavita Sharma",
        "phoneNumber": "+91 7368075753",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 1,
        "coordinates": [
            28.5274118,
            77.1585822
        ]
    },
    {
        "orderId": "RE-10028",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 7672744590",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": "110059",
        "packageWeight(kg)": 7.34,
        "coordinates": [
            28.62808,
            77.05303649999999
        ]
    },
    {
        "orderId": "RE-10029",
        "customerName": "Saurabh Malhotra",
        "phoneNumber": "+91 7656212702",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": "110005",
        "packageWeight(kg)": 0.76,
        "coordinates": [
            28.6556793,
            77.1874601
        ]
    },
    {
        "orderId": "RE-10030",
        "customerName": "Akash Verma",
        "phoneNumber": "+91 7191064627",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": "110034",
        "packageWeight(kg)": 3.42,
        "coordinates": [
            28.7139814,
            77.1467667
        ]
    },
    {
        "orderId": "RE-10031",
        "customerName": "Akash Malhotra",
        "phoneNumber": "+91 7635723121",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 6.99,
        "coordinates": [
            28.6865527,
            77.2922157
        ]
    },
    {
        "orderId": "RE-10032",
        "customerName": "Rahul Mishra",
        "phoneNumber": "+91 8078226838",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 2.35,
        "coordinates": [
            28.6210479,
            77.0960163
        ]
    },
    {
        "orderId": "RE-10033",
        "customerName": "Sunita Tiwari",
        "phoneNumber": "+91 8841133440",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 3.13,
        "coordinates": [
            28.6554182,
            77.16462
        ]
    },
    {
        "orderId": "RE-10034",
        "customerName": "Shweta Pandey",
        "phoneNumber": "+91 7601872806",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": "110016",
        "packageWeight(kg)": 8.33,
        "coordinates": [
            28.5533997,
            77.1941654
        ]
    },
    {
        "orderId": "RE-10035",
        "customerName": "Gaurav Mehta",
        "phoneNumber": "+91 8506978573",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": "110034",
        "packageWeight(kg)": 0.28,
        "coordinates": [
            28.7139814,
            77.1467667
        ]
    },
    {
        "orderId": "RE-10036",
        "customerName": "Arjun Kapoor",
        "phoneNumber": "+91 9146910516",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": "110092",
        "packageWeight(kg)": 4.08,
        "coordinates": [
            28.6362652,
            77.28183489999999
        ]
    },
    {
        "orderId": "RE-10037",
        "customerName": "Manish Tiwari",
        "phoneNumber": "+91 7857031755",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 1.88,
        "coordinates": [
            28.5289481,
            77.24642
        ]
    },
    {
        "orderId": "RE-10038",
        "customerName": "Kavita Verma",
        "phoneNumber": "+91 7156454877",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 1.83,
        "coordinates": [
            28.593306,
            77.0762699
        ]
    },
    {
        "orderId": "RE-10039",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 7188464751",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": "110059",
        "packageWeight(kg)": 2.21,
        "coordinates": [
            28.62808,
            77.05303649999999
        ]
    },
    {
        "orderId": "RE-10040",
        "customerName": "Nisha Patel",
        "phoneNumber": "+91 7893946109",
        "deliveryAddress": "78, Lajpat Nagar Central Market",
        "pincode": "110024",
        "packageWeight(kg)": 2.68,
        "coordinates": [
            28.5699034,
            77.24134529999999
        ]
    },
    {
        "orderId": "RE-10041",
        "customerName": "Harsh Patel",
        "phoneNumber": "+91 9299756357",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": "110007",
        "packageWeight(kg)": 0.72,
        "coordinates": [
            28.683744,
            77.203908
        ]
    },
    {
        "orderId": "RE-10042",
        "customerName": "Priya Kumar",
        "phoneNumber": "+91 7492181476",
        "deliveryAddress": "78, Lajpat Nagar Central Market",
        "pincode": "110024",
        "packageWeight(kg)": 0.22,
        "coordinates": [
            28.5699034,
            77.24134529999999
        ]
    },
    {
        "orderId": "RE-10043",
        "customerName": "Sunita Patel",
        "phoneNumber": "+91 8159640350",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": "110005",
        "packageWeight(kg)": 1.51,
        "coordinates": [
            28.6556793,
            77.1874601
        ]
    },
    {
        "orderId": "RE-10044",
        "customerName": "Vikram Tiwari",
        "phoneNumber": "+91 7616050300",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 2.11,
        "coordinates": [
            28.593306,
            77.0762699
        ]
    },
    {
        "orderId": "RE-10045",
        "customerName": "Nisha Sharma",
        "phoneNumber": "+91 7757259392",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 0.75,
        "coordinates": [
            28.5630657,
            77.2245733
        ]
    },
    {
        "orderId": "RE-10046",
        "customerName": "Yash Mishra",
        "phoneNumber": "+91 9401988965",
        "deliveryAddress": "Flat 9B, Royal Heights, Rohini Sector 11",
        "pincode": "110085",
        "packageWeight(kg)": 0.81,
        "coordinates": [
            28.7288259,
            77.1068059
        ]
    },
    {
        "orderId": "RE-10047",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 8222643161",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 3.97,
        "coordinates": [
            28.6210479,
            77.0960163
        ]
    },
    {
        "orderId": "RE-10048",
        "customerName": "Kavita Sharma",
        "phoneNumber": "+91 7985130817",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 2.42,
        "coordinates": [
            28.5289481,
            77.24642
        ]
    },
    {
        "orderId": "RE-10049",
        "customerName": "Harsh Malhotra",
        "phoneNumber": "+91 7950626201",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": "110059",
        "packageWeight(kg)": 7.14,
        "coordinates": [
            28.62808,
            77.05303649999999
        ]
    },
    {
        "orderId": "RE-10050",
        "customerName": "Aditya Rao",
        "phoneNumber": "+91 7537289492",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": "110034",
        "packageWeight(kg)": 4.62,
        "coordinates": [
            28.7139814,
            77.1467667
        ]
    },
    {
        "orderId": "RE-10051",
        "customerName": "Manish Verma",
        "phoneNumber": "+91 8234245477",
        "deliveryAddress": "56, Tilak Nagar",
        "pincode": "110018",
        "packageWeight(kg)": 1.82,
        "coordinates": [
            28.6412277,
            77.0853701
        ]
    },
    {
        "orderId": "RE-10052",
        "customerName": "Vivaan Malhotra",
        "phoneNumber": "+91 9421362369",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 7.56,
        "coordinates": [
            28.6554182,
            77.16462
        ]
    },
    {
        "orderId": "RE-10053",
        "customerName": "Neha Patel",
        "phoneNumber": "+91 8717463251",
        "deliveryAddress": "102, Vikas Puri Block J",
        "pincode": "110018",
        "packageWeight(kg)": 0.35,
        "coordinates": [
            28.6461538,
            77.0704536
        ]
    },
    {
        "orderId": "RE-10054",
        "customerName": "Rahul Patel",
        "phoneNumber": "+91 9764184341",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": "110015",
        "packageWeight(kg)": 0.5,
        "coordinates": [
            28.6446429,
            77.14188639999999
        ]
    },
    {
        "orderId": "RE-10055",
        "customerName": "Vivaan Joshi",
        "phoneNumber": "+91 7431733559",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 2.65,
        "coordinates": [
            28.5289481,
            77.24642
        ]
    },
    {
        "orderId": "RE-10056",
        "customerName": "Sneha Tiwari",
        "phoneNumber": "+91 7487710422",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": "110016",
        "packageWeight(kg)": 0.55,
        "coordinates": [
            28.5533997,
            77.1941654
        ]
    },
    {
        "orderId": "RE-10057",
        "customerName": "Arjun Patel",
        "phoneNumber": "+91 8927540581",
        "deliveryAddress": "210, Saket District Centre",
        "pincode": "110017",
        "packageWeight(kg)": 3.59,
        "coordinates": [
            28.5280842,
            77.2182409
        ]
    },
    {
        "orderId": "RE-10058",
        "customerName": "Saurabh Gupta",
        "phoneNumber": "+91 8211075793",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": "110092",
        "packageWeight(kg)": 1.35,
        "coordinates": [
            28.6362652,
            77.28183489999999
        ]
    },
    {
        "orderId": "RE-10059",
        "customerName": "Nisha Joshi",
        "phoneNumber": "+91 9344423167",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 8.06,
        "coordinates": [
            28.5289481,
            77.24642
        ]
    },
    {
        "orderId": "RE-10060",
        "customerName": "Priya Saxena",
        "phoneNumber": "+91 9418742560",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 2.26,
        "coordinates": [
            28.6210479,
            77.0960163
        ]
    },
    {
        "orderId": "RE-10061",
        "customerName": "Divya Gupta",
        "phoneNumber": "+91 7769141523",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": "110016",
        "packageWeight(kg)": 2.03,
        "coordinates": [
            28.5533997,
            77.1941654
        ]
    },
    {
        "orderId": "RE-10062",
        "customerName": "Kavita Gupta",
        "phoneNumber": "+91 7791742833",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": "110063",
        "packageWeight(kg)": 4.42,
        "coordinates": [
            28.6794931,
            77.0897425
        ]
    },
    {
        "orderId": "RE-10063",
        "customerName": "Nisha Joshi",
        "phoneNumber": "+91 7317992294",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 0.86,
        "coordinates": [
            28.5337869,
            77.2094001
        ]
    },
    {
        "orderId": "RE-10064",
        "customerName": "Rohan Kapoor",
        "phoneNumber": "+91 7621316549",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": "110063",
        "packageWeight(kg)": 2.96,
        "coordinates": [
            28.6794931,
            77.0897425
        ]
    },
    {
        "orderId": "RE-10065",
        "customerName": "Rahul Sharma",
        "phoneNumber": "+91 8891579509",
        "deliveryAddress": "56, Tilak Nagar",
        "pincode": "110018",
        "packageWeight(kg)": 2.99,
        "coordinates": [
            28.6412277,
            77.0853701
        ]
    },
    {
        "orderId": "RE-10066",
        "customerName": "Kabir Patel",
        "phoneNumber": "+91 8129061018",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 2.04,
        "coordinates": [
            28.5274118,
            77.1585822
        ]
    },
    {
        "orderId": "RE-10067",
        "customerName": "Rahul Joshi",
        "phoneNumber": "+91 8482417307",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": "110005",
        "packageWeight(kg)": 0.45,
        "coordinates": [
            28.6556793,
            77.1874601
        ]
    },
    {
        "orderId": "RE-10068",
        "customerName": "Mohit Gupta",
        "phoneNumber": "+91 9735559753",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 0.45,
        "coordinates": [
            28.5630657,
            77.2245733
        ]
    },
    {
        "orderId": "RE-10069",
        "customerName": "Sunita Mehta",
        "phoneNumber": "+91 8763930111",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 0.22,
        "coordinates": [
            28.5337869,
            77.2094001
        ]
    },
    {
        "orderId": "RE-10070",
        "customerName": "Pooja Mehta",
        "phoneNumber": "+91 8125791360",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 4.4,
        "coordinates": [
            28.6210479,
            77.0960163
        ]
    }
]

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"]
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setSubmitted(true);
      setFile(acceptedFiles[0]);
      // here we will also make the accepted state to show file and submit 
    }
  })

  function handleSubmit() {
    const reader = new FileReader();
    //filereader is a browser api which reads file asynchronously. so we define what needs to be done when the reader is done reading, the browser will call this onload automatically. 
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet);
      console.log(data);
      //data[i] refers to an object and uss object ka deliveryAddress and pincode use karke we will be sending the geocoding request. 
      // let arr = Promise.all(data.map(async (e) => {
      //   let address = e.deliveryAddress.split(" ").join("+") + `,${e.pincode}`;
      //   const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`);
      //   const coordinates = [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng];
      //   e.coordinates = coordinates;  
      //   return e;
      // }))
      // arr.then((val) => console.log(val))
    };

    reader.readAsArrayBuffer(file);
    setSubmitted(false)
  }

  const downloadSampleXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet([], {
      header: ["orderId", "customerName", "phoneNumber", "deliveryAddress", "pincode", "packageWeight(kg)"]
    })
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sample.xlsx");
  }

  return (
    <>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className='max-h-dvh overflow-hidden w-full'>
            <h1 className='text-3xl font-semibold mt-4 ml-10'>Dashboard</h1>
          <div className='flex h-full gap-5'>  
            <div className='flex flex-col h-full'>
            <div className='flex mt-3 ml-10 items-center gap-5'>
              <Card className="w-60 h-auto h-fit">
                <CardHeader>
                  <CardTitle className="text-xl underline decoration-dotted decoration-gray-400 decoration-2 underline-offset-3">Orders</CardTitle>
                  <CardAction></CardAction>
                </CardHeader>
                <CardContent className="text-xl -mt-3 font-semibold">
                  <p>70</p>
                </CardContent>
              </Card>
              <Card className="w-60 h-auto h-fit">
                <CardHeader>
                  <CardTitle className="text-xl underline decoration-dotted decoration-gray-400 decoration-2 underline-offset-3">Failed Deliveries</CardTitle>
                  <CardAction></CardAction>
                </CardHeader>
                <CardContent className="text-xl -mt-3 font-semibold">
                  <p>5</p>
                </CardContent>
              </Card>
              <Card className="w-60 h-auto h-fit">
                <CardHeader>
                  <CardTitle className=" text-xl underline decoration-dotted decoration-gray-400 decoration-2 underline-offset-3">Active Fleet</CardTitle>
                  <CardAction></CardAction>
                </CardHeader>
                <CardContent className="text-xl -mt-3 font-semibold">
                  <p>3</p>
                </CardContent>
              </Card>
            </div>
            <div className='mt-3 ml-10'>
              <Card className="w-190 h-auto h-fit">
                <CardHeader>
                  <CardTitle className=" text-xl underline decoration-dotted decoration-gray-400 decorati  on-2 underline-offset-3">Order Entry</CardTitle>
                  <CardAction >
                    <Button variant='link' className="text-blue-600 decoration-solid underline" size='sm' onClick={downloadSampleXLSX}>Sample File</Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="text-xl -mt-3 font-semibold">
                  {!submitted && <div className='items-center flex gap-1 justify-center flex-col mt-5 mb-3'>
                    {/* <input 
                  type='file'
                  accept='.csv'
                  onChange={onFileChange}
                  ref = {inputRef}
                  className='hidden'></input>
                  <Button variant="outline" size="lg" onClick={() => inputRef.current.click()}>Upload CSV</Button>
                  {file && <span className='text-sm text-muted-foreground'>{file.name}</span>} */}
                    <div {...getRootProps()}
                      className='border-1 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors 
          ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/30"}'>
                      <input {...getInputProps()} />
                      <p className="text-muted-foreground text-sm">Drag & drop a CSV here, or click to browse</p>
                    </div>
                  </div>}
                  {submitted &&
                    <div className='flex flex-col items-center justify-center mt-5 mb-3'>
                      <span className='text-sm text-muted-foreground mb-2'>{file.name}</span>
                      <div className='flex gap-3'>
                        <Button onClick={handleSubmit} size='sm'>Submit</Button>
                        <Button variant='destructive' size='sm' onClick={() => {
                          setSubmitted(false);
                        }}>Clear</Button>
                      </div>

                    </div>

                  }
                </CardContent>
              </Card>
            </div>
            {/* <div className='text-4xl mt-3 ml-10 bg-blue-700 grow mb-17'>Table</div> */}
            <div className='flex-1 mb-17 overflow-y-auto rounded-md mt-3 rounded-md  ml-10  border-none ring-1 ring-foreground/10 hover:cursor-pointer'>
            <OrdersTable />
            </div>
            </div>
            <div className='mt-3 mb-17 flex-1 mr-10 rounded-2xl bg-black'>
            <Map dummyData={dummyData}/>
            </div>
          </div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </>
  )
}

export default App

//the first column of the cards need to have graphs next to them. we also need to take care of responsiveness. 