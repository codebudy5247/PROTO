"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreateProductSchema } from "@/schemas/product";
import { useState } from "react";
import { api } from "@/trpc/react";

const AddPRoductForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {},
  });

  const { data: collections } = api.collection.list.useQuery();

  const onSubmit = async (values: z.infer<typeof CreateProductSchema>) => {
    console.log(values); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="font-semibold">Collection</h3>
          <div className="flex gap-2">
            {collections?.map((collec, index) => (
              <div key={index}>
                <div className="rounded-sm border border-gray-600 p-2 cursor-pointer">
                  {collec.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button disabled={submitting} className="mt-6 w-full" type="submit">
          Add product
        </Button>
      </form>
    </Form>
  );
};

export default AddPRoductForm;
