"use client";
import React from "react";
import { useRouter } from "next/router";
import { PaystackButton } from "react-paystack";
import { supabase } from "@/lib/supabaseClient";

const PaystackPayment = ({ email, userId }: { email: string, userId: string }) => {
  const router = useRouter();

  const publicKey = "pk_live_d94cc6d8172b21877e7e7893283dd2ecd49e897d";
  const amount = 10 * 100; // GHS 20 in pesewas

  const handleSuccess = async (ref: any) => {
    try {
      await supabase.from("payments").insert([
        {
          user_id: userId,
          email,
          amount,
          reference: ref.reference,
        },
      ]);

      await supabase.from("profiles").update({ is_premium: true }).eq("id", userId);

      router.push("/dashboard");
    } catch (error) {
      console.error("Payment update error:", error);
      alert("Payment went through, but something went wrong saving your premium access.");
    }
  };

 const componentProps = {
  email,
  amount,
  publicKey,
  currency: "GHS",
  text: "Pay GHS 10",
  onSuccess: handleSuccess,
  onClose: () => alert("Payment closed"),
  className: "bg-black hover:bg-green-600 text-lime-400 border border-lime-500 px-4 py-2 rounded-lg font-mono"
};


  return <PaystackButton {...componentProps} />;
};

export default PaystackPayment;
