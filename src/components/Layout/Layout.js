import { Container } from '@mui/system'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Container>
        <header className='w-full h-[80px]'>
            <ul className='w-full h-full flex justify-center items-center text-3xl flex justify-evenly'>
                <li>
                    <Link to='/page2'>Lecture</Link>
                </li>
                <li>
                    <Link to='/'>Example</Link>
                </li>
            </ul>
        </header>
        </Container>
        <Outlet/>
    </div>
  )
}

export default Layout