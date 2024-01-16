// CardComponent.js
import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { AuthContext } from './AuthContext/AuthContext';
import PaymentPage from './Payment';

import {
  Box,
  Flex,
  Image,
  Select,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Center,
  Slide,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

const CardComponent = () => {

  /****---------State & Hooks----------- */
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const toast = useToast()
  const SetQuestion = context.SetQuestion
  const [role, setRole] = useState("")
  const [experience, Setexperience] = useState("")
  const [showNotification, setShowNotification] = useState(false);
  const [NotificationTitle, SetNotificationTitle] = useState('undefined')
  const [NotificationDiscription, SetNotificationDiscription] = useState('undefined')
  const [NotificationStats, SetNotificationStats] = useState("undefined")
  const [isOpen, setIsOpen] = useState(false);
  
  /**---------------------Functions----------------------------- */
  /**Notification component Function**/
  const NotificaitionCall = (title, description, status) => {
    setShowNotification(true)
    SetNotificationTitle(title)
    SetNotificationDiscription(description)
    SetNotificationStats(status)
  }

  /** On Submit function */
  const onSubmit = async () => {
           
  
       
  
    if(!context.authentication){
    
    toast({
      title:"Warning",
      description:"You haven't logged in Yet",
      status:"warning",
      duration:2000,
      isClosable:true,
      position:"top-right"
    })
    }else  if ( role == "" || experience == "") {
 
      toast({
        title:"Info",
        description:"Wrong Input",
        status:"info",
        duration:2000,
        isClosable:true,
        position:"top-right"
      })

    }
  else{
/**Checking User Is Paid or Not */
try{
  NotificaitionCall("Wait","We are Fetching Data",'loading')
 const {data:{isPaid}} = await axios.get(`http://localhost:900/user/isPaid?email=${context?.authentication.Email}`)
 
 if(isPaid){
  NotificaitionCall("Wait","We are Preparing Interview",'loading')

  const {data} = await axios.post(`http://localhost:900/Interview/Questions`,{
    role:role,
    experience:experience
  })
if(typeof data == 'object'){
  SetQuestion(data)
   navigate('/Interview/Question/1')
}else{
  throw Error
}
  
 }else{
  onClose()
 }
      
 }catch(err){
     
    NotificaitionCall('Error','Something Went Wrong','error')
console.log(err)
 }

  }
         

    
 
    
   


    setTimeout(() => {
      setShowNotification(false)
    }, 2000)
  }

  /** Payment Component Handler */
  const onClose = () => setIsOpen(!isOpen);


 

  return (
    <Box
      backgroundImage={`https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg?w=2000`}
      backgroundSize={"cover"}
      height={{ base: '100%', md: '100vh', lg: '100vh' }}

    >
      <PaymentPage onClose={onClose} isOpen={isOpen}/>
      <Slide direction="top" in={showNotification}>
        <Box display={"flex"} width={"100%"} justifyContent={"center"} paddingTop={"100px"} >
          <Notification showAlert={showNotification} status={NotificationStats} title={NotificationTitle} description={NotificationDiscription}  />
        </Box>
      </Slide>
      <Center>

        <Box

          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="lg"
          marginTop={{ base: "230px", md: "100px", lg: "200px" }}
          backgroundColor={"white"}
          width={{ base: "370px", md: "500px", lg: "600px" }}

        >
          <Flex
            justifyContent={"space-between"}
          >
            {/* Left side - Image */}
            <Image
              src="https://images.businessnewsdaily.com/app/uploads/2017/08/06121450/Tell-a-compelling-story-during-your-job-interview.png" // Replace with your image URL
              alt="Card Image"
              boxSize={{ base: "150px", lg: "260px" }}
              objectFit="cover"
              borderRadius="md"
              mr={4}
            />

            {/* Right side - Form */}
            <VStack align="stretch" spacing={4}
              width={{ base: "150px", md: "260px", lg: "260px" }}
            >
              {/* Select Input - Name of Role */}
              <FormControl>
                <FormLabel>Name of Role</FormLabel>
                <Select placeholder="Select role" onChange={(event) => { setRole(event.target.value) }}>
                  <option value="Node.js">Node.js</option>
                  <option value="Mern">MERN</option>
                  <option value="Java">Java</option>
                </Select>
              </FormControl>

              {/* Select Input - Number of Experience */}
              <FormControl>
                <FormLabel>Number of Experience</FormLabel>
                <Select placeholder="Select experience" onChange={(event) => { Setexperience(event.target.value) }} >
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </Select>
              </FormControl>

              {/* Submit Button */}
              <Button colorScheme="teal" onClick={onSubmit} >Start</Button>
            </VStack>
          </Flex>
        </Box>

      </Center>
    </Box>
  );
};

export default CardComponent;
