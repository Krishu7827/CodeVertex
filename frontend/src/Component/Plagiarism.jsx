import React, {useEffect,useState} from 'react';
import alert from "./stop-13692.mp3"
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Spacer
} from '@chakra-ui/react';

const PlagiarismModal = ({ isOpen, onClose }) => {
 

  

   
  return (

      <Box>

        <Modal isOpen={isOpen} onClose={onClose} size="xl" >
          <ModalOverlay />
          <ModalContent marginLeft={{base:"10px"}} marginRight={{base:"10px"}}>
            <ModalHeader textAlign={"center"} color={"red"} fontWeight={"bold"}>Plagiarism</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                {/* Left side - Image */}
                <Box>
                  <Image
                    src="https://www.medtextpert.com/wp-content/uploads/2022/04/Plagiarism-Blog-27-Medtextpert.jpg" // Replace with your image URL
                    alt="Plagiarism Warning Image"
                    boxSize="700px"
                    height={'220px'}
                    objectFit="cover"
                    borderRadius="md"
                    mr={4}
                  
                  />
                </Box>
       <Spacer/>
                {/* Right side - Plagiarism Warning Text */}
                <Box marginLeft={"10px"} >
                  <Text fontSize="lg" fontWeight="bold" textAlign={"center"} color={"red"}>
                    Plagiarism Warning
                  </Text>
                  <Text fontWeight={"bold"}   >
                    Please be aware that using external tools or resources during the Interview may lead to plagiarism
                    violations. Make sure to complete the interview independently.
                  </Text>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
  
  );
};

export default PlagiarismModal;
