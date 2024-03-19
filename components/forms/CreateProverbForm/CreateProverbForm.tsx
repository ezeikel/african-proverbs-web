"use client";

import { useRef } from "react";
import { useSession } from "next-auth/react";
import { Country } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProverb } from "@/app/actions";
import { COUNTRIES, REGIONS } from "@/constants";
import { cn } from "@/lib/utils";

type CreateProverbFormProps = {
  className?: string;
};

const CreateProverbForm = ({ className }: CreateProverbFormProps) => {
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
      className={cn("flex flex-wrap gap-4 p-4", {
        [className as string]: !!className,
      })}
      ref={formRef}
    >
      <Input type="text" name="text" required />
      <Select name="region">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a region" />
        </SelectTrigger>
        <SelectContent>
          {REGIONS.map((region) => (
            <SelectItem key={region.code} value={region.code}>
              {region.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select name="country">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(COUNTRIES).map((country) => (
            <SelectItem key={country} value={country}>
              {COUNTRIES[country as Country].name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input type="text" name="tribe" />
      <Input type="text" name="category" />
      <Button>Submit</Button>
    </form>
  );
};

export default CreateProverbForm;
