import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from "next/link";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'rgb(78, 115, 140)',
    // border: '2px solid',
    boxShadow: 24,
    p: 4,
};

export default function LoginModal() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button className="text-slate-300" onClick={handleOpen}>contact</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="flex justify-between items-center rounded text-slate-300 " sx={style}>
                    <button className="cursor-pointer border border-slate-300  hover:bg-slate-700 rounded px-2 py-1 mx-2 outline-none">
                        <Link href="https://github.com/gregArijah">Greg's GitHub</Link>
                    </button>
                    <button className="cursor-pointer border border-slate-300  hover:bg-slate-700 rounded px-2 py-1 mx-2 outline-none">
                        <Link href="https://github.com/MadelineLowes">Maddie's GitHub</Link>
                    </button>

                </Box>
            </Modal>
        </div>
    );
}