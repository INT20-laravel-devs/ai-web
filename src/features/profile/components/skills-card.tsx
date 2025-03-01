import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type SkillsCardProps = {
  title: string;
  skills: string[];
};

const SkillsCard = ({ title, skills }: SkillsCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SkillsCard;
