import React, { useState } from 'react'
import { UserIcon, LockIcon, MessageCircleIcon, MailIcon, LoaderIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BorderAnimatedContainer from '../components/BorderAnimated';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/features/authSlice';
import toast from 'react-hot-toast';

const SignUp = () => {
  const  [formData,setFormData] = useState({
    fullname:'',
    email:'',
    password : ''
  })

  const [errors, setErrors]=useState({
    fullname:'',
    email:'',
    password : ''
  })

  const dispatch = useDispatch()
  const {loading} = useSelector((state)=>state.auth)
  const navigate = useNavigate()

  const validate = () =>{
    let newErrors = {};
     if(formData.fullname.trim()===''){
      newErrors.fullname = "Full name is required"
     }
     const emailText = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     if(formData.email.trim()===''){
      newErrors.email = "Email is required"
     }else if(!emailText.test(formData.email)) newErrors.email = "Invalid email id"
     
     if(formData.password==="") newErrors.password = "Password is required"
     else if(formData.password.length<6) newErrors.password = "Password must be atleast 6 characters."

     setErrors(newErrors)
     return Object.keys(newErrors).length === 0
  }

  const handleSubmitForm = async(e) =>{
    e.preventDefault();
    if(!validate()) return
    try{
      const result = await dispatch(signup(formData)).unwrap()
      console.log(result)
      toast.success("Successfully Signed up")
      setFormData({fullname: "", email:"", password: ""})
      navigate("/login");
    }catch(err){
      toast.error(err.message)
      console.log('sign up',err)
    }
  }

  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={(e)=>handleSubmitForm(e)} className='space-y-6'>
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input type='text' value={formData.fullname} 
                      onChange={(e)=>{
                        setFormData({...formData,fullname: e.target.value});
                        setErrors((prev)=>({...prev,fullname:""}))
                      }}
                      className='input'
                      placeholder='Your fullname'
                      />
                    </div>

                    {errors.fullname && (<p className="text-red-500 text-sm mt-2">{errors.fullname}</p>)}
                  </div>

                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input type='email' value={formData.email} 
                      onChange={(e)=>{
                        setFormData({...formData,email:e.target.value});
                        setErrors((prev)=>({...prev,email:""}))
                      }}
                      className='input' placeholder='example@gmail.com'/>
                    </div>
                    {errors.email && (<p className="text-red-500 text-sm mt-2">{errors.email}</p>)}
                  </div>

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
                  <button className='auth-btn' type='submit' disabled={loading}> 
                    {loading ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : ( 
                      "Create Account"
                     )} 
                  </button>
                </form>

                 <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

                {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

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
  )
}

export default SignUp