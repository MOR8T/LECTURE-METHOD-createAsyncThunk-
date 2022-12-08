import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Fab, Modal, Paper, Switch, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Todos, { asyncCheckTodo, asyncDeleteTodo, asyncEditTodo, asyncPostTodo, getTodos } from '../../redux/reducers/Todos';
import './Page1.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
  };

function Page1() {
    let {todos, status, error} = useSelector((state)=>state.Todos);
    let dispatch = useDispatch();
    useEffect(()=>{dispatch(getTodos())},[dispatch]);

    let [open, setOpen] = useState(false);
    let [text, setText] = useState({});
    let [obj, setObj] = useState({});

    

    if(status === 'loading'){
        return (
            <div className='w-full min-h-[100vh] p-10 grid fixed align-center justify-center'>
                <div class="loader">
                    <div></div>
                    </div>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo">
                                    <fegaussianblur in="SourceGraphic" stddeviation="15" result="blur"></fegaussianblur>
                                    <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" result="goo"></fecolormatrix>
                                    <feblend in="SourceGraphic" in2="goo"></feblend>
                                </filter>
                            </defs>
                        </svg>
            </div>
        )
    }

    if(status === 'rejected'){
        return (
            <div className='w-full min-h-[100vh] p-10 grid fixed align-center justify-center'>
                <h1 className='text-5xl'>An error occured: {error}</h1>
            </div>
        )
    }

    const handleOpen = (elem) => {
        setOpen(true);
        setObj(elem);
        setText(elem.title1);
    };
    const handleClose = () => setOpen(false);

    let post =(e)=>{
        e.preventDefault();
        let obj = {
            title1: e.target['post'].value,
            isComplited:false,
        };
        dispatch(asyncPostTodo(obj));
        e.target['post'].value='';
    }

    let check = (elem) =>{
        let obj = {
            ...elem,
            isComplited: !elem.isComplited,
        }
        dispatch(asyncCheckTodo(obj));
    }

    let handleChangeEdit = (e) => {
        let { value } = e.target;
        setText(value)
    }

    let edit = (e) => {
        e.preventDefault();
        let body = {
            ...obj,
            title1: e.target['edit'].value,
        };
        dispatch(asyncEditTodo(body))
        console.log(4)
        e.target['edit'].value='';
        handleClose();
    }

  return (
    <div className='py-10'>
        <Container maxWidth='sm' className='z-30'>
            <div>
                <form onSubmit={post} className='grid'>
                    <TextField required variant='filled' name='post' sx={{background:'rgba(255,255,255,0.7)',borderRadius:'10px 10px 0px 0px'}}/>
                    <Button type='submit' sx={{background:'rgba(0,195,0,0.5)',color:'white','&:hover':{border:'2px solid rgba(0,195,0,0.5)'},borderRadius:'0px 0px 10px 10px',color:'rgba(0,195,0,0.5)'}} color='success'>ADD</Button>
                </form>
            </div>
            <div>
                {
                    todos.map((e,i)=>{
                        return (
                            <Paper key={e.id} sx={{background:'rgba(255,255,255,0.7)'}}>
                            <div className='w-full grid grid-cols-[100px_20px_1fr_50px_50px_50px] gap-5 p-3 items-center my-3'>
                                <div><img src={e.avatar}/></div>
                                <h1>{e.id}</h1>
                                {
                                    e.isComplited ? <s><h1>{e.title1}</h1></s> : <h1>{e.title1}</h1>
                                }
                                {
                                    e.isComplited ? <Switch onClick={()=>check(e)} defaultChecked/> : <Switch onClick={()=>check(e)}/>
                                }
                                <Fab size='small' color='warning' onClick={()=>handleOpen(e)}><Edit/></Fab>

                                <Fab size='small' color='error' onClick={()=>dispatch(asyncDeleteTodo({id:e.id,index:i}))}><Delete/></Fab>

                            </div>
                            </Paper>
                        )
                    })
                }
            </div>
        </Container>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{color:'black'}}>
            Edit Todo
          </Typography>
          <form onSubmit={edit} className='grid mt-5'>
                <TextField required name='edit' sx={{background:'rgba(255,255,255,0.7)',borderRadius:'10px 10px 0px 0px'}} onChange={handleChangeEdit} value={text}/>
                <Button color='warning' type='submit' variant='contained'>EDIT</Button>
            </form>
        </Box>
      </Modal>
    </div>
  )
}

export default Page1