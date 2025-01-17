"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";

import { useToast } from "@/hooks/use-toast";
import { StatesArray } from "@/constants/StateArray";
import { saveCustomerAction } from "@/app/actions/saveCustomerAction";

import {
  insertCustomerSchema,
  type InsertCustomerSchema,
  type SelectCustomerSchema,
} from "@/zod-schemas/customer";

import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  customer?: SelectCustomerSchema;
  isManager?: boolean | undefined;
};

export default function CustomerForm({ customer, isManager = false }: Props) {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const hasCustomerId = searchParams.has("customerId");

  const emptyValues: InsertCustomerSchema = {
    id: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    active: true,
  };

  const defaultValues: InsertCustomerSchema = hasCustomerId
    ? {
        id: customer?.id || 0,
        firstName: customer?.firstName || "",
        lastName: customer?.lastName || "",
        address1: customer?.address1 || "",
        address2: customer?.address2 || "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        phone: customer?.phone ?? "",
        email: customer?.email ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true,
      }
    : emptyValues;

  const form = useForm<InsertCustomerSchema>({
    mode: "onBlur", //
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues)
  }, [searchParams.get("customerId")]);

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      // toast user
      if (data?.message) {
        toast({
          variant: "default",
          title: "Success! 🎉",
          description: data?.message,
        });
      }
    },
    onError({ error }) {
      // toast user
      toast({
        variant: "destructive",
        title: "Error! 😕",
        description: "Save Failed.",
      });
    },
  });

  async function submitForm(data: InsertCustomerSchema) {
    // console.log(data);
    executeSave({ ...data, firstName: "", phone: "" });
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer{" "}
          {customer?.id ? `#${customer.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)} // called by react-hook-form
          className="flex flex-col gap-4 md:flex-row md:gap-8"
        >
          <div className="flex w-full max-w-xs flex-col gap-4 pt-2">
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="City"
              nameInSchema="city"
            />
            <SelectWithLabel<InsertCustomerSchema>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>

          <div className="flex w-full max-w-xs flex-col gap-4 pt-2">
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<InsertCustomerSchema>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <TextAreaWithLabel<InsertCustomerSchema>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="mb-6 h-40"
            />

            {isManager && customer?.id ? (
              <CheckboxWithLabel<InsertCustomerSchema>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}

            <div className="flex gap-2">
              <Button
                tabIndex={-1}
                type="submit"
                className="w-3/4 font-semibold"
                variant="default"
                title="Save"
                aria-label="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>

              <Button
                tabIndex={-1}
                type="button"
                className="font-semibold"
                variant="destructive"
                title="Reset"
                aria-label="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
