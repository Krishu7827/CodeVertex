import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Component/Notification';
import PlagiarismModal from './Component/Plagiarism';
import InstructionModal from './Instruction.model';
import EndInterviewModal from './Component/EndInterview';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Center,
  Box,
  Textarea,
  Button,
  Spacer,
  Flex,
Text,
  useBreakpointValue,
  Slide,
  useToast
} from '@chakra-ui/react';


const InterviewComponent = ({Question,index}) => {
    
  const navigate = useNavigate();
  const focusRef = useRef(null);
  const toast = useToast()
  const alertShownRef = useRef(false);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const [text, setText] = useState('')
  const [showNotification, setShowNotification] = useState(false);
  const [NotificationTitle, SetNotificationTitle] = useState('undefined');
  const [NotificationDiscription, SetNotificationDiscription] = useState('undefined');
  const [NotificationStats, SetNotificationStats] = useState('undefined');
  const [isOpen, SetOpen] = useState(false);
  const [isInstruction, SetInstruction] = useState(false)
  const [isOpenEndInterview,setIsOpenEndInterview] = useState(false)
  const [Attempt,SetAttempt] = useState(0)

  useEffect(() => {
   
     onCloseInstruction()
     
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !alertShownRef.current) {
        // Alert student if tab loses focus
         
        onClose();
       
        SpeechRecognition.stopListening()
        // Attempt to regain focus
        alertShownRef.current = true;
      } else {

        // Reset the flag if the tab regains focus
        alertShownRef.current = false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('paste', handleClipboardPaste);
    document.addEventListener('copy', handleClipboardPaste)

    if(!browserSupportsSpeechRecognition){
      NotificaitionCall("","Your Browser Doesn't Support Voice Recognition","error")
     }
  
    return () => {
      document.removeEventListener('visibilityChange', handleVisibilityChange);

    };
  }, []);

  const NotificaitionCall = (title, description, status) => {
    setShowNotification(true);
    SetNotificationTitle(title);
    SetNotificationDiscription(description);
    SetNotificationStats(status);
  };


  const handleClipboardPaste = () => {
    onClose()


  }

  const setInterviewModal = ()=>{
    setIsOpenEndInterview(!isOpenEndInterview)
  }

  const onCloseInstruction = () => {
    SetInstruction(!isInstruction)
  }

  const onClose = () => {
    if(isInstruction){onCloseInstruction()}
    SetOpen(!isOpen);
  };

  const handleSubmit = () => {
    console.log('Submit button clicked. Text:', text);
    const Questions = JSON.parse(localStorage.getItem("Questions"))
    const SetQuestion = {"Question":Question.Question,"response": text || transcript}
    Questions[index] = SetQuestion
    localStorage.setItem("Questions",JSON.stringify(Questions))
      NotificaitionCall("Submitted",'We are Redirecting to Next Question','loading')
     setTimeout(()=>{
      navigate(`/Interview/Question/${index+2}`);
      handleReset()
     
     },3000)
     
  };

  const handleReset = () => {
    setText('');
    resetTranscript();
  };

  const handleEndInterview = () => {
    const Questions = JSON.parse(localStorage.getItem("Questions"))
    let AttemptedQuestion = 0;
    Questions.forEach(Question => {
       if(Question.response){
        AttemptedQuestion++
       }
    });
    SetAttempt(AttemptedQuestion)
    setInterviewModal()
  };

  const handleStartListening = () => {
    if(browserSupportsSpeechRecognition){
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    toast({
      title: 'Info',
      description: "Voice Recorder Got Started",
      status: 'info',
      duration: 4000,
      isClosable: true,
      position:"top-right"
  })
    }else{
      toast({
          title: 'Info',
          description: "Your Browser Doesn't Support Voice Recognition",
          status: 'info',
          duration: 4000,
          isClosable: true,
          position:"top-right"
      })
    }
  };

  const handleStopListening = () => {
   
    if(browserSupportsSpeechRecognition){
      SpeechRecognition.stopListening();
      toast({
        title: 'Info',
        description: "Voice Recorder Got Stopped",
        status: 'info',
        duration: 4000,
        isClosable: true,
        position:"top-right"
    })
      console.log('Stop Listening button clicked.');
      }else{
        toast({
            title: 'Info',
            description: "Your Browser Doesn't Support Voice Recognition",
            status: 'info',
            duration: 4000,
            isClosable: true,
            position:"top-right"
        })
      }
  };

  setTimeout(() => {
    setShowNotification(false);
  }, 3000);



  const buttonFontSize = useBreakpointValue({ base: '10px', md: 'md' });
  const buttonPadding = useBreakpointValue({ base: "5px", md: "15px", lg: "15px" })


  return (
    <Center ref={focusRef}>
      
      <Box p={4} width={{ base: '100%', md: '80%', lg: '60%' }}>
        <PlagiarismModal isOpen={isOpen} onClose={onClose} />
        <InstructionModal isOpen={isInstruction} onClose={onCloseInstruction}/>
        <EndInterviewModal isOpen={isOpenEndInterview} onClose={setInterviewModal} Attempted={Attempt}/>
         <Text fontSize={'20px'} textAlign={"center"} fontWeight={"bold"} marginBottom={"10px"}>{`Q${index+1}: ${Question.Question}`}</Text>

        <Spacer/>

        <Textarea
          value={transcript || text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your interview response here or Speak by Clicking on Start Interview"
          size="md"
          width="100%"
          height="300px"

        />
        <Flex marginTop={4} justifyContent={"space-between"} direction={{ base: '', md: '' }} align={{ base: 'center', md: 'flex-start' }} >
          <Button colorScheme="teal" fontSize={buttonFontSize} onClick={handleSubmit} padding={buttonPadding}>
            Submit
          </Button>
          <Spacer />
          <Button colorScheme="gray" fontSize={buttonFontSize} onClick={handleReset} padding={buttonPadding}>
            Reset
          </Button>
          <Spacer />
          <Button colorScheme="red" fontSize={buttonFontSize} onClick={handleEndInterview} padding={buttonPadding}>
            End the Interview
          </Button>
          <Spacer />
          <Button colorScheme="blue" fontSize={buttonFontSize} onClick={handleStartListening} padding={buttonPadding}>
            Start Listening
          </Button>
          <Spacer />
          <Button colorScheme="orange" fontSize={buttonFontSize} onClick={handleStopListening} padding={buttonPadding}>
            Stop Listening
          </Button>
        </Flex>
      </Box>
      <Slide direction="top" in={showNotification}>
        <Box display="flex" width="100%" justifyContent="center" paddingTop="70px">
          <Notification showAlert={showNotification} status={NotificationStats} title={NotificationTitle} description={NotificationDiscription} />
        </Box>
      </Slide>
    </Center>
  );
};

export default InterviewComponent;
