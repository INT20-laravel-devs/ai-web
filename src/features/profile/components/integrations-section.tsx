/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ArrowRight,
  BarChart3,
  FileText,
  PlusCircle,
  Settings,
  Wand2,
} from "lucide-react";
import { type ChangeEvent, type FormEvent, useState, useEffect } from "react";

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

interface Integration {
  id: number;
  title: string;
  description: string;
  provider: string;
  poweredBy: string;
  details: string;
  connected: boolean;
  icon: React.ReactNode;
  initials: string;
  comingSoon?: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

const IntegrationsSection = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 1,
      title: "ФІКТ Консультант",
      description: "Факультет інформатики та комп'ютерної техніки",
      provider: "Експерт дослідник ШІ",
      poweredBy: "GPT-4",
      details:
        "Отримайте персоналізовані поради, отримання інформації та створення подій.",
      connected: false,
      icon: <Settings className="h-4 w-4" />,
      initials: "ФК",
    },
    {
      id: 2,
      title: "Аналіз документів",
      description: "Отримайте інсайти з ваших документів",
      provider: "ШІ Аналіз Документів",
      poweredBy: "GPT-4 Vision",
      details:
        "Завантажте документи та отримайте резюме, інсайти та відповіді на ваші запитання.",
      connected: false,
      icon: <FileText className="h-4 w-4" />,
      initials: "АД",
      comingSoon: true,
    },
  ]);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [currentIntegrationId, setCurrentIntegrationId] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    const savedConnections = localStorage.getItem("integrationConnections");
    if (savedConnections) {
      const parsedConnections = JSON.parse(savedConnections);
      setIntegrations((prev) =>
        prev.map((integration) => ({
          ...integration,
          connected: parsedConnections[integration?.id] || integration.connected,
        })),
      );
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (loginError) setLoginError("");
  };

  const handleConnect = (id: number) => {
    const integration = integrations.find((i) => i.id === id);
    if (integration?.connected) {
      const updatedIntegrations = integrations.map((integration) =>
        integration.id === id
          ? { ...integration, connected: false }
          : integration,
      );
      setIntegrations(updatedIntegrations);

      const connectionsState = updatedIntegrations.reduce(
        (acc, curr) => {
          acc[curr.id] = curr.connected;
          return acc;
        },
        {} as Record<number, boolean>,
      );
      localStorage.setItem(
        "integrationConnections",
        JSON.stringify(connectionsState),
      );

      return;
    }

    setCurrentIntegrationId(id);
    setLoginDialogOpen(true);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      await loginFiceAdvisor(loginData.email, loginData.password);

      const updatedIntegrations = integrations.map((integration) =>
        integration.id === currentIntegrationId
          ? { ...integration, connected: true }
          : integration,
      );

      setIntegrations(updatedIntegrations);

      // Зберігаємо стан підключень в localStorage
      const connectionsState = updatedIntegrations.reduce(
        (acc, curr) => {
          acc[curr.id] = curr.connected;
          return acc;
        },
        {} as Record<number, boolean>,
      );
      localStorage.setItem(
        "integrationConnections",
        JSON.stringify(connectionsState),
      );

      setLoginDialogOpen(false);
      setLoginData({ email: "", password: "" });
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : "Не вдалося підключитися. Будь ласка, перевірте ваші облікові дані.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Інтеграції</h2>
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
                {integration.connected && <Badge>Підключено</Badge>}
                {integration.comingSoon && (
                  <Badge variant="outline">Скоро</Badge>
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
                    Працює на {integration.poweredBy}
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
                  Закрити {integration.icon}
                </Button>
              ) : integration.comingSoon ? (
                <Button disabled className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Скоро буде
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleConnect(integration.id)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Підключити
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* ФІКТ Консультант Діалог входу */}
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
            <DialogTitle>Підключення до ФІКТ Консультант</DialogTitle>
            <DialogDescription>
              Введіть ваші облікові дані для підключення до інтеграції ФІКТ
              Консультант.
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
                  placeholder="text@example.com"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
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
                Скасувати
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Підключення..." : "Підключити"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationsSection;
