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
  Avatar,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";


interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function Register({
  isOpen,
  onClose,
  onOpenLogin,
}: RegisterProps) {
  const handleLoginAndClose = () => {
    onOpenLogin();
    onClose();
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact:"",
    address:"",
    avtar: null,
    isGoogle: false,
  });


  const [photoURL, setPhotoURL] = useState("/profile.png");
  // const toast = useToast();

 

  const registerUser = async (e) => {
    
    try{
      const res = await axios.post("http://localhost:3000/api/v1/register", formData ,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("OTP sent to your email");
     
    }
    catch(err){
      console.log(err)
      toast.error("Invalid Credentials");

    }

    };

    const verifyOTP = async () => {
      // e.preventDefault();
      
    try{
      const res = await axios.post("http://localhost:3000/api/v1/verify", formData ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data);
     
      toast.success("Registered in successfully");
      onClose();
    }
    catch(err){
      console.log(err)
      toast.error("Invalid Credentials");
    }

    }


    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = event.target;
  
      if (name === "avtar" && files && files[0]) {
        const imageFile = files[0];
  
        // Use the updater function to ensure the state update is based on the previous state
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: imageFile,
        }));
  
        const imageUrl = URL.createObjectURL(imageFile);
        setPhotoURL(imageUrl);
        
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    };

    const googleRegister = async () => {
      try{
        const result = await signInWithPopup(auth,provider)
        const res = await axios.post("http://localhost:3000/api/v1/register", {
          email:result.user.email,
          name:result.user.displayName,
          isGoogle:true,
          address:'google-address',
          password:'google-password',
          isVerified:true
        } ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

      }catch(e){
        console.log("error:",e)
      }
    }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered >
      <ModalOverlay bg='none'
        backdropFilter='auto'
        backdropInvert='15%'
        backdropBlur='2px' /> 
      <ModalContent bg={"rgb(39 39 42)"} borderRadius={5} mt={5} marginLeft={3} marginRight={3} >
        <ModalHeader className=" bg-opacity-100 border-b border-gray-500 text-white">
          Register
        </ModalHeader>
        <ModalCloseButton className="text-white" />
        <ModalBody className="space-y-4 bg-opacity-100  text-gray-900 mt-5">

          <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FaUserCheck color='gray.300' />
            </InputLeftElement>
            <Input
              name="name"
              onChange={handleChange}
              placeholder="Enter your username"
              bg="gray.300"
              rounded="false"
              className=" rounded-sm "
            />
            </ InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <MdEmail color='gray.300' />
            </InputLeftElement>
            <Input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              bg="gray.300"
              rounded="false"
              className=" rounded-sm "
            />
            </ InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <RiLockPasswordFill color='gray.300' />
            </InputLeftElement>
            <Input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              bg="gray.300"
              rounded="false"
              className=" rounded-sm "
            />
            </ InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FaPhone color='gray.300' />
            </InputLeftElement>
            <Input
              name="contact"
              onChange={handleChange}
              type="number"
              placeholder="Enter your contact"
              bg="gray.300"
              rounded="false"
              className=" rounded-sm "
            />
            </ InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FaRegAddressCard color='gray.300' />
            </InputLeftElement>
            <Input
              name="address"
              onChange={handleChange}
              type="text"
              placeholder="Enter your address"
              bg="gray.300"
              rounded="false"
              className=" rounded-sm "
            />
            </ InputGroup>
          </FormControl>
          <FormControl className="flex items-center justify-between h-full border-2 border-gray-500 rounded-sm py-4 md:px-16 px-8 ">
            <label className=" py-2 px-3 bg-[#319795] font-semibold rounded-sm text-[16px] text-white ">
              Choose File
              <Input
                name="avtar"
                onChange={handleChange}
                type="file"
                accept=".jpg, .jpeg, .png"
                width={200}
                size="lg"
                border={0}
                color={"white"}
                display={"none"}
              />
            </label>
            
            <Avatar className="" src={photoURL} width={20} height={20} />
          </FormControl>

          <div className="flex items-center">

            <FormControl>
              <Input
                name="otp"
                onChange={handleChange}
                placeholder="Enter the OTP"
                bg="gray.300"
                rounded="false"
                className=" rounded-sm "
              />
            </FormControl>

            <Button colorScheme="teal" marginLeft={3} borderRadius={3} onClick={registerUser} paddingLeft={5} paddingRight={5} >
              Get the OTP
            </Button>

          </div>

          <Text cursor="pointer" className=" text-[14px] text-gray-300 " >
            Already have an account?{" "}
            <span className="text-blue-400" onClick={handleLoginAndClose}>
              {" "}
              Login now
            </span>
          </Text>
        </ModalBody>
        <ModalFooter className=" bg-opacity-100 shadow-lg text-white flex flex-col justify-center items-center">

        <div className=" ">
          <Button colorScheme="teal" mr={3} onClick={verifyOTP}>
            Register{" "}
          </Button>

          <Button onClick={onClose}>Close</Button>
        </div>
        <p className=" text-[14px] text-gray-300 my-1 " >or</p>
        <Button onClick={googleRegister} colorScheme='blue' variant='outline' leftIcon={<FcGoogle />} >
          Continue with Google
        </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
