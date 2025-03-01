import { Card, CardContent, CardHeader } from "@/components/ui/card";

type AboutMeCardProps = {
  title: string;
  highlightedText: string;
  regularText: string;
};

const AboutMeCard = ({
  title,
  highlightedText,
  regularText,
}: AboutMeCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <h2 className="text-xl font-bold">{title}</h2>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <p className="rounded-md bg-blue-100 p-4">{highlightedText}</p>
        <p>{regularText}</p>
      </div>
    </CardContent>
  </Card>
);

export default AboutMeCard;
