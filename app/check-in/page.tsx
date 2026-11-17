import { requireUser } from "@/lib/session";
import { CheckIn } from "@/components/CheckIn";

export default async function CheckInPage() {
  await requireUser();
  return <CheckIn />;
}
