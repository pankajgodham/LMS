import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi.js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourceButton = ({ courceId }) => {
  const [createCheckoutSession, { data,isLoading,isSuccess,isError,error}] =
  useCreateCheckoutSessionMutation();

  const purchaseCourceHandler = async () => {
    await createCheckoutSession(courceId);
  };

  useEffect(()=>{
    if (isSuccess) {
      if(data?.url){
        window.location.href=data.url
      }
      else{
        toast.error("invalid response")
      }
      // toast.success()
    }
    if (isError) {
      toast.error(error?.data?.message ||"Failde to create checkout")
    }
  },[data,isSuccess,isError,error])
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
