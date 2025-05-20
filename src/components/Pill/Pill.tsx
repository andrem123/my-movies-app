import { Badge } from "@/components/ui/badge";

type PillProps = {
  text: string;
};

export default function Pill({ text }: PillProps) {
  return <Badge className="px-3 py-0.5 text-xs">{text}</Badge>;
}