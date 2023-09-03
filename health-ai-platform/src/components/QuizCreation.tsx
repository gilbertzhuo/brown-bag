"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { QuizCreationSchema } from "@/schemas/form/quiz";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingQuestions from "./LoadingQuestions";
import { cn } from "@/lib/utils";

type Props = {};

type Input = z.infer<typeof QuizCreationSchema>;

const diseases = [
  { label: "Common Cold", value: "Common Cold" },
  { label: "Ear Infections", value: "Ear Infections" },
  { label: "Croup", value: "Croup" },
  { label: "Asthma", value: "Asthma" },
  { label: "Bronchiolitis", value: "Bronchiolitis" },
  {
    label: "Gastroenteritis (Stomach Flu)",
    value: "Gastroenteritis (Stomach Flu)",
  },
  { label: "Diarrhea", value: "Diarrhea" },
  { label: "Constipation", value: "Constipation" },
  { label: "Fever", value: "Fever" },
  { label: "Chickenpox", value: "Chickenpox" },
  { label: "Measles", value: "Measles" },
  { label: "Mumps", value: "Mumps" },
  { label: "Rubella (German measles)", value: "Rubella (German measles)" },
  {
    label: "Hand, Foot, and Mouth Disease",
    value: "Hand, Foot, and Mouth Disease",
  },
  { label: "Strep Throat", value: "Strep Throat" },
  { label: "Head Lice", value: "Head Lice" },
  { label: "Pinkeye (Conjunctivitis)", value: "Pinkeye (Conjunctivitis)" },
  { label: "Warts", value: "Warts" },
  { label: "Allergies", value: "Allergies" },
  { label: "Aches and Pains", value: "Aches and Pains" },
  { label: "Behavioral Issues", value: "Behavioral Issues" },
  { label: "Dental Cavities", value: "Dental Cavities" },
  { label: "Childhood Obesity", value: "Childhood Obesity" },
  { label: "Growing Pains", value: "Growing Pains" },
  { label: "Childhood Anxiety", value: "Childhood Anxiety" },
] as const;

const QuizCreation = (props: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post(
        "/api/v1/diagnosis",
        {
          amount,
          topic,
          type,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(QuizCreationSchema),
    defaultValues: {
      amount: 10,
      topic: "",
      type: "symptoms",
    },
  });

  function onSubmit(input: Input) {
    setShowLoader(true);
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
      },
      {
        onSuccess: ({ diagnosisId }) => {
          setFinished(true);
          setTimeout(() => {
            router.push(`/quiz/${diagnosisId}`);
          }, 1000);
        },
        onError: () => {
          setShowLoader(false);
        },
      }
    );
  }

  form.watch();

  if (showLoader) {
    return (
      <Card className="col-span-4 h-fit relative">
        <LoadingQuestions finished={finished} />
      </Card>
    );
  }

  return (
    <Card className="col-span-4 h-fit">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Disease Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 relative"
          >
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[320px]">
                  <FormLabel>Looking to test for</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? field.value : "Select disease"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[320px]">
                      <Command>
                        <CommandInput placeholder="Search for disease..." />
                        <CommandEmpty></CommandEmpty>
                        <CommandGroup>
                          {diseases.slice(0, 10).map((disease) => (
                            <CommandItem
                              value={disease.label}
                              key={disease.value}
                              onSelect={() => {
                                form.setValue("topic", disease.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  disease.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {disease.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This questionnaire is generated by artificial intelligence
                    (AI) based on the test selected. Please note that the
                    results should not replace professional medical advice,
                    diagnosis, or treatment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuizCreation;
