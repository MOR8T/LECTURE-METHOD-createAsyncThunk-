import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import './Page2.css'
import img1 from '../img/img1.jpg'
import img2 from '../img/img2.jpg'
import img3 from '../img/img3.jpg'
import img4 from '../img/img4.jpg'
import img5 from '../img/img5.jpg'
import img6 from '../img/img6.jpg'
import img7 from '../img/img7.jpg'
import img8 from '../img/img8.jpg'
import img9 from '../img/img9.jpg'
import img10 from '../img/img10.jpg'
import img11 from '../img/img11.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { asyncDeleteTodo, getTodos } from '../../redux/reducers/Todos'
import { Fab, Grid, Paper } from '@mui/material'
import { Delete } from '@mui/icons-material'

function Page2() {
  let {todos, status, error} = useSelector((state)=>state.Todos);
  let dispatch = useDispatch();
  useEffect(()=>{dispatch(getTodos())},[dispatch]);

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


  return (
    <div className='py-20'>
        <Container>
            <div className='flex items-center justify-center pb-[150px]'>
                <h1 className='mb-20' id='background'>createAsyncThunk()</h1>
            </div>
            <div><img className='w-full my-20' src={img1}/></div>
            <div><img className='w-full my-20' src={img2}/></div>
            <div><img className='w-full my-20' src={img5}/></div>
            <div><img className='w-full my-20' src={img6}/></div>
            <div><img className='w-full my-20' src={img4}/></div>
            <div><img className='w-full my-20' src={img7}/></div>
            <div><img className='w-full my-20' src={img3}/></div>
            <div><img className='w-full my-20' src={img8}/></div>
            <div><img className='w-full my-20' src={img9}/></div>

            <div className='my-20'>
                <Grid container spacing={5}>
                {
                    todos.map((e,i)=>{
                        return (
                          <Grid key={e.id} item lg='4' md='3' sx="6" xs='12'>
                            <Paper sx={{background:'rgba(255,255,255,0.7)'}}>
                            <div className='w-full grid grid gap-5 p-3 items-center my-3 text-3xl'>
                                <div><img className='w-full' src={e.avatar}/></div>
                                <div className='flex justify-between'>
                                <h1>{e.id}</h1>
                                <Fab size='small' color='error' onClick={()=>dispatch(asyncDeleteTodo({id:e.id,index:i}))}><Delete/></Fab>
                                </div>
                                <h1>{e.title1}</h1>
                            </div>
                            </Paper>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </div>
            <div><img className='w-full my-20' src={img10}/></div>
            <div><img className='w-full my-20' src={img11}/></div>
        </Container>
    </div>
  )
}

export default Page2