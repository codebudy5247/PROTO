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
import { CreateProductSchema } from "@/schemas/product";
import SelectCollectionDropdown from "./SelectCollectionDropdown";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import { Checkbox } from "@/components/ui/checkbox";
import MultiSelectDropdown from "./MultiSelectDropdown";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      types: [],
      sizes: [],
      collectionId: 0,
      colors: [],
      price: 0,
      rate: 0,
      published: false,
      images: [],
    },
  });

  const { data: collections } = api.collection.list.useQuery();

  const { mutate: CreateProductFn } = api.product.create.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onSuccess: (data) => {
      toast.success("Product created successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateProductSchema>) => {
    CreateProductFn(values)
  };

  const selectedCollectionId = form.watch("collectionId");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
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

        <div className="flex items-center space-x-4">
          <MultiSelectDropdown
            control={form.control}
            name="types"
            label="Types"
            options={[
              { value: "MEN", label: "MEN" },
              { value: "WOMEN", label: "WOMEN" },
              { value: "KIDS", label: "KIDS" },
            ]}
          />

          <MultiSelectDropdown
            control={form.control}
            name="sizes"
            label="Sizes"
            options={[
              { value: "S", label: "S" },
              { value: "M", label: "M" },
              { value: "L", label: "L" },
              { value: "XL", label: "XL" },
              { value: "XXL", label: "XXL" },
              { value: "XXXL", label: "XXXL" },
            ]}
          />
        </div>

        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="collectionId"
            render={() => (
              <FormItem className="w-1/2">
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <SelectCollectionDropdown
                    collections={collections}
                    selectedCollectionId={selectedCollectionId}
                    onSelect={(collectionId) =>
                      form.setValue("collectionId", collectionId)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MultiSelectDropdown
            control={form.control}
            name="colors"
            label="Colors"
            options={[
              { value: "BLACK", label: "BLACK" },
              { value: "WHITE", label: "WHITE" },
              { value: "GRAY", label: "GRAY" },
              { value: "RED", label: "RED" },
              { value: "ORANGE", label: "ORANGE" },
              { value: "YELLOW", label: "YELLOW" },
              { value: "GREEN", label: "GREEN" },
              { value: "PINK", label: "PINK" },
              { value: "BLUE", label: "BLUE" },
              { value: "PURPLE", label: "PURPLE" },
            ]}
          />
        </div>

        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rating"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ImageUpload control={form.control} name="images" label="Images" />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button disabled={submitting} className="mt-6 w-full" type="submit">
          {submitting ? "submitting...":"Add product"}
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
