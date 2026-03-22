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
    };

    reader.readAsArrayBuffer(file);
    setSubmitted(false)
  }

  const downloadSampleXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet([], {
      header: ["Order ID", "Customer Name", "Phone Number", "Delivery Address", "Pincode", "Package Weight(kg)"]
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
          <main className='w-full'>
            <h1 className='text-3xl font-semibold mt-4 ml-10'>Dashboard</h1>
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
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </>
  )
}

export default App

//the first column of the cards need to have graphs next to them. we also need to take care of responsiveness. 