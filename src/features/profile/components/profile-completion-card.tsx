import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ProfileCompletionCardProps = {
  title: string;
  progress: number;
};

const ProfileCompletionCard = ({
  title,
  progress,
}: ProfileCompletionCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <Progress value={progress} className="mb-2 h-2" />
    </CardContent>
  </Card>
);

export default ProfileCompletionCard;
