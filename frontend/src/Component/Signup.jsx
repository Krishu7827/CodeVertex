import React, { useState } from 'react';
import axios from 'axios';
import OTPModal from './OTP';

import {
  
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  useMediaQuery,VStack, Box, grid, Image,Slide
  
} from '@chakra-ui/react';
import Notification from './Notification';

const SignupForm = ({ isOpen, onClose }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('')
  const [ConfirmPassword,setConfirmPassword] = useState('')
  const [showNotification, setShowNotification] = useState(false);
  const [NotificationTitle,SetNotificationTitle] = useState('undefined')
  const [NotificationDiscription,SetNotificationDiscription] = useState('undefined')
  const [NotificationStats,SetNotificationStats] = useState("undefined")
  const [isOpenOTP,setIsOpenOTP] = useState(false)

  const isPhone = useMediaQuery("(max-width: 767px)");

  const toggleOpen = ()=>{
    setIsOpenOTP(!isOpenOTP)
    if(isOpenOTP){ onClose()}
  }

  const Submit = async () => {
    // Add your login logic here
    
   if(password!== ConfirmPassword ){

    NotificaitionCall("error","Both Passwords are not same","error")
   }else if(name== '' && email==''){
   
     NotificaitionCall("error","fill all details","error")
   }else{
    NotificaitionCall("Wait","Sending OTP on Your Email",'loading')
    try{
    const SignUp = await axios.post('http://localhost:900/user/sendingEmail',{
         Name:name,
         Email:email,
         Password:password
    })

    NotificaitionCall("","OTP has Sent On Your Email","success")
    setTimeout(()=>{
       toggleOpen()
    },1000)

    }catch(err){
        NotificaitionCall("Error","Something Went Wrong","error")
    }
   }
  
   

    // Automatically hide the notification after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };


const NotificaitionCall = (title,description,status)=>{
    setShowNotification(true)
    SetNotificationTitle(title)
    SetNotificationDiscription(description)
    SetNotificationStats(status)
  }

  return (
    <Slide direction="top" in={isOpen}>
    <VStack display="grid" >
      {/* First column */}
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width={!isPhone[0] ? '100%' : '90%'} paddingY={{ base: "20px", md: "50px", lg: "50px" }}>
            <ModalHeader textAlign={"center"}>Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
              <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="email"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter Name'
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    isRequired="true"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Enter Confirm Password'
                    isRequired="true"
                  />
                </FormControl>
                <Button
                  colorScheme="teal"
                 
                  _hover={{ bgColor: 'gray.100', color: "black" }}
                  textAlign={"center"}
                  onClick={Submit}
                  boxShadow="md"
                >
                  Login
                </Button>
              </Stack>
            </ModalBody>
            <Slide direction="top" in={showNotification}>
      <Box display={"flex"} width={"100%"} justifyContent={"center"} >
          <Notification showAlert={showNotification} status={NotificationStats} title={NotificationTitle} description={NotificationDiscription}/>
       </Box>
      </Slide>
          </ModalContent>
        
        </Modal>
        
      </Box>
      {/* Second column */}
    <OTPModal isOpen={isOpenOTP} onClose={toggleOpen}/>
    </VStack>
    </Slide>
  )
};



export default SignupForm;
