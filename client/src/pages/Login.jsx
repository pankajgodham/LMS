import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
  const [loginInput,setLoginInput]=useState({
    email:"",password:""
  })
  const [signupInput,setSignupInput]=useState({
    name:"",email:"",password:""
  })
  const[registerUser,{data:registerdata,error:registererror,isLoading:registerisloading,isSuccess:registerissuccess}]=useRegisterUserMutation();
  const [loginUser,{data:logindata,error:loginerror,isLoading:loginisloading,isSuccess:loginissuccess}]=useLoginUserMutation();
  const navigate=useNavigate()
  const changeInputhandler=(e,type)=>{
    const {name,value}=e.target;
    if(type==="signup"){
      setSignupInput({...signupInput,[name]:value})
    }else{
      setLoginInput({...loginInput,[name]:value})
    }
  }
  const handleRegistration=async(type)=>{
    const inputData=type==="signup"?signupInput:loginInput;
    const action=type=="signup"?registerUser:loginUser;
    await action(inputData)
console.log(inputData);



  }

  useEffect(()=>{
 if(registerissuccess&&registerdata){
  toast.success(registerdata.message || "signup successfully")
 }
 if(loginissuccess&&logindata){
  toast.success(logindata.message || "login successfully")
  navigate("/")
 }
 if(registererror){
  toast.error(registererror.message || "error")
 }
 if(loginerror){
  toast.error(loginerror.message || "error")
 }
  },[loginisloading,registerisloading,logindata,registerdata,loginerror,registererror])
  return (
    <div className="flex items-center w-full justify-center mt-20 ">
 <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
            Create a new account and click signup when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input type="text"
              name="name"
              value={signupInput.name}
              onChange={(e)=>changeInputhandler(e,"signup")} placeholder="pankaj" required={true}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email"
               name="email"
               value={signupInput.email}
               onChange={(e)=>changeInputhandler(e,"signup")} placeholder="pankaj@gmail.com" required={true}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="Password" 
               name="password"
               value={signupInput.password}
               onChange={(e)=>changeInputhandler(e,"signup")} placeholder="*****" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={registerisloading} onClick={()=>handleRegistration("signup")}>
            {registerisloading ?(
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                </>
              ):"register"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
            Login your password here. After signup, you'll be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" 
               name="email"
               value={loginInput.email}
               onChange={(e)=>changeInputhandler(e,"login")} placeholder="pankaj@gmail.com" required={true}/>
            </div>
            <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input type="Password"
             name="password"
             value={loginInput.password}
             onChange={(e)=>changeInputhandler(e,"login")} placeholder="*****" required={ true}/>
            </div>
          </CardContent>
          <CardFooter>

            <Button disabled={loginisloading} onClick={()=>handleRegistration("login")}>
              {loginisloading ?(
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                </>
              ):"login"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
   
  )
}
export default Login;