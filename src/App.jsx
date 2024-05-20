import React from 'react'
import Navbar from './components/Navbar'
import {FiSearch} from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect,useState } from 'react';
import { collection,getDocs, onSnapshot } from 'firebase/firestore';
import {db} from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

const App = () => {

const [contacts,setContacts]=useState([]);

const {isOpen,onClose,onOpen} =useDisclouse();

// const [isOpen,setOpen] =useState(false);

// const onOpen =()=>{
//   setOpen(true);
// }

// const onClose=()=>{
//   setOpen(false);
// }


const filterContacts =(e) =>{
  const value=e.target.value;
  const contactsRef=collection(db,"contacts");

onSnapshot(contactsRef,(snapshot)=>{
  const contactLists=snapshot.docs.map((doc)=>{
    return{
      id:doc.id,
      ...doc.data(),
    };
  });
  const filteredContacts=contactLists.filter((contact) =>
    contact.name.toLowerCase().includes(value.toLowerCase()));
  setContacts(filteredContacts);
return filteredContacts;
})

}


useEffect(()=>{
  const getContacts=async()=>{
try{
  const contactsRef=collection(db,"contacts");
  // db is of firebase.js and contacts is collection name in firestore console
  
  
  // const contactsSnapshot=await getDocs(contactsRef);

onSnapshot(contactsRef,(snapshot)=>{
  const contactLists=snapshot.docs.map((doc)=>{
    return{
      id:doc.id,
      ...doc.data(),
    };
  })
  setContacts(contactLists);
return contactLists;
})


  // const contactLists=contactsSnapshot.docs.map((doc)=>{
  //   return{
  //     id:doc.id,
  //     ...doc.data(),
  //   };
  // });

}
catch(error)
{
  console.log(error);
}
  
  };
  getContacts();
},[]);

  return (

    <>
   
    <div className='max-w-[370px] mx-auto px-4'>
      <Navbar/>
      <div className="flex gap-2">
      <div className='flex  flex-grow relative items-center '>
        <FiSearch className=' ml-1 text-white text-3xl absolute'/>
        <input  onChange={filterContacts} type='text' className=' text-white pl-9 border bg-transparent border-white rounded-md h-10 flex-grow'></input>
      </div>
    
      <AiFillPlusCircle  onClick={onOpen} 
      className='text-white text-5xl cursor-pointer ' />
    

      </div>

      <div className='mt-4  gap-4 flex flex-col'>
      {contacts.length<=0?<NotFoundContact/>:
        contacts.map((contact)=>(
        <ContactCard key={contact.id} contact={contact}/>
        ))
      }
    </div>
      
    </div>
  <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
  <ToastContainer/>
    </>
  );
}

export default App


