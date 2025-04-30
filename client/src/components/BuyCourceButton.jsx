import React from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi.js";
import { Loader2 } from "lucide-react";

const BuyCourceButton = ({ courceId }) => {
  const [createCheckoutSession, { isLoading }] =
  useCreateCheckoutSessionMutation();

  const purchaseCourceHandler = async () => {
    await createCheckoutSession(courceId);
  };
  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourceHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourceButton;
