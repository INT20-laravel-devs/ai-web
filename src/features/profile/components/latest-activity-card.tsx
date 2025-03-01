import { Download } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Activity = {
  title: string;
  date: string;
  description: string;
  isLatest?: boolean;
  hasDownload?: boolean;
};

type LatestActivityCardProps = {
  title: string;
  viewAllLink: string;
  activities: Activity[];
};

const LatestActivityCard = ({
  title,
  viewAllLink,
  activities,
}: LatestActivityCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <h2 className="text-xl font-bold">{title}</h2>
      <Link href={viewAllLink} className="text-primary text-sm hover:underline">
        View All
      </Link>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={index < activities.length - 1 ? "border-b pb-6" : ""}
          >
            <div className="mb-1 flex items-center gap-2">
              <div className="bg-primary/10 flex h-5 w-5 items-center justify-center rounded">
                <Download className="text-primary h-3 w-3" />
              </div>
              <h3 className="font-semibold">{activity.title}</h3>
              {activity.isLatest && (
                <Badge
                  className="ml-2 bg-black text-white hover:bg-black/90"
                  variant="secondary"
                >
                  Latest
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-1 text-sm">
              {activity.date}
            </p>
            <p className="mb-3 text-sm">{activity.description}</p>
            {activity.hasDownload && (
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download ZIP
              </Button>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default LatestActivityCard;
