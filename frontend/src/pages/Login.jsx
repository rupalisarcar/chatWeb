import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BorderAnimatedContainer from '../components/BorderAnimated'; 
import { MessageCircleIcon, MailIcon, LockIcon, LoaderIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData,setFormData] = useState({email:"", password:""})
  const [errors,setErrors] = useState({email:"", password:""})
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.auth)

  const validate = () =>{
    let newErrors = {};
    const emailText = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(formData.email.trim()===''){
      newErrors.email = "Email is required"
     }else if(!emailText.test(formData.email)) newErrors.email = "Invalid email id"
   
     if(formData.password==="") newErrors.password = "Password is required"
     else if(formData.password.length<6) newErrors.password = "Password must be atleast 6 characters."
     setErrors(newErrors)
     return Object.keys(newErrors).length === 0
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validate()) return
    try{
      console.log('login calling')
      const result = await dispatch(login(formData)).unwrap()
      console.log(result)
      toast.success()
    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                  <p className="text-slate-400">Login to access to your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input type='email' value={formData.email} 
                      onChange={(e)=>{
                        setFormData({...formData,email: e.target.value});
                        setErrors((prev)=>({...prev,email:""}))
                      }}
                      className='input'
                      placeholder='example@text.com'
                      />
                    </div>

                    {errors.email && (<p className="text-red-500 text-sm mt-2">{errors.email}</p>)}
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input className='input' type='password' value={formData.password}
                      onChange={(e)=>{
                        setFormData({...formData,password:e.target.value});
                        setErrors((prev)=>({...prev,password:""}))
                      }}
                      placeholder="******"/>
                    </div>
                    {errors.password && (<p className='text-red-500 text-sm mt-2'>{errors.password}</p>)}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn" type="submit" disabled={loading}>
                    {loading ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Connect anytime, anywhere</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default Login;