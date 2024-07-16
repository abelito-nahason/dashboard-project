import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PresetModal from "../../../components/PresetModal";
import TableUseCase from "../../../domain/usecase/table"
import { BaseModalProps } from "./FilterModal";
import { TableModel } from "../../../domain/models/table";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import FormInput from "../../../components/FormInput";
import ButtonComponent from "../../../components/ButtonComponent";
import { useMutation } from "react-query";
import { AxiosError } from "axios";


type UpdateModalProps = {
    tableUseCase:TableUseCase
    refetch: ()=> void;
    defaultValues: {
        productId:string;
        productName:string;
        productPrice:string;
        productVendor:string;
    }
} & BaseModalProps

const UpdateModal = ({openModal, setOpenModal, tableUseCase, refetch, defaultValues}:UpdateModalProps) => {

    const {control, handleSubmit, formState:{errors}, resetField} = useForm<TableModel.Request.UpdateData>({
        values: defaultValues,
        resolver: yupResolver(TableModel.Request.updateDataSchema)
    })

    const {mutate, error, isLoading:loading} = useMutation({
        mutationFn: (data:TableModel.Request.UpdateData) => tableUseCase.updateData(data),
        onSuccess: () => {
            closeForm()
            refetch()
        }
    })

    let axiosError = error as AxiosError

    const formSubmit:SubmitHandler<TableModel.Request.UpdateData> = (data) => {
        mutate(data)
    }

    const closeForm = () => {
        resetField("productId")
        resetField("productName")
        resetField("productVendor")
        resetField("productPrice")

        setOpenModal('')
    }


    return (
        <PresetModal open={openModal === 'update'} onClose={closeForm}>
        <form onSubmit={handleSubmit(formSubmit)}>
            <Box sx={{display: 'flex', flexDirection:'column', gap:4}}>
                <Typography variant="h2">Update Product</Typography>

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

export default UpdateModal