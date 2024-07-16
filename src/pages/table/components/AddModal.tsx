import { Box, Typography } from "@mui/material"
import PresetModal from "../../../components/PresetModal"
import { BaseModalProps } from "./FilterModal"
import ButtonComponent from "../../../components/ButtonComponent"
import { TableModel } from "../../../domain/models/table"
import { AxiosError } from "axios"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import FormInput from "../../../components/FormInput"
import { useMutation } from "react-query"
import TableUseCase from "../../../domain/usecase/table"
import { yupResolver } from "@hookform/resolvers/yup"


type AddModalProps = {
    tableUseCase:TableUseCase;
    refetch: ()=> void;
} & BaseModalProps


const AddModal = ({openModal, setOpenModal, tableUseCase, refetch}:AddModalProps) => {

    const {control, 
           handleSubmit, 
           resetField,
           formState: {errors}
        } = useForm<TableModel.Request.AddData>({
        defaultValues: {
            productName: '',
            productVendor: '',
            productPrice: ''
        },
        resolver: yupResolver(TableModel.Request.addDataSchema)
    })

    const {mutate:addData, isLoading:loading, error} = useMutation({
        mutationFn: (data:TableModel.Request.AddData) => tableUseCase.addData(data),
        onSuccess: ()=> {
            refetch()
            closeForm()
        }
    })
    let axiosError = error as AxiosError
    

    const formSubmit:SubmitHandler<TableModel.Request.AddData> = (data) => {
        addData(data)
    }

    const closeForm = () => {
        resetField("productName")
        resetField("productVendor")
        resetField("productPrice")

        setOpenModal('')
    }


    return (
        <PresetModal open={openModal === 'add'} onClose={closeForm}>
        <form onSubmit={handleSubmit(formSubmit)}>
            <Box sx={{display: 'flex', flexDirection:'column', gap:4}}>
                <Typography variant="h2">Add Product</Typography>

                <Box>
                    <Typography variant="body1">Product Name</Typography>
                    <Controller
                        name="productName"
                        control={control}
                        render={({field}) => (<FormInput 
                                              {...field} 
                                              placeholder="Product Name"
                                              error={Boolean(errors.productName?.message)}
                                              errormessage={errors.productName?.message}
                                              />)}
                    />
                </Box>

                <Box>
                    <Typography variant="body1">Product Vendor</Typography>
                    <Controller
                        name="productVendor"
                        control={control}
                        render={({field}) => (<FormInput 
                                               {...field} 
                                               placeholder="Product Vendor"
                                               error={Boolean(errors.productVendor?.message)}
                                               errormessage={errors.productVendor?.message}   
                                             />)}
                    />
                </Box>

                <Box>
                    <Typography variant="body1">Product Price</Typography>
                    <Controller
                        name="productPrice"
                        control={control}
                        render={({field}) => (<FormInput 
                                               {...field} 
                                               placeholder="Product Price" 
                                               error={Boolean(errors.productPrice?.message)}
                                               errormessage={errors.productPrice?.message}
                                               />)}
                    />
                </Box>

                { axiosError && <Typography variant="h5">{`Error: ${axiosError.message}`}</Typography>}

                <Box sx={{display:'flex', gap:2}}>
                    <ButtonComponent onClick={closeForm} disabled={loading} text="Cancel"/>
                    <ButtonComponent 
                    type="submit"
                    disabled={loading}
                    text="Apply"/>
                </Box>

            </Box>
        </form>
    </PresetModal>
    )
}

export default AddModal