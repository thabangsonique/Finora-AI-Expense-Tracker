import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSignIn } from "@clerk/expo";
import { codeSchema, signInFormScema, signInSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function signIn() {
  const { fetchStatus, signIn, errors } = useSignIn();

  // zod form validation
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInFormScema>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  //zod verification code schema
  const {
    control: codeControl,
    formState: { errors: codeErrors },
  } = useForm<{ code: string }>({
    resolver: zodResolver(codeSchema),
    mode: "onBlur",
    defaultValues: { code: "" },
  });

  const onSignIn = async (values: signInFormScema) => {
    //trigger the sign in function.
    const { error } = await signIn.password({
      emailAddress: values.email,
      password: values.password,
    });

    //any errors
  };

  return (
    <KeyboardAvoidingView className="flex-1 px-6 justify-center items-center">
      <View></View>
    </KeyboardAvoidingView>
  );
}
