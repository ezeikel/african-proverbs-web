"use client";

import { useEffect, useState } from "react";
import cn from "@/utils/cn";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { LoaderType } from "@/types";
import Loader from "../Loader/Loader";

type GetInsightButtonProps = ButtonProps & {
  proverb: string;
  getInsight: (proverb: string) => Promise<string>;
  className?: string;
};

const GetInsightButton = ({
  proverb,
  className,
  getInsight,
  ...props
}: GetInsightButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [insight, setInsight] = useState<string>();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    <>
      <Button
        className={cn({
          [className as string]: !!className,
        })}
        onClick={async () => {
          setIsOpen(true);
          setInsight(await getInsight(proverb));
        }}
        {...props}
      >
        Get Insight
      </Button>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{proverb}</AlertDialogTitle>
            <AlertDialogDescription>
              {insight || (
                <Loader className="my-8" type={LoaderType.PROVERB_INSIGHT} />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GetInsightButton;
