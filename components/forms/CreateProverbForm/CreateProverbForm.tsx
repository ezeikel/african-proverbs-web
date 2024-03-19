"use client";

import { useRef } from "react";
import { useSession } from "next-auth/react";
import { Country, Region } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contributeProverb } from "@/app/actions";
import { COUNTRIES, REGIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContributeProverbFormProps = {
  className?: string;
};

const ContributeProverbForm = ({ className }: ContributeProverbFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useSession();
  const userId = data?.userId;

  const contributeProverbWithId = contributeProverb.bind(null, userId);

  return (
    <div
      className={cn({
        [className as string]: !!className,
      })}
    >
      <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
        Contribute a Proverb
      </h1>
      <form
        action={async (formData) => {
          await contributeProverbWithId(formData);

          // reset the form
          formRef.current?.reset();
        }}
        className="flex flex-wrap gap-4 p-4 m-auto"
        ref={formRef}
      >
        <Label htmlFor="text">Proverb</Label>
        <Textarea name="text" className="resize-none" />
        <div className="flex gap-x-4">
          <div>
            <Label htmlFor="region">Region</Label>
            <Select name="region">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(REGIONS).map((region) => (
                  <SelectItem key={region} value={region}>
                    {REGIONS[region as Region].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
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
          </div>
        </div>
        <div className="flex gap-x-4">
          <div>
            <Label htmlFor="tribe">Tribe</Label>
            <Select name="tribe">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a tribe" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(REGIONS).map((region) => (
                  <SelectItem key={region} value={region}>
                    {REGIONS[region as Region].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(COUNTRIES).map((country) => (
                  <SelectItem key={country} value={country}>
                    {COUNTRIES[country as Country].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default ContributeProverbForm;
