'use client'

import { useFormStatus } from 'react-dom';
import { createProverb } from "@/app/actions";
import SubmitButton from '@/components/SubmitButton/SubmitButton';

const CreateProverbForm = () => {
  const { pending } = useFormStatus();
  
  return (
    <form action={createProverb} className="flex flex-wrap gap-4 p-4 border-2 border-slate-400">
      <input type="text" name="text" className="border-2 border-black" />
      <input type="text" name="region" className="border-2 border-black" />
      <input type="text" name="tribe" className="border-2 border-black" />
      <input type="text" name="category" className="border-2 border-black" />
      <SubmitButton  className="bg-blue-500 text-white p-2 rounded">Submit</SubmitButton>
    </form>
  )

}

export default CreateProverbForm;
