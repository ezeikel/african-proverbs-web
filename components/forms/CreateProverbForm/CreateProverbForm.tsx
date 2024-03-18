"use client";

import { useRef } from "react";
import { useSession } from "next-auth/react";
import { Country } from "@prisma/client";
import { createProverb } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { COUNTRIES, REGIONS } from "@/constants";
import Select from "../inputs/Select/Select";

const CreateProverbForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useSession();
  const userId = data?.userId;

  const createProverbWithId = createProverb.bind(null, userId);

  return (
    <form
      action={async (formData) => {
        await createProverbWithId(formData);

        // reset the form
        formRef.current?.reset();
      }}
      className="flex flex-wrap gap-4 p-4 border-2 border-slate-400"
      ref={formRef}
    >
      <input
        type="text"
        name="text"
        className="border-2 border-black"
        required
      />
      <Select
        name="region"
        placeholder="Select a region"
        selectOptions={REGIONS.map((region) => ({
          label: region.name,
          value: region.code,
        }))}
        handleChange={(option) => {
          console.log(option);
        }}
      />
      <Select
        name="country"
        placeholder="Select a country"
        selectOptions={Object.keys(COUNTRIES).map((country) => ({
          label: COUNTRIES[country as Country].name,
          value: country as Country,
        }))}
        handleChange={(option) => {
          console.log(option);
        }}
      />
      <input type="text" name="tribe" className="border-2 border-black" />
      <input type="text" name="category" className="border-2 border-black" />
      <SubmitButton className="bg-blue-500 text-white p-2 rounded">
        Submit
      </SubmitButton>
    </form>
  );
};

export default CreateProverbForm;
