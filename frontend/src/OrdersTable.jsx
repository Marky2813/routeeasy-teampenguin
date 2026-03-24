import { columns } from "./table/columns";
import { DataTable } from "./table/DataTable";

const data = [
    {
        "orderId": "RE-10001",
        "customerName": "Sunita Joshi",
        "phoneNumber": "+91 8964233435",
        "deliveryAddress": "88, Mayur Vihar Phase 1",
        "pincode": "110091",
        "packageWeight(kg)": 1.37
    },
    {
        "orderId": "RE-10002",
        "customerName": "Siddharth Agarwal",
        "phoneNumber": "+91 9388860209",
        "deliveryAddress": "102, Vikas Puri Block J",
        "pincode": "110018",
        "packageWeight(kg)": 0.86
    },
    {
        "orderId": "RE-10003",
        "customerName": "Meera Tiwari",
        "phoneNumber": "+91 9366590375",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": "110092",
        "packageWeight(kg)": 2.19
    },
    {
        "orderId": "RE-10004",
        "customerName": "Sunita Joshi",
        "phoneNumber": "+91 7498970487",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 2.27
    },
    {
        "orderId": "RE-10005",
        "customerName": "Siddharth Gupta",
        "phoneNumber": "+91 8536951468",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 5.21
    },
    {
        "orderId": "RE-10006",
        "customerName": "Aarav Tiwari",
        "phoneNumber": "+91 7667657517",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 0.52
    },
    {
        "orderId": "RE-10007",
        "customerName": "Mohit Mishra",
        "phoneNumber": "+91 7168156861",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": "110007",
        "packageWeight(kg)": 1.32
    },
    {
        "orderId": "RE-10008",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 8951033281",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 1.06
    },
    {
        "orderId": "RE-10009",
        "customerName": "Divya Saxena",
        "phoneNumber": "+91 9240864922",
        "deliveryAddress": "12, Rajouri Garden Main Market, Rajouri Garden",
        "pincode": "110027",
        "packageWeight(kg)": 0.86
    },
    {
        "orderId": "RE-10010",
        "customerName": "Siddharth Kumar",
        "phoneNumber": "+91 8015190922",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": "110015",
        "packageWeight(kg)": 0.47
    },
    {
        "orderId": "RE-10011",
        "customerName": "Nikhil Pandey",
        "phoneNumber": "+91 7657917261",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 1.66
    },
    {
        "orderId": "RE-10012",
        "customerName": "Kavita Kumar",
        "phoneNumber": "+91 8159372409",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 0.29
    },
    {
        "orderId": "RE-10013",
        "customerName": "Mohit Kumar",
        "phoneNumber": "+91 8992463516",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 0.27
    },
    {
        "orderId": "RE-10014",
        "customerName": "Suresh Patel",
        "phoneNumber": "+91 7582163723",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 2.39
    },
    {
        "orderId": "RE-10015",
        "customerName": "Manish Saxena",
        "phoneNumber": "+91 9614740658",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 2.79
    },
    {
        "orderId": "RE-10016",
        "customerName": "Sneha Gupta",
        "phoneNumber": "+91 8642447711",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 0.61
    },
    {
        "orderId": "RE-10017",
        "customerName": "Vikram Joshi",
        "phoneNumber": "+91 8235262310",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 4.56
    },
    {
        "orderId": "RE-10018",
        "customerName": "Sunita Tiwari",
        "phoneNumber": "+91 9666258624",
        "deliveryAddress": "88, Mayur Vihar Phase 1",
        "pincode": "110091",
        "packageWeight(kg)": 0.33
    },
    {
        "orderId": "RE-10019",
        "customerName": "Ajay Pandey",
        "phoneNumber": "+91 9525868192",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 1.47
    },
    {
        "orderId": "RE-10020",
        "customerName": "Neha Malhotra",
        "phoneNumber": "+91 7346551147",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": "110015",
        "packageWeight(kg)": 2.15
    },
    {
        "orderId": "RE-10021",
        "customerName": "Riya Pandey",
        "phoneNumber": "+91 7971167425",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 0.82
    },
    {
        "orderId": "RE-10022",
        "customerName": "Rahul Gupta",
        "phoneNumber": "+91 8648748408",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": "110063",
        "packageWeight(kg)": 4.47
    },
    {
        "orderId": "RE-10023",
        "customerName": "Priya Agarwal",
        "phoneNumber": "+91 8412048126",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 9.84
    },
    {
        "orderId": "RE-10024",
        "customerName": "Divya Malhotra",
        "phoneNumber": "+91 8241798898",
        "deliveryAddress": "7, Connaught Place Inner Circle",
        "pincode": "110001",
        "packageWeight(kg)": 5.97
    },
    {
        "orderId": "RE-10025",
        "customerName": "Meera Rao",
        "phoneNumber": "+91 7014197433",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 4.24
    },
    {
        "orderId": "RE-10026",
        "customerName": "Divya Agarwal",
        "phoneNumber": "+91 9153464619",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": "110007",
        "packageWeight(kg)": 1.61
    },
    {
        "orderId": "RE-10027",
        "customerName": "Kavita Sharma",
        "phoneNumber": "+91 7368075753",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 1
    },
    {
        "orderId": "RE-10028",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 7672744590",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": "110059",
        "packageWeight(kg)": 7.34
    },
    {
        "orderId": "RE-10029",
        "customerName": "Saurabh Malhotra",
        "phoneNumber": "+91 7656212702",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": "110005",
        "packageWeight(kg)": 0.76
    },
    {
        "orderId": "RE-10030",
        "customerName": "Akash Verma",
        "phoneNumber": "+91 7191064627",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": "110034",
        "packageWeight(kg)": 3.42
    },
    {
        "orderId": "RE-10031",
        "customerName": "Akash Malhotra",
        "phoneNumber": "+91 7635723121",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": "110032",
        "packageWeight(kg)": 6.99
    },
    {
        "orderId": "RE-10032",
        "customerName": "Rahul Mishra",
        "phoneNumber": "+91 8078226838",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 2.35
    },
    {
        "orderId": "RE-10033",
        "customerName": "Sunita Tiwari",
        "phoneNumber": "+91 8841133440",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 3.13
    },
    {
        "orderId": "RE-10034",
        "customerName": "Shweta Pandey",
        "phoneNumber": "+91 7601872806",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": "110016",
        "packageWeight(kg)": 8.33
    },
    {
        "orderId": "RE-10035",
        "customerName": "Gaurav Mehta",
        "phoneNumber": "+91 8506978573",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": "110034",
        "packageWeight(kg)": 0.28
    },
    {
        "orderId": "RE-10036",
        "customerName": "Arjun Kapoor",
        "phoneNumber": "+91 9146910516",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": "110092",
        "packageWeight(kg)": 4.08
    },
    {
        "orderId": "RE-10037",
        "customerName": "Manish Tiwari",
        "phoneNumber": "+91 7857031755",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 1.88
    },
    {
        "orderId": "RE-10038",
        "customerName": "Kavita Verma",
        "phoneNumber": "+91 7156454877",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 1.83
    },
    {
        "orderId": "RE-10039",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 7188464751",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": "110059",
        "packageWeight(kg)": 2.21
    },
    {
        "orderId": "RE-10040",
        "customerName": "Nisha Patel",
        "phoneNumber": "+91 7893946109",
        "deliveryAddress": "78, Lajpat Nagar Central Market",
        "pincode": "110024",
        "packageWeight(kg)": 2.68
    },
    {
        "orderId": "RE-10041",
        "customerName": "Harsh Patel",
        "phoneNumber": "+91 9299756357",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": "110007",
        "packageWeight(kg)": 0.72
    },
    {
        "orderId": "RE-10042",
        "customerName": "Priya Kumar",
        "phoneNumber": "+91 7492181476",
        "deliveryAddress": "78, Lajpat Nagar Central Market",
        "pincode": "110024",
        "packageWeight(kg)": 0.22
    },
    {
        "orderId": "RE-10043",
        "customerName": "Sunita Patel",
        "phoneNumber": "+91 8159640350",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": "110005",
        "packageWeight(kg)": 1.51
    },
    {
        "orderId": "RE-10044",
        "customerName": "Vikram Tiwari",
        "phoneNumber": "+91 7616050300",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": "110075",
        "packageWeight(kg)": 2.11
    },
    {
        "orderId": "RE-10045",
        "customerName": "Nisha Sharma",
        "phoneNumber": "+91 7757259392",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 0.75
    },
    {
        "orderId": "RE-10046",
        "customerName": "Yash Mishra",
        "phoneNumber": "+91 9401988965",
        "deliveryAddress": "Flat 9B, Royal Heights, Rohini Sector 11",
        "pincode": "110085",
        "packageWeight(kg)": 0.81
    },
    {
        "orderId": "RE-10047",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 8222643161",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 3.97
    },
    {
        "orderId": "RE-10048",
        "customerName": "Kavita Sharma",
        "phoneNumber": "+91 7985130817",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 2.42
    },
    {
        "orderId": "RE-10049",
        "customerName": "Harsh Malhotra",
        "phoneNumber": "+91 7950626201",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": "110059",
        "packageWeight(kg)": 7.14
    },
    {
        "orderId": "RE-10050",
        "customerName": "Aditya Rao",
        "phoneNumber": "+91 7537289492",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": "110034",
        "packageWeight(kg)": 4.62
    },
    {
        "orderId": "RE-10051",
        "customerName": "Manish Verma",
        "phoneNumber": "+91 8234245477",
        "deliveryAddress": "56, Tilak Nagar",
        "pincode": "110018",
        "packageWeight(kg)": 1.82
    },
    {
        "orderId": "RE-10052",
        "customerName": "Vivaan Malhotra",
        "phoneNumber": "+91 9421362369",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": "110008",
        "packageWeight(kg)": 7.56
    },
    {
        "orderId": "RE-10053",
        "customerName": "Neha Patel",
        "phoneNumber": "+91 8717463251",
        "deliveryAddress": "102, Vikas Puri Block J",
        "pincode": "110018",
        "packageWeight(kg)": 0.35
    },
    {
        "orderId": "RE-10054",
        "customerName": "Rahul Patel",
        "phoneNumber": "+91 9764184341",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": "110015",
        "packageWeight(kg)": 0.5
    },
    {
        "orderId": "RE-10055",
        "customerName": "Vivaan Joshi",
        "phoneNumber": "+91 7431733559",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 2.65
    },
    {
        "orderId": "RE-10056",
        "customerName": "Sneha Tiwari",
        "phoneNumber": "+91 7487710422",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": "110016",
        "packageWeight(kg)": 0.55
    },
    {
        "orderId": "RE-10057",
        "customerName": "Arjun Patel",
        "phoneNumber": "+91 8927540581",
        "deliveryAddress": "210, Saket District Centre",
        "pincode": "110017",
        "packageWeight(kg)": 3.59
    },
    {
        "orderId": "RE-10058",
        "customerName": "Saurabh Gupta",
        "phoneNumber": "+91 8211075793",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": "110092",
        "packageWeight(kg)": 1.35
    },
    {
        "orderId": "RE-10059",
        "customerName": "Nisha Joshi",
        "phoneNumber": "+91 9344423167",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": "110048",
        "packageWeight(kg)": 8.06
    },
    {
        "orderId": "RE-10060",
        "customerName": "Priya Saxena",
        "phoneNumber": "+91 9418742560",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 2.26
    },
    {
        "orderId": "RE-10061",
        "customerName": "Divya Gupta",
        "phoneNumber": "+91 7769141523",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": "110016",
        "packageWeight(kg)": 2.03
    },
    {
        "orderId": "RE-10062",
        "customerName": "Kavita Gupta",
        "phoneNumber": "+91 7791742833",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": "110063",
        "packageWeight(kg)": 4.42
    },
    {
        "orderId": "RE-10063",
        "customerName": "Nisha Joshi",
        "phoneNumber": "+91 7317992294",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 0.86
    },
    {
        "orderId": "RE-10064",
        "customerName": "Rohan Kapoor",
        "phoneNumber": "+91 7621316549",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": "110063",
        "packageWeight(kg)": 2.96
    },
    {
        "orderId": "RE-10065",
        "customerName": "Rahul Sharma",
        "phoneNumber": "+91 8891579509",
        "deliveryAddress": "56, Tilak Nagar",
        "pincode": "110018",
        "packageWeight(kg)": 2.99
    },
    {
        "orderId": "RE-10066",
        "customerName": "Kabir Patel",
        "phoneNumber": "+91 8129061018",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": "110070",
        "packageWeight(kg)": 2.04
    },
    {
        "orderId": "RE-10067",
        "customerName": "Rahul Joshi",
        "phoneNumber": "+91 8482417307",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": "110005",
        "packageWeight(kg)": 0.45
    },
    {
        "orderId": "RE-10068",
        "customerName": "Mohit Gupta",
        "phoneNumber": "+91 9735559753",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": "110019",
        "packageWeight(kg)": 0.45
    },
    {
        "orderId": "RE-10069",
        "customerName": "Sunita Mehta",
        "phoneNumber": "+91 8763930111",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": "110017",
        "packageWeight(kg)": 0.22
    },
    {
        "orderId": "RE-10070",
        "customerName": "Pooja Mehta",
        "phoneNumber": "+91 8125791360",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": "110058",
        "packageWeight(kg)": 4.4
    }
]

function OrdersTable() {
  return (
    <>
     <div>
      <DataTable columns={columns} data={data}/>
     </div>
    </>
  )
}

export default OrdersTable; 