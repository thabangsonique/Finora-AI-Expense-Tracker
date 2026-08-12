import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Touchable,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { codeSchema, signUpFormSchema, signUpSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/expo";
import { Link, router } from "expo-router";

export default function SignUp() {
  //set the schemas and reacthopok forms.
  console.log("SIGN UP RENDER");
  const [email, setEmail] = useState("");
  const { signUp, errors, fetchStatus } = useSignUp();
  const isLoading = fetchStatus === "fetching";
  const [passwordError, setPasswordError] = useState("");
  const [verifyCodeError, setVerifyCodeError] = useState("");

  // errors for the signUp fields
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  // errors for code verification
  //   for verification code
  const {
    control: codeControl,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors },
  } = useForm<{ code: string }>({
    resolver: zodResolver(codeSchema),
    mode: "onBlur",
    defaultValues: { code: "" },
  });

  //signing up function.
  const onSignUpPress = async (values: signUpFormSchema) => {
    setEmail(values.email);

    const { error } = await signUp.password({
      firstName: values.lastName,
      lastName: values.lastName,
      emailAddress: values.email,
      password: values.password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));

      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
    }

    //tell user to change password if not strong enough.
  };

  //verify the code.
  const verifyCode = async ({ code }: { code: string }) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });

    //check the verification
    if (error) {
      console.error("Verification error:", JSON.stringify(error, null, 2));

      // check if the verification code has expired.
      //1. grab the verification expired code field
      const codeVerify =
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        Array.isArray((error as any).errors)
          ? (error as any).errors[0]?.code
          : undefined;

      if (codeVerify === "verification_expired") {
        setVerifyCodeError(
          "This Verification code has expired. Please request a new code",
        );
      } else if (codeVerify === "form_code_incorrect") {
        setVerifyCodeError("Incorrect code. Please enter a valid code.");
      }

      return;
    }
    //---------------------------------------------------------------
    //if the verification went through. - CONSOLE
    console.log("Verification succeede");
    console.log("Status:", signUp.status);
    console.log("Unverified fields:", signUp.unverifiedFields);
    //---------------------------------------------------------------
    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return;
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      console.error("Sign-up attempt not complete");
      console.error("Status:", signUp.status);
      console.error("missing fields", signUp.missingFields);
      console.error("unverified fields", signUp.unverifiedFields);
    }
  };

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <KeyboardAvoidingView behavior="padding" className="bg-brand-body flex-1">
        <View className="px-6 flex-1 justify-center">
          <Image
            source={require("../../assets/images/finora.png")}
            className="h-36 w-40"
            resizeMode="contain"
          />

          <Controller
            name="code"
            control={codeControl}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  className="bg-white rounded-xl px-4 py-4"
                  placeholder="Enter verification code"
                  placeholderTextColor="#8A8D96"
                  value={value}
                  onChangeText={onChange}
                />
              );
            }}
          />
          {verifyCodeError && (
            <Text className="text-brand-coral mt-3">{verifyCodeError}</Text>
          )}

          <TouchableOpacity
            onPress={handleCodeSubmit(verifyCode)}
            disabled={isLoading}
            className="mt-10 bg-brand-blue rounded-lg py-4"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-white font-bold">Verify</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => signUp.verifications.sendEmailCode()}
            className="mt-5"
          >
            <Text className="text-brand-blue">I need a new code</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signUp.reset()} className="mt-5">
            <Text className="text-brand-blue">Start over</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-brand-body">
      <View className="flex-1 justify-center px-6">
        {/* image logo */}
        <Image
          source={require("../../assets/images/finora.png")}
          className="h-36 w-40"
          resizeMode="contain"
        />
        <Text className="leading-tight text-3xl font-bold">Create Account</Text>
        <Text className="text-base text-gray-500">
          Track your money, powered by AI
        </Text>

        {/* input forms */}
        <View className="flex-row gap-3 mt-3">
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  className="bg-white flex-1 rounded-xl px-4 py-2"
                  placeholder="First name"
                  placeholderTextColor="#8A8D96"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                />
              );
            }}
          />

          {/* last name input field */}
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  className="bg-white flex-1 px-4 py-4 rounded-xl"
                  placeholder="Last Name"
                  placeholderTextColor="#8A8D96"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                />
              );
            }}
          />
          {/* error render */}
        </View>

        {/* email field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                className="bg-white  px-4 py-4 rounded-xl mt-6"
                placeholder="Email"
                placeholderTextColor="#8A8D96"
                value={value}
                onChangeText={onChange}
              />
            );
          }}
        />
        {/* error render */}
        {formErrors.email && (
          <Text className="text-brand-coral">{formErrors.email.message}</Text>
        )}

        {/* password field */}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                placeholder="Password"
                placeholderTextColor="#8a8d96"
                className="bg-white rounded-xl mt-6 p-4"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            );
          }}
        />
        {formErrors.password && (
          <Text className="text-brand-coral">
            {formErrors.password.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSignUpPress)}
          disabled={isLoading}
          className="mt-10 bg-brand-blue rounded-lg py-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-white font-bold">Sign up</Text>
          )}
        </TouchableOpacity>
        <View className="flex-row justify-center items-center mt-5">
          {" "}
          <Text className="text-center">Already have an account? </Text>
          <Link href="/sign-in">
            <Text className="text-brand-blue font-semibold">Sign In</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
