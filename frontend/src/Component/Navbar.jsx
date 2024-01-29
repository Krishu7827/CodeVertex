/********* Import        ********** */
import React, { useState, useContext } from 'react';
import LoginForm from './Login';
import Notification from './Notification';
import { AuthContext } from './AuthContext/AuthContext';
import {

  Box,
  Flex,
 Spacer,
  Button,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Input, InputGroup, InputRightElement, useMediaQuery, Avatar, Text,Slide
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';


/****************** Component          ********************** */
const Navbar = () => {

  /***************  States ************** */
 const context = useContext(AuthContext)
 const setAuthenticate = context.setAuthenticate
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const IsTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)')
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [NotificationTitle,SetNotificationTitle] = useState('undefined')
  const [NotificationDiscription,SetNotificationDiscription] = useState('undefined')
  const [NotificationStats,SetNotificationStats] = useState("undefined")

  /******************* function *********************** */

  /**********Notification Generate function************** */
  const NotificaitionCall = (title,description,status)=>{
    setShowNotification(true)
    SetNotificationTitle(title)
    SetNotificationDiscription(description)
    SetNotificationStats(status)
  }


  /** logoutHandler */
  const logout = ()=>{
    NotificaitionCall("logout :", "logout Success", "success")
   setAuthenticate("")
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);

  }

  /**login model open Handler */
  const handleOpen = () => {
    setIsOpen(true);
  };

    /**login model close Handler */
  const handleClose = () => {
    setIsOpen(false);
  };

  /***responsvie Navbar open toggle */
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  /******   responsive Navbar close toggle****** */
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Flex
      p={{ base: 2, md: 4 }}
      bgColor="#164863"
      color="white"
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"}
    >
      <Box>
    {/* Notification Component */}
      <Slide direction="top" in={showNotification}>
      <Box display={"flex"} width={"100%"} justifyContent={"center"} paddingTop={"10px"}>
          <Notification showAlert={showNotification} status={NotificationStats} title={NotificationTitle} description={NotificationDiscription}/>
       </Box>
      </Slide>

         <Link fontSize={{ base: 'md', md: 'xl' }} fontWeight="bold" >
          CodeVertex
        </Link>
      </Box>
     <Spacer/>
      <Box display={{ base: 'none', md: 'flex' }} borderRadius={30}>
        {/* Display buttons for larger screens */}

      

        <Button variant="ghost" mr={4} color={"white"}>
          Home
        </Button>
        <Button variant="ghost" mr={4} color={"white"}>
          About
        </Button>
        <Button variant="ghost" mr={4} color={"white"}>
          Services
        </Button>
        {context?.authentication && context?.authentication.Name?<Button variant="ghost" mr={4} onClick={logout} color={"white"}>
          Logout
        </Button>:<Button variant="ghost" mr={4} onClick={handleOpen} color={"white"}>
          Login
        </Button>}
        
        {context?.authentication && context?.authentication.Name?<Box display="flex" alignItems="center" >
          <Avatar size="sm" name={"xyz"} src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" borderRadius="full" />
          <Text marginLeft={2} fontSize={"110%"} fontWeight={"semibold"}>{context.authentication.Name.split(" ")[0]}</Text>
        </Box>:""}

      </Box>
      <Box display={{ base: 'flex', md: 'none' }} >
        {/* Display hamburger icon for smaller screens */}
        <IconButton
          icon={<HamburgerIcon size={{ base: "20" }} />}
          variant="ghost"
          onClick={handleDrawerOpen}
         color={"white"}
        />
      </Box>

      {/* Responsive Drawer for smaller screens */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} placement="left" >
        <DrawerOverlay />
        <DrawerContent  bgColor="#164863" color={"white"} >
          <DrawerCloseButton />
          <DrawerBody>
            {/* Use VStack to stack items vertically */}
            <VStack spacing={4} align="start" color={'white'}>
              <Button variant="ghost" onClick={handleDrawerClose} color={'white'} >
                Home
              </Button>
              <Button variant="ghost" onClick={handleDrawerClose} color={'white'}>
                About
              </Button>
              <Button variant="ghost" onClick={handleDrawerClose} color={'white'}>
                Services
              </Button>
              <Button variant="ghost" onClick={handleDrawerClose} color = {'white'}>
                Contact
              </Button>

              {/* /****Search Input */}
          

              {/* Search Input */}
              {context?.authentication && context?.authentication.Name?<Button variant="ghost" color={'white'} mr={4} onClick={logout} >
          Logout
        </Button>:<Button variant="ghost" mr={4} onClick={handleOpen}>
          Login
        </Button>}
        

              {context?.authentication && context?.authentication.Name?<Box display="flex" alignItems="center" >
          <Avatar size="sm" name={"xyz"} src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" borderRadius="full" />
          <Text marginLeft={2} fontSize={"110%"} fontWeight={"semibold"}>{context.authentication.Name.split(" ")[0]}</Text>
        </Box>:""}

            </VStack>
          </DrawerBody>
        </DrawerContent>

      </Drawer>
      <LoginForm isOpen={isOpen} onClose={handleClose} />
    </Flex>
  );
};


export default Navbar
