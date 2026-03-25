import { columns } from "./table/columns";
import { DataTable } from "./table/DataTable";
import { useZus } from "./store";

function OrdersTable() {
    const data = useZus((state) => state.ordersData);
  return (
    <>
     <div>
      <DataTable columns={columns} data={data}/>
     </div>
    </>
  )
}

export default OrdersTable; 