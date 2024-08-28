import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { RxCross2 } from "react-icons/rx";

export default function AlertMui({ status, text }: any) {

    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });

    const { open } = state;

    return (
        <div className='flex justify-center w-[100%] fixed top-[2em] z-10'>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                key={"top" + "center"}
                onClose={() => setState({ ...state, open: false })}
            >
                <Alert severity={status} icon={<RxCross2 />} style={{
                    width: "fit-content",
                    fontSize: "1em",
                    margin: "0 1em"
                }}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}