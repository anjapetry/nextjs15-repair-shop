import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

export function NavButton({
  icon: Icon,
  label,
  href,
}: Props) {
  return (
    <Button
    variant="ghost"
    size="icon"
    aria-label={label}
    title={label}
    className="rounded-full"
    asChild
    >
      {href ? (
        <Link href={href}>
          <Icon className="h-6 w-6" />
        </Link>
      ) : (
        <Icon className="h-6 w-6" />
      )
      }
      </Button>
  )
}