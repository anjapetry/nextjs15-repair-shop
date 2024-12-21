import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import * as Sentry from "@sentry/nextjs";

export const metadata = {
  title: "Customers",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  // measure performance with a span
  const span = Sentry.startInactiveSpan({
    name: 'getCustomerSearchResults-1'
  })
  // query database
  const results = await getCustomerSearchResults(searchText);
  span.end();s

  // return results
  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}
