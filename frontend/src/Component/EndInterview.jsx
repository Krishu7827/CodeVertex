import axios from 'axios';
import { useState } from 'react';
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from '@chakra-ui/react';
  
  const EndInterviewModal = ({ isOpen, onClose, Attempted }) => {
      
    const ReviewTheQuestion = async()=>{
       
       try{
       
           
         
       
      

       }catch(err){

       }
         

        
    }
    return (
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent
            marginLeft={{ base: '10px' }}
            marginRight={{ base: '10px' }}
            backgroundColor="#fff"
            borderRadius="10px"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          >
            <ModalHeader textAlign="center" color="red" fontWeight="bold">
              Interview Summary
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h1>Total Questions: <span style={{ color: 'green', fontWeight:"bolder" }}>10</span></h1>
              <h1>
                Attempted Questions:{' '}
                {Attempted > 5 ? (
                  <span style={{ color: 'green', fontWeight:"bolder"}}>{Attempted}</span>
                ) : (
                  <span style={{ color: 'red', fontWeight:"bolder"}}>{Attempted}</span>
                )}
              </h1>
              {Attempted < 5 ? (
                <p style={{color:"red", fontWeight:"bolder"}}>
                  You have attempted less than 5 questions. This could affect your
                  interview performance. We suggest attempting more than 5
                  questions.
                </p>
              ) : (
                ''
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={ReviewTheQuestion}>
                {Attempted < 5 ? 'Ok, I Understand' : 'Submit'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default EndInterviewModal;
  