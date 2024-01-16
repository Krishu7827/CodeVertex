import { createContext, useState } from 'react';

 export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState( "" ||  JSON.parse(localStorage.getItem("authentication")));
  const [Questions,SetQuestions] = useState(null || JSON.parse(localStorage.getItem("Questions")))


  const SetQuestion = (Questions)=>{
    localStorage.setItem("Questions",JSON.stringify(Questions))
      SetQuestions(Questions)
  }
 
const setAuthenticate = (data)=>{
localStorage.setItem("authentication",JSON.stringify(data))
   setAuthentication(data)
}
 

  return (
    <AuthContext.Provider value={{ authentication, setAuthenticate, SetQuestion, Questions}}>
      {children}
    </AuthContext.Provider>
  );
};



;
