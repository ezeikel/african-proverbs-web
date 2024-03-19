"use client";

import { Button } from "../ui/button";

type GetInsightButtonProps = {
  handleClick: () => void;
};

const GetInsightButton = ({ handleClick }: GetInsightButtonProps) => {
  return (
    <Button className="self-start" variant="outline" onClick={handleClick}>
      Get Insight
    </Button>
  );
};

export default GetInsightButton;
