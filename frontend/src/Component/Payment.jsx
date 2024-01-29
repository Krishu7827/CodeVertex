import React, { useContext,useState } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import axios from 'axios';

import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  useToast
} from '@chakra-ui/react';

const PaymentPage = ({isOpen,onClose}) => {
 


  /***************  States & Hooks ************** */
  const context = useContext(AuthContext)
const toast = useToast()
  
  

   /**---------------------Functions----------------------------- */

 
   /***  Checkout Handler Function            */
   
  
   const checkoutHandler = async (amount) => {
      console.log(context.authentication)
  
    const { data: { key } } = await axios.get("http://localhost:900/Payment/ApiKey")

    const { data: { order } } = await axios.post("http://localhost:900/Payment/checkout", {
        amount,
      },
      {
        headers: {
         token : context?.authentication.token,
        },
      })

    

     onClose()

     

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "CodeVertex",
        description: "Interview With AI",
        image: "https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg?w=2000",
        order_id: order.id,
        handler: async function (response) {
            // alert(`Payment ID: ${response.razorpay_payment_id}`);
            // alert(`Order ID :${response.razorpay_order_id}`);
            // alert(`signature: ${response.razorpay_signature}`)
            let { data: { success } } = await axios.post("http://localhost:900/Payment/paymentVerification", {
                response
            },
            {
              headers: {
               token : context?.authentication.token,
              },
            })

          if(success){
            toast({
              title: '',
              description: "Paid Succesfully!",
              status: 'success',
              duration: 5000,
              isClosable: true,
              position:"top"
            })
         
          }else{
         
            alert("Something Went Wrong")
          }

        },
        prefill: {
            name: context.authentication.Name,
            email: context.authentication.Email,
            contact: "9718537367"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.on('payment.failed', function (response) {
      alert("Something Went Wrong")
    });
   razor.open();
   
  }


  return (
    <>
     
     

      {/* Payment Modal */}
      <Box>
      
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent  width={{ base: "370px", md: "500px", lg: "600px" }}>
          <ModalHeader>Payment Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box display="flex" justifyContent="space-between">
              {/* Left side - Image */}
              <Image
                src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg?w=2000" // Replace with your image URL
                alt="Course Image"
                boxSize={{ base: "150px", lg: "260px" }}
                objectFit="cover"
                borderRadius="md"
                mr={4}
              />

              {/* Right side - Price and Summary */}
              <VStack align="start" spacing={4} flex="1"   width={{ base: "150px", md: "260px", lg: "260px" }}>
                {/* Price */}
                <Box>
                  <Text fontSize="xl">Product Price: ₹199</Text>
                  <Text fontSize="md" color="gray.500">
                    Discount: -₹50
                  </Text>
                  <Text fontSize="md" fontWeight="bold">
                    Total Amount: ₹149
                  </Text>
                </Box>

                {/* Summary */}
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    Product Summary
                  </Text>
                  <Text>
                    This is a brief summary of the course. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </Box>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            {/* Payment Button */}
            <Button colorScheme="teal" onClick={()=>checkoutHandler(5000)} >
              Pay Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </>
  );
};

export default PaymentPage;
