import React, { useState, useContext } from 'react';
import Notification from './Notification';
import axios from 'axios';
import {AuthContext} from './AuthContext/AuthContext';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Stack,
  Link,
  useMediaQuery,
  VStack,
  PinInput,
  PinInputField,
  HStack,Slide
} from '@chakra-ui/react';

const OTPModal = ({ isOpen, onClose }) => {

 const context = useContext(AuthContext)
 const setAuthenticate = context?.setAuthenticate
  const [otp, setOtp] = useState('');
  const [NotificationTitle,SetNotificationTitle] = useState('undefined')
  const [showNotification, setShowNotification] = useState(false);
  const [NotificationDiscription,SetNotificationDiscription] = useState('undefined')
  const [NotificationStats,SetNotificationStats] = useState("undefined")

 const isPhone = useMediaQuery('(max-width: 767px)');

 const NotificaitionCall = (title,description,status)=>{
    setShowNotification(true)
    SetNotificationTitle(title)
    SetNotificationDiscription(description)
    SetNotificationStats(status)
  }

  const handleOtpSubmit = async() => {
    // Add your OTP verification logic here
    NotificaitionCall("checking","we are checking", "loading")
  
    try{
    const {data:{token,Name,Email}} = await axios.post('http://localhost:900/user/Signup',{
            OTP:otp
        })


    setAuthenticate({token,Name,Email})

     NotificaitionCall("","Signup Success!","success")
     setTimeout(()=>{
        onClose()
       },3000)
    }catch(err){

 NotificaitionCall("Error","Something went wrong","error")

    }

   setTimeout(()=>{
    setShowNotification(false)
   },3000)
    
  };

  return (
    <VStack display="grid">
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width={!isPhone[0] ? '100%' : '90%'} paddingY={{ base: '20px', md: '50px', lg: '50px' }}>
            <ModalHeader textAlign={'center'}>Enter OTP</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Enter OTP</FormLabel>
                  <HStack>
                    <PinInput otp value={otp} onChange={(value) => setOtp(value)}>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </FormControl>
                <Button
                  backgroundColor={'#d71920'}
                  color={'white'}
                  _hover={{ bgColor: 'gray.100', color: 'black' }}
                  textAlign={'center'}
                  onClick={handleOtpSubmit}
                  boxShadow="md"
                >
                  Submit
                </Button>

                <Box display={'flex'} justifyContent={'flex-end'}>
                  <Link color="teal.500" href="#" onClick={onClose}>
                    Cancel
                  </Link>
                </Box>
              </Stack>
            </ModalBody>
            <Slide direction="top" in={showNotification}>
      <Box display={"flex"} width={"100%"} justifyContent={"center"} paddingTop={"5px"}>
          <Notification showAlert={showNotification} status={NotificationStats} title={NotificationTitle} description={NotificationDiscription}/>
       </Box>
      </Slide>
          </ModalContent>
        </Modal>
      </Box>
    </VStack>
  );
};

export default OTPModal;
