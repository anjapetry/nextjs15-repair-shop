import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Users, init as kindeInit } from "@kinde/management-api-js";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="mb-2 text-2xl">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);

    const isManager = managerPermission?.isGranted;

    // New ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="mb-2 text-2xl">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="mb-2 text-2xl">
              Customer ID #{customerId} is not active.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      // return ticket form
      if (isManager) {
        kindeInit(); // initializes Kinde Managenment API client (we set init as kindeInit in import)
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="mb-2 text-2xl">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      // return ticket form
      console.log("ticket: ", ticket);
      console.log("customer: ", customer);
      return <TicketForm customer={customer} ticket={ticket} />;
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
