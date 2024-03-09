'use client'

import { createProverb } from "@/app/actions";

const CreateProverbForm = () => {

  return (
    <form action={createProverb} className="flex flex-wrap gap-4 p-4 border-2 border-slate-400">
      <input type="text" name="text" className="border-2 border-black" />
      <input type="text" name="region" className="border-2 border-black" />
      <input type="text" name="tribe" className="border-2 border-black" />
      <input type="text" name="category" className="border-2 border-black" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  )

}

export default CreateProverbForm;
