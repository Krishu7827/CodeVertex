/******* Import ********** */
import React, { useState,useContext } from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext/AuthContext';
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
  useMediaQuery, VStack,Box, Slide

} from '@chakra-ui/react';
import Notification from './Notification';
import SignupForm from './Signup';


/********** Login Component******************** */
const LoginForm = ({ isOpen, onClose }) => {
  /*************States & Hooks***************** */
  const context = useContext(AuthContext)
  const setAuthenticate = context?.setAuthenticate
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const isPhone = useMediaQuery("(max-width: 767px)");
  const [isSignupOpen, SetSignupForm] = useState(false)
  const [NotificationTitle, SetNotificationTitle] = useState('undefined')
  const [NotificationDiscription, SetNotificationDiscription] = useState('undefined')
  const [NotificationStats, SetNotificationStats] = useState("undefined")

  /******************* fucntions ***************** */

  /***** ------ Notification Function ------ */
  const NotificaitionCall = (title,description,status)=>{
    setShowNotification(true)
    SetNotificationTitle(title)
    SetNotificationDiscription(description)
    SetNotificationStats(status)
  }

  /********** SignUp handler ************* */
  const SignupHandler = () => {
    SetSignupForm(!isSignupOpen)
    if (isOpen) { onClose() }
  }

  /************ Submission of form function************** */
  const handleSubmit = async() => {
   
    // Add your login logic here
    if (email == '' || password == '') {

     NotificaitionCall("Error","Please Enter Email and Password","warning")

    }
    
   else if(!emailRegex.test(email)){
 
      NotificaitionCall("Error","Please Enter Valid Email ","warning")

    }else{
      try{

        NotificaitionCall("Wait","We are Checking","loading")

        const {data:{Name,accessToken,Email}} = await axios.post("http://localhost:900/user/Login",{
              Email:email,
              Password:password,
               
        })
       

        NotificaitionCall("","Login Success!","success")
 
        setAuthenticate({Name,token:accessToken,Email})
        
        setTimeout(() => {
          onClose();
         },3000);


      }catch(err){

        NotificaitionCall("Error","You haven't logged Yet","error")

      }
    
     
    }
    
    // Automatically hide the notification after 2 seconds
    setTimeout(() => {
     setShowNotification(false);
    }, 2000);
  };

  return (
    <Slide direction="top" in={isOpen}>
      <VStack display="grid" >
        {/* First column */}
        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width={!isPhone[0] ? '100%' : '90%'} paddingY={{ base: "20px", md: "50px", lg: "50px" }}>
              <ModalHeader textAlign={"center"}>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
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
                  <Button
                  colorScheme="teal"
                    _hover={{ bgColor: 'gray.100', color: "black" }}
                    textAlign={"center"}
                    onClick={handleSubmit}
                    boxShadow="md"
                   
                  >
                    Login
                  </Button>



                  <Box display={"flex"} justifyContent={"space-between"}  >
                    <Text>
                      <Link color="teal.500" >
                        Forgot Password?
                      </Link>
                    </Text>
                    <Text>
                      Don't have an account?{' '}
                      <Link color="teal.500" onClick={SignupHandler} >
                        Sign Up
                      </Link>
                    </Text>
                  </Box>
                </Stack>
              </ModalBody>
              <Slide direction="top" in={showNotification}>
                <Box display={"flex"} width={"100%"} justifyContent={"center"} paddingTop={"10px"}>
                  <Notification showAlert={showNotification} status={NotificationStats} title={NotificationTitle} description={NotificationDiscription} />
                </Box>
              </Slide>
            </ModalContent>
          </Modal>
        </Box>
        {/* Second column */}

        <SignupForm isOpen={isSignupOpen} onClose={SignupHandler} />
      </VStack>
    </Slide>
  )
};



export default LoginForm;
