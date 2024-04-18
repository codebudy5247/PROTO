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
import { AddressSchema } from "@/schemas/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

interface Props {
  handleNext: () => void;
}

const AddAddressForm = ({ handleNext }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      lineOne: "",
      lineTwo: "",
      pincode: "",
      country: "",
      city: "",
    },
  });

  const { mutate: updateShippingAddressFn } = api.user.update.useMutation({
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });
  const { mutate: addAddressFn } = api.user.add.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onSuccess: (data) => {
      toast.success("Added!");
      updateShippingAddressFn({ defaultShippingAddress: data.id });
      handleNext()
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof AddressSchema>) => {
    addAddressFn(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="mt-2 space-y-2">
          <FormField
            control={form.control}
            name="lineOne"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Flat, House no., Building, Company, Apartment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lineTwo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address 2</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Area, Street, Sector, Village,Landmark"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={submitting} className="mt-6 w-full" type="submit">
          {submitting ? "Adding..." : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default AddAddressForm;
