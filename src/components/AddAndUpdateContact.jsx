import React from 'react'
import Modal from './Modal'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import { doc,updateDoc,addDoc,collection } from 'firebase/firestore'
import {db} from "../config/firebase"
import {toast} from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation =Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("Email is required"),
});


const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {

    const updateContact=async(contact,id)=>{
        try{
            const contactRef=doc(db,"contacts",id);
            await updateDoc(contactRef,contact);
            onClose();
            toast.success("contact update succesfully");
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const addContact=async(contact)=>{
        try{
            const contactRef=collection(db,"contacts");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("contact added succesfully");
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose} > 
    <Formik
    validationSchema={contactSchemaValidation}
    initialValues={
        isUpdate?{
            name:contact.name,
            email:contact.email,
        }:
        {
            name:"",
            email:""
        }
    }
    onSubmit={(values)=>{

    isUpdate?
    updateContact(values,contact.id):
    addContact(values);
    }}
    >
        <Form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name</label>
                <Field name="name" className="h-10 border"/>
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name="name"/>
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email</label>
                <Field type="email" name="email" className="h-10 border"/>
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name="email"/>
                </div>
            </div>

            <button className='px-3 bg-orange border self-end'>{isUpdate?"Update":"Add"} Contact</button>

        </Form>
    </Formik> 
    </Modal>
    </div>
)
}

export default AddAndUpdateContact
