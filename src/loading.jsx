
import { Skeleton } from "@chakra-ui/react";
import "./Components/Table/customTable.css";

export default function Loading() {
    return (
        <div className="w-full flex flex-col gap-4 text-black min-w-[500px] border custom-table-container p-5">
            {[...Array(6).keys()].map((i) => (
                <Skeleton key={i} height='50px' rounded={"lg"} />
            ))}
        </div>
    );
}
