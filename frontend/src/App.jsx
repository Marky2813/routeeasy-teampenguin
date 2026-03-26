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
import  {EventSource } from "eventsource";
import SSEListener from './SSEListenere'
import { useZus } from './store'



const dummyData = [
    {
        "orderId": "RE-10001",
        "customerName": "Aarav Tiwari",
        "phoneNumber": "+91 7667657517",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": 110032,
        "packageWeight(kg)": 0.52,
        "coordinates": [
            28.6865527,
            77.2922157
        ]
    },
    {
        "orderId": "RE-10002",
        "customerName": "Kavita Kumar",
        "phoneNumber": "+91 8159372409",
        "deliveryAddress": "Flat 3C, Silver Tower, Shahdara",
        "pincode": 110032,
        "packageWeight(kg)": 0.29,
        "coordinates": [
            28.6865527,
            77.2922157
        ]
    },
    {
        "orderId": "RE-10003",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 8951033281",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": 110008,
        "packageWeight(kg)": 1.06,
        "coordinates": [
            28.6554182,
            77.16462
        ]
    },
    {
        "orderId": "RE-10004",
        "customerName": "Riya Pandey",
        "phoneNumber": "+91 7971167425",
        "deliveryAddress": "Flat 14D, Blue Enclave, Patel Nagar",
        "pincode": 110008,
        "packageWeight(kg)": 0.82,
        "coordinates": [
            28.6554182,
            77.16462
        ]
    },
    {
        "orderId": "RE-10005",
        "customerName": "Vikram Joshi",
        "phoneNumber": "+91 8235262310",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": 110075,
        "packageWeight(kg)": 4.56,
        "coordinates": [
            28.593306,
            77.0762699
        ]
    },
    {
        "orderId": "RE-10006",
        "customerName": "Ajay Pandey",
        "phoneNumber": "+91 9525868192",
        "deliveryAddress": "45A, Sector 7, Dwarka",
        "pincode": 110075,
        "packageWeight(kg)": 1.47,
        "coordinates": [
            28.593306,
            77.0762699
        ]
    },
    {
        "orderId": "RE-10007",
        "customerName": "Manish Tiwari",
        "phoneNumber": "+91 7857031755",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": 110048,
        "packageWeight(kg)": 1.88,
        "coordinates": [
            28.5289481,
            77.24642
        ]
    },
    {
        "orderId": "RE-10008",
        "customerName": "Kavita Sharma",
        "phoneNumber": "+91 7985130817",
        "deliveryAddress": "91, Greater Kailash Part 2",
        "pincode": 110048,
        "packageWeight(kg)": 2.42,
        "coordinates": [
            28.5289481,
            77.24642
        ]
    },
    {
        "orderId": "RE-10009",
        "customerName": "Akash Verma",
        "phoneNumber": "+91 7191064627",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": 110034,
        "packageWeight(kg)": 3.42,
        "coordinates": [
            28.7139814,
            77.1467667
        ]
    },
    {
        "orderId": "RE-10010",
        "customerName": "Gaurav Mehta",
        "phoneNumber": "+91 8506978573",
        "deliveryAddress": "B-204, Green Apartments, Pitampura",
        "pincode": 110034,
        "packageWeight(kg)": 0.28,
        "coordinates": [
            28.7139814,
            77.1467667
        ]
    },
    {
        "orderId": "RE-10011",
        "customerName": "Sunita Joshi",
        "phoneNumber": "+91 8964233435",
        "deliveryAddress": "88, Mayur Vihar Phase 1",
        "pincode": 110091,
        "packageWeight(kg)": 1.37,
        "coordinates": [
            28.616856,
            77.29401
        ]
    },
    {
        "orderId": "RE-10012",
        "customerName": "Siddharth Agarwal",
        "phoneNumber": "+91 9388860209",
        "deliveryAddress": "102, Vikas Puri Block J",
        "pincode": 110018,
        "packageWeight(kg)": 0.86,
        "coordinates": [
            28.6461538,
            77.0704536
        ]
    },
    {
        "orderId": "RE-10013",
        "customerName": "Meera Tiwari",
        "phoneNumber": "+91 9366590375",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": 110092,
        "packageWeight(kg)": 2.19,
        "coordinates": [
            28.6362652,
            77.28183489999999
        ]
    },
    {
        "orderId": "RE-10014",
        "customerName": "Sunita Joshi",
        "phoneNumber": "+91 7498970487",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": 110070,
        "packageWeight(kg)": 2.27,
        "coordinates": [
            28.5274118,
            77.1585822
        ]
    },
    {
        "orderId": "RE-10015",
        "customerName": "Siddharth Gupta",
        "phoneNumber": "+91 8536951468",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": 110017,
        "packageWeight(kg)": 5.21,
        "coordinates": [
            28.5337869,
            77.2094001
        ]
    },
    {
        "orderId": "RE-10016",
        "customerName": "Mohit Mishra",
        "phoneNumber": "+91 7168156861",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": 110007,
        "packageWeight(kg)": 1.32,
        "coordinates": [
            28.683744,
            77.203908
        ]
    },
    {
        "orderId": "RE-10017",
        "customerName": "Divya Saxena",
        "phoneNumber": "+91 9240864922",
        "deliveryAddress": "12, Rajouri Garden Main Market, Rajouri Garden",
        "pincode": 110027,
        "packageWeight(kg)": 0.86,
        "coordinates": [
            28.6468173,
            77.1199319
        ]
    },
    {
        "orderId": "RE-10018",
        "customerName": "Siddharth Kumar",
        "phoneNumber": "+91 8015190922",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": 110015,
        "packageWeight(kg)": 0.47,
        "coordinates": [
            28.6446429,
            77.14188639999999
        ]
    },
    {
        "orderId": "RE-10019",
        "customerName": "Nikhil Pandey",
        "phoneNumber": "+91 7657917261",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": 110019,
        "packageWeight(kg)": 1.66,
        "coordinates": [
            28.5630657,
            77.2245733
        ]
    },
    {
        "orderId": "RE-10020",
        "customerName": "Sunita Tiwari",
        "phoneNumber": "+91 9666258624",
        "deliveryAddress": "88, Mayur Vihar Phase 1",
        "pincode": 110091,
        "packageWeight(kg)": 0.33,
        "coordinates": [
            28.616856,
            77.29401
        ]
    },
    {
        "orderId": "RE-10021",
        "customerName": "Neha Malhotra",
        "phoneNumber": "+91 7346551147",
        "deliveryAddress": "33, Kirti Nagar Furniture Market",
        "pincode": 110015,
        "packageWeight(kg)": 2.15,
        "coordinates": [
            28.6446429,
            77.14188639999999
        ]
    },
    {
        "orderId": "RE-10022",
        "customerName": "Rahul Gupta",
        "phoneNumber": "+91 8648748408",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": 110063,
        "packageWeight(kg)": 4.47,
        "coordinates": [
            28.6794931,
            77.0897425
        ]
    },
    {
        "orderId": "RE-10023",
        "customerName": "Divya Malhotra",
        "phoneNumber": "+91 8241798898",
        "deliveryAddress": "7, Connaught Place Inner Circle",
        "pincode": 110001,
        "packageWeight(kg)": 5.97,
        "coordinates": [
            28.6325109,
            77.2179999
        ]
    },
    {
        "orderId": "RE-10024",
        "customerName": "Meera Rao",
        "phoneNumber": "+91 7014197433",
        "deliveryAddress": "34, Malviya Nagar",
        "pincode": 110017,
        "packageWeight(kg)": 4.24,
        "coordinates": [
            28.5337869,
            77.2094001
        ]
    },
    {
        "orderId": "RE-10025",
        "customerName": "Divya Agarwal",
        "phoneNumber": "+91 9153464619",
        "deliveryAddress": "22, Kamla Nagar Market",
        "pincode": 110007,
        "packageWeight(kg)": 1.61,
        "coordinates": [
            28.683744,
            77.203908
        ]
    },
    {
        "orderId": "RE-10026",
        "customerName": "Kavita Sharma",
        "phoneNumber": "+91 7368075753",
        "deliveryAddress": "Plot 12, Vasant Kunj Sector B",
        "pincode": 110070,
        "packageWeight(kg)": 1,
        "coordinates": [
            28.5274118,
            77.1585822
        ]
    },
    {
        "orderId": "RE-10027",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 7672744590",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": 110059,
        "packageWeight(kg)": 7.34,
        "coordinates": [
            28.62808,
            77.05303649999999
        ]
    },
    {
        "orderId": "RE-10028",
        "customerName": "Saurabh Malhotra",
        "phoneNumber": "+91 7656212702",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": 110005,
        "packageWeight(kg)": 0.76,
        "coordinates": [
            28.6556793,
            77.1874601
        ]
    },
    {
        "orderId": "RE-10029",
        "customerName": "Rahul Mishra",
        "phoneNumber": "+91 8078226838",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": 110058,
        "packageWeight(kg)": 2.35,
        "coordinates": [
            28.6210479,
            77.0960163
        ]
    },
    {
        "orderId": "RE-10030",
        "customerName": "Shweta Pandey",
        "phoneNumber": "+91 7601872806",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": 110016,
        "packageWeight(kg)": 8.33,
        "coordinates": [
            28.5533997,
            77.1941654
        ]
    },
    {
        "orderId": "RE-10031",
        "customerName": "Arjun Kapoor",
        "phoneNumber": "+91 9146910516",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": 110092,
        "packageWeight(kg)": 4.08,
        "coordinates": [
            28.6362652,
            77.28183489999999
        ]
    },
    {
        "orderId": "RE-10032",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 7188464751",
        "deliveryAddress": "67, Uttam Nagar East",
        "pincode": 110059,
        "packageWeight(kg)": 2.21,
        "coordinates": [
            28.62808,
            77.05303649999999
        ]
    },
    {
        "orderId": "RE-10033",
        "customerName": "Nisha Patel",
        "phoneNumber": "+91 7893946109",
        "deliveryAddress": "78, Lajpat Nagar Central Market",
        "pincode": 110024,
        "packageWeight(kg)": 2.68,
        "coordinates": [
            28.5699034,
            77.24134529999999
        ]
    },
    {
        "orderId": "RE-10034",
        "customerName": "Sunita Patel",
        "phoneNumber": "+91 8159640350",
        "deliveryAddress": "19, Karol Bagh Main Road",
        "pincode": 110005,
        "packageWeight(kg)": 1.51,
        "coordinates": [
            28.6556793,
            77.1874601
        ]
    },
    {
        "orderId": "RE-10035",
        "customerName": "Nisha Sharma",
        "phoneNumber": "+91 7757259392",
        "deliveryAddress": "3rd Floor, Ansal Plaza, Nehru Place",
        "pincode": 110019,
        "packageWeight(kg)": 0.75,
        "coordinates": [
            28.5630657,
            77.2245733
        ]
    },
    {
        "orderId": "RE-10036",
        "customerName": "Yash Mishra",
        "phoneNumber": "+91 9401988965",
        "deliveryAddress": "Flat 9B, Royal Heights, Rohini Sector 11",
        "pincode": 110085,
        "packageWeight(kg)": 0.81,
        "coordinates": [
            28.7288259,
            77.1068059
        ]
    },
    {
        "orderId": "RE-10037",
        "customerName": "Divya Mishra",
        "phoneNumber": "+91 8222643161",
        "deliveryAddress": "C-15, Block C, Janakpuri",
        "pincode": 110058,
        "packageWeight(kg)": 3.97,
        "coordinates": [
            28.6210479,
            77.0960163
        ]
    },
    {
        "orderId": "RE-10038",
        "customerName": "Sneha Tiwari",
        "phoneNumber": "+91 7487710422",
        "deliveryAddress": "101, Hauz Khas Village",
        "pincode": 110016,
        "packageWeight(kg)": 0.55,
        "coordinates": [
            28.5533997,
            77.1941654
        ]
    },
    {
        "orderId": "RE-10039",
        "customerName": "Saurabh Gupta",
        "phoneNumber": "+91 8211075793",
        "deliveryAddress": "F-44, Preet Vihar",
        "pincode": 110092,
        "packageWeight(kg)": 1.35,
        "coordinates": [
            28.6362652,
            77.28183489999999
        ]
    },
    {
        "orderId": "RE-10040",
        "customerName": "Kavita Gupta",
        "phoneNumber": "+91 7791742833",
        "deliveryAddress": "5, Paschim Vihar Block A",
        "pincode": 110063,
        "packageWeight(kg)": 4.42,
        "coordinates": [
            28.6794931,
            77.0897425
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
    const data = useZus((state) => state.ordersData); 
    const setData = useZus((state) => state.updateOrders);
    // const failed = data.filter(o => o.status === "failed").length


    function handleSubmit() {
        const reader = new FileReader();
        
        //filereader is a browser api which reads file asynchronously. so we define what needs to be done when the reader is done reading, the browser will call this onload automatically. 
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "array" });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const res = XLSX.utils.sheet_to_json(firstSheet);
            setData(res); 
            // const result = axios.post('http://localhost:5000/api/orders', dummyData)
            // result.then((res) => console.log(res));
            //data[i] refers to an object and uss object ka deliveryAddress and pincode use karke we will be sending the geocoding request. 
            // let arr = Promise.all(data.map(async (e) => {
            //   let address = e.deliveryAddress.split(" ").join("+") + `,${e.pincode}`;
            //   const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`);
            //   const coordinates = [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng];
            //   e.coordinates = coordinates;  
            //   return e;
            // }))
            // arr.then((val) => console.log(val))

            //the flow is get json from file -> geocode -> send to api -> get response as an array -> this array of orders is going to be global state of orders list, available to the table and the rider -> total number of orders ka global state -> failed ka global state. 
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
            {/* <SSEListener /> */}
            <TooltipProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className='lg:max-h-dvh lg:overflow-hidden w-full'>
                        <h1 className='text-3xl font-semibold mt-4 ml-10'>Dashboard</h1>
                        <div className='flex h-full gap-5 flex-col lg:flex-row'>
                            <div className='flex flex-col h-full flex-1 min-w-90'>
                                <div className='flex mt-3 ml-10 items-center gap-5'>
                                    <Card className="min-w-30 flex-1 h-auto h-fit">
                                        <CardHeader>
                                            <CardTitle className="xl:text-xl text-md underline decoration-dotted decoration-gray-400 decoration-2 underline-offset-3">Orders</CardTitle>
                                            <CardAction></CardAction>
                                        </CardHeader>
                                        <CardContent className="xl:text-xl text-md -mt-3 font-semibold">
                                            <p>{useZus((state) => state.ordersCount)}</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="min-w-30 flex-1 h-auto h-fit">
                                        <CardHeader>
                                            <CardTitle className="xl:text-xl text-md underline decoration-dotted decoration-gray-400 decoration-2 underline-offset-3">Failed Deliveries</CardTitle>
                                            <CardAction></CardAction>
                                        </CardHeader>
                                        <CardContent className="xl:text-xl text-md -mt-3 font-semibold">
                                            <p>5</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="min-w-30 flex-1 h-auto h-fit">
                                        <CardHeader>
                                            <CardTitle className=" xl:text-xl text-md underline decoration-dotted decoration-gray-400 decoration-2 underline-offset-3">Active Fleet</CardTitle>
                                            <CardAction></CardAction>
                                        </CardHeader>
                                        <CardContent className="xl:text-xl text-md -mt-3 font-semibold">
                                            <p>1</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className='mt-3 ml-10'>
                                    <Card className="min-w-90 h-auto h-fit">
                                        <CardHeader>
                                            <CardTitle className=" text-xl underline decoration-dotted decoration-gray-400 decorati  on-2 underline-offset-3">Order Entry</CardTitle>
                                            <CardAction >
                                                <Button variant='link' className="text-blue-600 decoration-solid underline cursor-pointer" size='sm' onClick={downloadSampleXLSX}>Sample File</Button>
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
                                <div className='flex-1 mb-17 overflow-y-auto rounded-md mt-3 rounded-md  mr-5 lg:mr-0 ml-10  border-none ring-1 ring-foreground/10 hover:cursor-pointer min-w-90 max-h-130 '>
                                    <OrdersTable />
                                </div>
                            </div>
                            <div className='lg:mt-3 mb-17 flex-1 ml-10 lg:ml-0 rounded-2xl w-full mr-10'>
                                <Map dummyData={dummyData} />
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