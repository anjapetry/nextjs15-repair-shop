"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
} from "@/zod-schemas/customer";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveCustomerAction = actionClient
  .metadata({ actionName: "saveCustomerAction" })
  .schema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: customer,
    }: {
      parsedInput: insertCustomerSchemaType;
    }) => {
      // test redirect
      // redirect("/customers");

      const { isAuthenticated } = getKindeServerSession();

      const isAuth = await isAuthenticated();

      // New Customer
      if (!isAuth) redirect("/login");

      // throw Error("Test Error");
      // const data = await fetch('https://jsoplaceholder');

      // import sql from drizzle first, then:
      //const query = sql.raw("SELECT * FROM Dave");
      //const data = await db.execute(query);

      if (customer.id === 0) {
        const result = await db
          .insert(customers)
          .values({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            address1: customer.address1,
            ...(customer.address2?.trim()
              ? { address2: customer.address2 }
              : {}),
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            ...(customer.notes?.trim() ? { notes: customer.notes } : {}),
          })
          .returning({ insertId: customers.id });

        return {
          message: `Customer ID #${result[0].insertId} created successfully`,
        };
      }

      // Existing customer
      const result = await db
        .update(customers)
        .set({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address1: customer.address1,
          address2: customer.address2?.trim() ?? null,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          notes: customer.notes?.trim() ?? null,
        })
        .where(eq(customers.id, customer.id!))
        .returning({ insertId: customers.id });

      return {
        message: `Customer ID #${result[0].insertId} updated successfully`,
      };
    },
  );
