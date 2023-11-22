"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import prisma from "@/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { z } from "zod";
import { issuesTypeI } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusStyle from "@/components/status-style";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be selected.",
  }),
});

const EditIssue = ({ searchParams }: { searchParams: { id: string } }) => {
  // const router = useRouter();
  const [data, setData] = useState<issuesTypeI>();
  useEffect(() => {
    const uniqueIssue = async () => {
      try {
        await axios
          .get(`/api/auth/getUniqueIssue?id=${searchParams.id}`)
          .then((res: AxiosResponse) => {
            setData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    uniqueIssue();
  }, []);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      title: data?.title || "",
      description: data?.description || "",
      status: data?.status || ""
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-20">
      <h1 className="text-3xl font-bold">Edit Issue</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} className="w-[42rem]"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[180px]">
                    <SelectValue 
                      placeholder={<StatusStyle status={field.value}/>}/>
                    </SelectTrigger>
                    <SelectContent >
                      <SelectItem  value={'Open'}>
                        <StatusStyle status="Open" />{" "}
                      </SelectItem>
                      <SelectItem value="Closed">
                        <StatusStyle status="Closed" />{" "}
                      </SelectItem>
                      <SelectItem value="In Process">
                        <StatusStyle status="In Process" />{" "}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <SimpleMDE {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" >Update</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditIssue;
