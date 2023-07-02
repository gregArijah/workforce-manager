import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    username: string,
    employeeNum: string,
  };

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'rgb(78, 115, 140)',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function LoginModal() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  
    console.log(watch("username")) // watch input value by passing the name of it

    return (
        <div>
            <Button className="text-slate-300" onClick={handleOpen}>login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="rounded" sx={style}>
                    <Typography className="p-2 flex justify-center text-2xl text-slate-300" id="modal-modal-title" variant="h6" component="h2">Login</Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}

                    {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form className="flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input className="p-2 m-2" placeholder="username" {...register("username")} />

                        {/* include validation with required or other standard HTML validation rules */}
                        <input className="p-2 m-2" placeholder="employee number" {...register("employeeNum", { required: true })} />
                        {/* errors will return when field validation fails  */}
                        {errors.employeeNum && <span>This field is required</span>}

                        <input className="cursor-pointer border border-slate-300  hover:bg-slate-700 text-slate-300 rounded px-2 py-1 m-2 outline-none" type="submit" />
                    </form>
                </Box>
            </Modal>
        </div>
        // <div>
        //     <button onClick={onClose}>Close Modal</button>
        //     {children}
        // </div>
    );
}