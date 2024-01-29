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
    useToast, Text,Flex
  } from '@chakra-ui/react';
  
  const EndInterviewModal = ({ isOpen, onClose, Attempted }) => {
      
    const toast = useToast();
    const [review,Setreview] = useState(undefined);
    const ReviewTheQuestion = async()=>{
      console.log("yes")
       
       try{
       
           const Questions = JSON.parse(localStorage.getItem('Questions'));
         const {data} = await  axios.post('http://localhost:900/Interview/Review',{
          Questions
         })
       
         const review = data
        if(typeof review == 'object'){
             console.log(review)
                Setreview(review[0]);
        }else{
          throw Error;
        }
  
       }catch(err){
          toast({
            title: 'Error',
            description: "Something Went Wrong, try again",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:'top'
          })
       }
         

        
    }
let timeoutId;
    /*** Debounce function to async */
   function debounce(func, delay) {
    

      toast({
        title: 'Wait',
            description: "AI Interviewer is reviewing Your responses",
            status: 'loading',
            duration: 6000,
            isClosable: true,
            position:'bottom-right'
      })
   
    
      return function (...arg) {
        console.log(`Previous ${timeoutId}`)
        clearTimeout(timeoutId);
    
        timeoutId = setTimeout(() => {
          func(...arg);
        }, delay);
        console.log('recent'+" "+timeoutId)
   
      };
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

          {!review ? (
            <>
              <ModalCloseButton />
              <ModalBody>
                <h1>Total Questions: <span style={{ color: 'green', fontWeight: "bolder" }}>10</span></h1>
                <h1>
                  Attempted Questions:{' '}
                  {Attempted > 5 ? (
                    <span style={{ color: 'green', fontWeight: "bolder" }}>{Attempted}</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: "bolder" }}>{Attempted}</span>
                  )}
                </h1>
                {Attempted < 5 ? (
                  <p style={{ color: "red", fontWeight: "bolder" }}>
                    You have attempted less than 5 questions. This could affect your
                    interview performance. We suggest attempting more than 5
                    questions.
                  </p>
                ) : (
                  ''
                )}
              </ModalBody>

              <ModalFooter>
                {Attempted < 5 ? (
                  <Button onClick={() => { debounce(ReviewTheQuestion, 3000)() }}>OK, I Understand</Button>
                ) : (
                  <Button onClick={() => { debounce(ReviewTheQuestion, 3000)() }}>Submit</Button>
                )}
              </ModalFooter>
            </>
          ) : (
            <ModalBody>
              <ModalCloseButton />
              <Flex >
              <Text fontWeight={'bold'} marginRight={'10px'}>Score: </Text >{review.score>7?<Text color={'green'}>{review.score}</Text>:<Text color={'red'}>{review.score}</Text>}
              </Flex>
              <Flex >
              <Text fontWeight={'bold'} marginRight={'10px'} >Feedback: </Text >{<Text color={''}>{review.feedback}</Text>}
              </Flex>
              <Flex >
              <Text fontWeight={'bold'} marginRight={'10px'} >Extra: </Text >{<Text color={''}>{review.extra}</Text>}
              </Flex>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Box>
    );
  };
  
  export default EndInterviewModal;
  