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

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setSubmitted(true);
      setFile(acceptedFiles[0]);
      // here we will also make the accepted state to show file and submit 
    }
  })

  function handleSubmit() {
    console.log("submitted! go to papajones library now after pool")
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
                  <CardAction className="text-blue-600 decoration-solid underline">Sample CSV</CardAction>
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
                      className='border-1 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors 
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