import React from 'react'
import SigninForm from '../_components/SigninForm'

const Login = () => {
  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-6 py-6 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 shadow-md">
        <SigninForm />
        </div>
      </div>
    </section>
  )
}

export default Login