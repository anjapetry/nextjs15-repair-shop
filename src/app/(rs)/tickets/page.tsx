import TicketSearch from "@/app/(rs)/tickets/TicketSearch";

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
    return (
      <>
        <TicketSearch />
        <p>{JSON.stringify("placeholder")}</p>
      </>
    );
  }

  // query search results

  // return search result
}
