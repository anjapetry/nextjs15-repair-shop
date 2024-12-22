import TicketSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "@/app/(rs)/tickets/TicketTable";

export const metadata = {
  title: "Ticket Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    // query default results
    const results = await getOpenTickets();

    return (
      <>
        <TicketSearch />
        {results.length ? <TicketTable data={results} /> : null}
      </>
    );
  }

  // query search results
  const results = await getTicketSearchResults(searchText);
  // return results
  return (
    <>
      <TicketSearch />
      {results.length ? <TicketTable data={results} /> : null}
    </>
  );
}
