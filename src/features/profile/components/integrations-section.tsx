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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFiceAdvisor } from "../api/integrations";

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
      connected: false,
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

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [currentIntegrationId, setCurrentIntegrationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any previous error messages when user starts typing
    if (loginError) setLoginError("");
  };

  const handleConnect = (id) => {
    // If already connected, toggle the connection off
    const integration = integrations.find((i) => i.id === id);
    if (integration.connected) {
      setIntegrations(
        integrations.map((integration) =>
          integration.id === id
            ? { ...integration, connected: false }
            : integration,
        ),
      );
      return;
    }

    // If not connected, open the login dialog
    setCurrentIntegrationId(id);
    setLoginDialogOpen(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      // Call the FICE Advisor login API
      await loginFiceAdvisor(loginData.email, loginData.password);

      // Update the connection status if login successful
      setIntegrations(
        integrations.map((integration) =>
          integration.id === currentIntegrationId
            ? { ...integration, connected: true }
            : integration,
        ),
      );

      // Close dialog and reset form
      setLoginDialogOpen(false);
      setLoginData({ email: "", password: "" });
    } catch (error) {
      // Display error message
      setLoginError(
        error.message || "Failed to connect. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
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

      {/* FICE Advisor Login Dialog */}
      <Dialog
        open={loginDialogOpen}
        onOpenChange={(open) => {
          setLoginDialogOpen(open);
          if (!open) {
            setLoginError("");
            setLoginData({ email: "", password: "" });
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect to FICE Advisor</DialogTitle>
            <DialogDescription>
              Enter your credentials to connect to the FICE Advisor integration.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              {loginError && (
                <div className="text-sm font-medium text-red-500">
                  {loginError}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLoginDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Connecting..." : "Connect"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationsSection;
