import Form from "next/form";
import { Input } from "@/components/ui/input";
import { SearchButton } from "@/components/SearchButton";

export default function TicketSearch() {
  return (
    <Form action="/tickets" className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Tickets"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}