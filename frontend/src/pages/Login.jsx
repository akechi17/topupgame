import React, { createRef } from "react";
import { Link } from "react-router-dom";
import LoginInput from "../components/inputs/LoginInput";
import axiosClient from '../axios-client.js'

const Login = () => {
  const phoneRef = createRef();
  const passwordRef = createRef();
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      phone: phoneRef.current.value,
      password: passwordRef.current.value
    }
    
    axiosClient.post('/v1/auth/register', payload)
  };

  return (
    <div className='flex min-h-screen w-screen'>
      <div className='bg-green-500 w-7/12 flex flex-col justify-center items-center'></div>
      <div className='bg-white w-5/12  flex flex-col justify-center items-start px-14 gap-5'>
        <img src='' alt='' />
        <h1 className='text-green-500 uppercase font-semibold text-xl tracking-widest'>
          masuk akun vocagame
        </h1>
        <h1 className='text-sky-950 capitalize font-bold text-6xl'>
          selamat datang
        </h1>
        <p className='text-slate-600 text-base'>
          Masukkan nomor WhatsApp dan password kamu untuk masuk
        </p>
        <form method='POST' onSubmit={onSubmit} className='w-full'>
          <LoginInput
            innerRef={phoneRef}
            name='phone'
            label='Nomor Whatsapp'
            icon='mdi:user'
          />
          <LoginInput
            innerRef={passwordRef}
            name='password'
            label='Password'
            icon='mdi:lock-outline'
            showeye
          />
          <button className='capitalize text-green-400 bg-green-100 w-full text-xl font-semibold h-12 rounded-xl'>
            masuk sekarang
          </button>
        </form>
        <p className='text-center w-full text-sky-950'>
          Belum punya akun?{" "}
          <Link
            to='/account/auth/register'
            className='text-green-400 font-semibold'
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
