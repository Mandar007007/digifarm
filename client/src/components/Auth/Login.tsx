import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  toggleLogin: () => void;
}

export default function Login({
  isOpen,
  onClose,
  onOpenRegister,
  toggleLogin,
}: LoginProps) {

  const dispatch = useDispatch();
  // const toast = useToast();
  const [Loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleRegisterAndClose = () => { 
    onClose();
    onOpenRegister();
  };

  const updateEmail = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const updatePassword = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const loginUser = async (e: any) => {
    e.preventDefault();
    console.log(data);

    setLoading(true);

    try{
      const res = await axios.post("http://localhost:3000/api/v1/login", data ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      
      if(res.data.user){
        dispatch({type:"SET_USER",payload:res.data.user})
      }
      toast.success("Logged in successfully");
      toggleLogin();
      onClose();
    }
    catch(err){
      // console.log(err)
      toast.error("Invalid Credentials");

    }
    setLoading(false); 
  };

  const googleLogin = async () => {
    try{
      const result = await signInWithPopup(auth,provider)

      const res = await axios.post("http://localhost:3000/api/v1/login", {email:result.user.email,password:'',isGoogle:true} ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if(res.data.user){
        dispatch({type:"SET_USER",payload:res.data.user})
      }
      toast.success("Logged in successfully");
      toggleLogin();
      onClose();
      
    }catch(err){
      console.log(err)
    }
  }
  

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay bg='none'
    backdropFilter='auto'
    backdropInvert='15%'
    backdropBlur='2px'/>
    <ModalContent borderRadius={10} bg={"rgb(39 39 42)"} marginX={3} >
      <ModalHeader className=" border-b border-gray-500 text-white">
        Login
      </ModalHeader>
      <ModalCloseButton className="text-white" />
      <ModalBody className="space-y-2 mt-5 text-gray-900">
        <FormControl className=" mb-5 " >
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <MdEmail color='gray.300' />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="Enter your email"
            bg="gray.300"
            className=" rounded-sm "
            rounded="false"
            onChange={updateEmail}
          />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <RiLockPasswordFill color='gray.300' />
          </InputLeftElement>
          <Input
            type="password"
            placeholder="Enter your password"
            bg="gray.300"
            className=" rounded-sm "
            rounded="false"
            onChange={updatePassword}
          />
          </InputGroup>
        </FormControl>
        <Text cursor="pointer" className=" text-[14px] text-gray-300 " >
          Don't have an account?{" "}
          <span className="text-blue-400" onClick={handleRegisterAndClose}>
            Register now
          </span>
        </Text>
      </ModalBody>
      <ModalFooter className=" bg-opacity-100 text-white flex flex-col justify-center items-center">
        <div className=" ">
          <Button isLoading={Loading} loadingText='logging in..' colorScheme="teal" mr={3} onClick={loginUser} >
            Login
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
        <p className=" text-[14px] text-gray-300 my-1 " >or</p>
        <Button onClick={googleLogin} colorScheme='blue' variant='outline' leftIcon={<FcGoogle />} >
          Continue with Google
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
}


