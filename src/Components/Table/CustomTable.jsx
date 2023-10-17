
import { Box, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import HeaderComponent from "./HeaderComponent";
import "./customTable.css"


export default function CustomTable({ headers, row, filterRowsByColumnGroup = [], sortable = false, defaultRowsPerPage = 6, defaultPaginationLength = 5, caption = "empty", pagination = false }) {
    console.log("🚀 ~ file: CustomTable.jsx:10 ~ CustomTable ~ row:", row)
    const [rows, setRows] = useState([]);
    //seperate list for searching and filtering purposes
    const [filteredRows, setFilteredRows] = useState([])
    //pagination row data for the current page
    //names of the column who has cellrender instead of a normal value
    const cellRenderList = useMemo(() => headers.map((header, index) => header.cellRenderer ? header.label : false), [headers])
    const [isDisplaySmall, setIsDisplaySmall] = useState(false);
    //name of the column to sort by    
    const [sortField, setSortField] = useState("");
    //type of sort for the column
    const [order, setOrder] = useState("asc");

    useEffect(() => {
        //handle window resize to reduce table size based on window width
        const isDisplaySmall = window.matchMedia('(max-width: 1096px)');
        isDisplaySmall.addEventListener("change", handleResize);
        function handleResize(resizeEvent) {
            setIsDisplaySmall(resizeEvent.matches)
        }
        return () => {
            isDisplaySmall.removeEventListener("change", handleResize);
        }
    }, []);

    useEffect(() => {
        setFilteredRows(rows)
    }, [rows])

    useEffect(() => {
        setRows(row)
    }, [row])

    //sort the column based on sortfield  and sortorder and set the new values
    const handleSortingByColumn = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...filteredRows].sort((a, b) => {
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setFilteredRows(sorted);
        }
    };

    //calls the sort function after determining sort order and sortfiel which needs to be sorted
    function handleClickColumnName(columnName) {
        return () => {
            const sortOrder = columnName === sortField && order === "asc" ? "desc" : "asc";
            setSortField(columnName);
            setOrder(sortOrder);
            handleSortingByColumn(columnName, sortOrder);
        }
    }

    //renders columns
    function ColumnRenderer({ columns }) {
        return (
            <Thead >
                <Tr className="bg-gray-300 border-radius-table-row h-[52px]">
                    {columns.map((column, index) => <Th onClick={(sortable && !column.cellRenderer) ? handleClickColumnName(column.label) : () => console.log(`'Column: ${column.label} doesn't support sorting`)} cursor={sortable ? "pointer" : "auto"} key={column.label}>
                        <div className="flex gap-2 items-center">
                            {column.name}
                            {/* //only column with string or number values are allowed to sort based on the sortfield */}
                            {sortable && sortField === column.label && !column.cellRenderer && <IconButton aria-label="sort" size={"xs"} transform={order === 'asc' ? "rotate(0deg)" : "rotate(180deg)"}
                                icon={<ChevronDownIcon boxSize={5} />}
                            />}
                        </div>
                    </Th>)
                    }
                </Tr>
            </Thead>
        )
    }

    //renders rows
    function RowRenderer({ rows }) {
        return (
            <Tbody>
                {rows.map((row, index) => <Tr className={`${index % 2 !== 0 && 'bg-gray-200'} border-radius-table-row`} key={index}>
                    {/* //if cellRenderer is present then a callback of cellrender is fired to provide the cuurent row value to the cell renderer present in orderdetails component to render component based on row values*/}
                    {Object.entries(row).map((value, subIndex) => <Td whiteSpace={"initial"} wordBreak={"break-all"} key={value[0] + subIndex}> {cellRenderList.includes(value[0]) ? headers[cellRenderList.indexOf(value[0])].cellRenderer(value) : value[1]}</Td>)}
                </Tr>)
                }
            </Tbody>
        )
    }

    return (
        rows.length > 0 && <Box className="flex flex-col gap-5 bg-white text-black rounded-3xl mt-8">
            <Box className="custom-table-container">
                {caption !== "empty" && <HeaderComponent total={rows.length} onlyFilteredDatas={filteredRows} caption={caption} rowData={rows} filterRows={setFilteredRows} filterRowsByColumnGroup={filterRowsByColumnGroup} />}
                {filteredRows.length > 0 ? <TableContainer className="m-5" >
                    <Table variant={"unstyled"} size={isDisplaySmall ? "sm" : "md"}>
                        <ColumnRenderer columns={headers} />
                        <RowRenderer rows={filteredRows} />
                    </Table>
                </TableContainer> :
                    <Box className="w-full min-h-[200px] min-w-[500px] flex items-center justify-center text-2xl font-medium mb-12">
                        No rows data is available to display
                    </Box>
                }
            </Box>
            {/* Display pagination only if has pagination props and rows list should not be empty and rows list with length more than defaultPaginationLength*/}
        </Box>
    )
};

