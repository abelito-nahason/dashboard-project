import { Box, Typography } from "@mui/material"
import PresetModal from "../../../components/PresetModal"
import SearchInput from "../../../components/SearchInput"
import ButtonComponent from "../../../components/ButtonComponent"
import { Dispatch, SetStateAction } from "react"

type DispatchState<T> = Dispatch<SetStateAction<T>>

export type BaseModalProps = {
    openModal:string;
    setOpenModal: DispatchState<string>;
}

type FilterModalProps = {
    nameSearch:string;
    setNameSearch: DispatchState<string>;
    vendorSearch:string;
    setVendorSearch: DispatchState<string>;
    clearFilter: ()=> void;
    applyFilter: ()=> void;
} & BaseModalProps

const FilterModal = ({openModal, 
                      setOpenModal, 
                      nameSearch, 
                      setNameSearch, 
                      vendorSearch, 
                      setVendorSearch,
                      clearFilter,
                      applyFilter
                    }:FilterModalProps) => {

    return (
        <PresetModal open={openModal === 'filter'} onClose={()=>setOpenModal('')}>
        <Box sx={{display: 'flex', flexDirection:'column', gap:4}}>
            <Typography variant="h2">Filter</Typography>

            <Box>
                <Typography variant="body1">Product Name</Typography>
                <SearchInput
                    value={nameSearch}
                    onChange={setNameSearch}
                    text="Product Name"
                />
            </Box>

            <Box>
                <Typography variant="body1">Produt Vendor</Typography>
                <SearchInput
                    value={vendorSearch}
                    onChange={setVendorSearch}
                    text="Product Vendor"
                />
            </Box>

            <Box sx={{display:'flex', gap:2}}>
                <ButtonComponent onClick={clearFilter} text="Clear Filter"/>
                <ButtonComponent onClick={applyFilter} text="Apply"/>
            </Box>

            {/* <IconButton onClick={()=> {refetch(); refetchTotal()}}><SearchOutlined/></IconButton> */}

        </Box>
    </PresetModal>

    )
}

export default FilterModal