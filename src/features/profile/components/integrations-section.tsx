import {
  ArrowRight,
  BarChart3,
  FileText,
  PlusCircle,
  Settings,
  Wand2,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const IntegrationsSection = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      title: "FICE Advisor",
      description: "Faculty of Informatics and Computer Engineering",
      provider: "AI Researcher Expert",
      poweredBy: "GPT-4",
      details:
        "Get personalized financial advice, investment strategies, and budget planning assistance.",
      connected: true,
      icon: <Settings className="h-4 w-4" />,
      initials: "FA",
    },
    {
      id: 2,
      title: "Document Analysis",
      description: "Extract insights from your documents",
      provider: "AI Document Analysis",
      poweredBy: "GPT-4 Vision",
      details:
        "Upload documents and get summaries, insights, and answers to your questions.",
      connected: false,
      icon: <FileText className="h-4 w-4" />,
      initials: "DA",
      comingSoon: true,
    },
  ]);

  const handleConnect = (id: number) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Integrations</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card
            key={integration.id}
            className={`transition-all duration-200 ${
              !integration.connected && !integration.comingSoon
                ? "bg-muted/40 hover:bg-background hover:shadow-md"
                : ""
            } ${integration.comingSoon ? "border-dashed opacity-75" : ""}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{integration.title}</CardTitle>
                {integration.connected && <Badge>Connected</Badge>}
                {integration.comingSoon && (
                  <Badge variant="outline">Coming Soon</Badge>
                )}
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`/api/placeholder/40/40?text=${integration.initials}`}
                    alt={integration.title}
                  />
                  <AvatarFallback>{integration.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{integration.provider}</p>
                  <p className="text-sm text-muted-foreground">
                    Powered by {integration.poweredBy}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{integration.details}</p>
              </div>
            </CardContent>
            <CardFooter>
              {integration.connected ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleConnect(integration.id)}
                >
                  Configure {integration.icon}
                </Button>
              ) : integration.comingSoon ? (
                <Button disabled className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleConnect(integration.id)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsSection;
