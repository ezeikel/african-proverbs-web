"use client";

import { createProverb } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { useSession } from "next-auth/react";

const CreateProverbForm = () => {
  const { data } = useSession();
  const userId = data?.userId;

  const createProverbWithId = createProverb.bind(null, userId);

  return (
    <form
      action={createProverbWithId}
      className="flex flex-wrap gap-4 p-4 border-2 border-slate-400"
    >
      <input type="text" name="text" className="border-2 border-black" />
      <input type="text" name="region" className="border-2 border-black" />
      <input type="text" name="tribe" className="border-2 border-black" />
      <input type="text" name="category" className="border-2 border-black" />
      <SubmitButton className="bg-blue-500 text-white p-2 rounded">
        Submit
      </SubmitButton>
    </form>
  );
};

export default CreateProverbForm;
