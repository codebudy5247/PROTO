"use client";

import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Select from "react-select";

type MultiSelectDropdownProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
};

const MultiSelectDropdown = <T extends FieldValues>({
  control,
  name,
  label,
  options,
}: MultiSelectDropdownProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="w-1/2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              isMulti
              options={options}
              value={
                field.value?.map((val: string) => ({
                  value: val,
                  label: val,
                })) || []
              }
              onChange={(selected) =>
                field.onChange(
                  (selected as { value: string }[]).map((s) => s.value)
                )
              }
            />
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default MultiSelectDropdown;
