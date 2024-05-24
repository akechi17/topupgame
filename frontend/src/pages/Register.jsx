import React, { createRef } from "react";
import { Link } from "react-router-dom";
import LoginInput from "../components/inputs/LoginInput";
import { AuthHeader } from "../components";

const Register = () => {
  const firstnameRef = createRef();
  const lastnameRef = createRef();
  const phoneRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const onSubmit = () => {
    const payload = {
      first_name: firstnameRef.current.value,
      last_name: lastnameRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
  };

  return (
    <div className='flex min-h-screen w-screen'>
      <div className='bg-green-500 w-7/12 flex flex-col justify-center items-center'></div>
      <div className='bg-white w-5/12  flex flex-col justify-center items-start px-14 gap-5'>
        <AuthHeader
          title='daftar akun vocagame'
          subtitle='daftarkan akun'
          description='Daftar akun vocagame dengan mengisi form dibawah ini'
        />
        <form method='POST' onSubmit={onSubmit} className='w-full'>
          <LoginInput
            innerRef={firstnameRef}
            name='firstname'
            label='Nama Depan'
            icon='mdi:user'
          />
          <LoginInput
            innerRef={lastnameRef}
            name='lastname'
            label='Nama Belakang'
            icon='mdi:user'
          />
          <LoginInput
            innerRef={phoneRef}
            name='phone'
            label='Nomor WhatsApp'
            icon='mdi:user'
          />
          <LoginInput
            innerRef={passwordRef}
            name='password'
            label='Password'
            icon='mdi:lock-outline'
            showeye
          />
          <LoginInput
            innerRef={passwordConfirmationRef}
            name='password_confirmation'
            label='Confirm Password'
            icon='mdi:lock-outline'
            showeye
          />
          <button className='capitalize text-green-400 bg-green-100 w-full text-xl font-semibold h-12 rounded-xl'>
            daftar sekarang
          </button>
        </form>
        <p className='text-center w-full text-sky-950'>
          Sudah punya akun?{" "}
          <Link
            to='/account/auth/login'
            className='text-green-400 font-semibold'
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
