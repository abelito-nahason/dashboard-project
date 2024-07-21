import { Box, Typography } from "@mui/material"
import PresetModal from "../../../components/PresetModal"
import { BaseModalProps } from "./FilterModal"
import ButtonComponent from "../../../components/ButtonComponent"
import TableUseCase from "../../../domain/usecase/table"
import { useMutation } from "react-query"
import { TableModel } from "../../../domain/models/table"
import { AxiosError } from "axios"


type DeleteModalProps = {
    tableUseCase:TableUseCase;
    refetch: ()=> void;
    productId:string;
} & BaseModalProps


const DeleteModal = ({openModal, setOpenModal, tableUseCase, refetch, productId}:DeleteModalProps) => {

    const closeForm = () => {
        setOpenModal('')
    }

    const {mutate, isLoading, error} = useMutation({
        mutationFn: (data:TableModel.Request.DeleteData) => tableUseCase.deleteData(data),
        onSuccess: () => {
            refetch()
            closeForm()
        }
    })

    let axiosError = error as AxiosError

    return (
        <PresetModal open={openModal === 'delete'} onClose={closeForm} overrideWidth="300px">
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', gap: 2}}>
                <Typography variant="h1" fontWeight={600}>Delete Data</Typography>
                <Typography variant="body1" >Delete the selected data?</Typography>

                <Box sx={{display:'flex', width:'100%', gap:2}}>
                    <ButtonComponent onClick={closeForm} disabled={isLoading} text="Cancel"/>
                    <ButtonComponent 
                    onClick={()=> mutate({productId})}
                    disabled={isLoading}
                    text="Delete"/>
                </Box>

                { axiosError && <Typography variant="h5">{`Error: ${axiosError.message}`}</Typography>}

            </Box>
        </PresetModal>
    )
}

export default DeleteModal