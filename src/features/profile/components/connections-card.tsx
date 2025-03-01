import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Connection = {
  id: string;
  initials: string;
  name: string;
  email: string;
  isConnected: boolean;
};

type ConnectionsCardProps = {
  title: string;
  connections: Connection[];
};

const ConnectionsCard = ({ title, connections }: ConnectionsCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <h2 className="text-xl font-bold">{title}</h2>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                <span className="text-sm font-medium">
                  {connection.initials}
                </span>
              </div>
              <div>
                <p className="font-medium">{connection.name}</p>
                <p className="text-muted-foreground text-sm">
                  {connection.email}
                </p>
              </div>
            </div>
            <Button
              variant={connection.isConnected ? "destructive" : "outline"}
              size="sm"
            >
              {connection.isConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ConnectionsCard;
