"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { userSchema } from "@/schemas/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { basic } from "./Records";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type Input = z.infer<typeof userSchema>;

const UserDetails = () => {
  const { toast } = useToast();

  const currentUser = useQuery(["userData"], async () => {
    try {
      const response = await axios.get("/api/v1/user", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: async ({
      dateOfBirth,
      gender,
      height,
      weight,
      location,
      bloodPressure,
      medicalHistory,
      familyHistory,
    }: Input) => {
      const response = await axios.post(
        "/api/v1/user",
        {
          dateOfBirth,
          gender,
          height,
          weight,
          location,
          bloodPressure,
          medicalHistory,
          familyHistory,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(userSchema),
  });

  function onSubmit(input: Input) {
    updateUser(
      {
        dateOfBirth: input.dateOfBirth,
        gender: input.gender,
        height: input.height,
        weight: input.weight,
        location: input.location,
        bloodPressure: input.bloodPressure,
        medicalHistory: input.medicalHistory,
        familyHistory: input.familyHistory,
      },
      {
        onSuccess: () => {
          toast({
            title: "Profile",
            description: "Updated Successfully.",
            variant: "success",
          });
        },
        onError: () => {
          toast({
            title: "Error Updating Profile",
            description: "Please try again later.",
            variant: "destructive",
          });
        },
      }
    );
  }

  form.watch();

  React.useEffect(() => {
    if (currentUser.data?.user) {
      form.reset(currentUser.data?.user);
    }
  }, [form, currentUser.data]);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">
          {currentUser.data?.user.name ?? ""}
        </CardTitle>
        <CardDescription>Your profile information</CardDescription>
      </CardHeader>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-2 w-11/12 mx-auto mb-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
        </TabsList>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basic" className="space-y-4">
                {basic.map((records, index) => {
                  return (
                    <FormField
                      key={index}
                      control={form.control}
                      name={records.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{records.label}</FormLabel>
                          <FormControl>
                            <Input
                              type={records.type}
                              placeholder={records.placeholder}
                              defaultValue={field.value}
                              onChange={(e) => {
                                form.setValue(records.name, e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            {records.description}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </TabsContent>
              <TabsContent value="medical" className="space-y-4">
                <FormField
                  control={form.control}
                  name="bloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please provide your blood pressure"
                          value={field.value}
                          onChange={(e) => {
                            form.setValue("bloodPressure", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Medical conditions can be gender-specific or have
                        different symptoms based on gender.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical History</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none !h-[125px]"
                          placeholder="Enter any medical history"
                          defaultValue={field.value}
                          onChange={(e) => {
                            form.setValue("medicalHistory", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Pre-existing medical conditions or current medications
                        is essential to understand the overall health of the
                        patient.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="familyHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family History</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none !h-[125px]"
                          placeholder="Enter any family medical history"
                          defaultValue={field.value}
                          onChange={(e) => {
                            form.setValue("familyHistory", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Family history helps identify potential hereditary
                        conditions or illnesses that may have a genetic
                        component.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <div className="float-right pt-4 pb-4">
                <Button type="submit" disabled={isLoading}>
                  Update Profile
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default UserDetails;
