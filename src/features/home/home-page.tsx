import { ArrowUpRight, CirclePlay } from "lucide-react";

import { ChatPopover } from "@/components/chat/chat-popover";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/styles-utils";

const homePageData = {
  badge: "Just released v1.0.0",
  title: "Customized Shadcn UI Blocks & Components",
  description:
    "Explore a collection of Shadcn UI blocks and components, ready to preview and copy. Streamline your development workflow with easy-to-implement examples.",
  buttons: {
    primary: "Get Started",
    secondary: "Watch Demo",
  },
};

const HomePage = () => {
  const { badge, title, description, buttons } = homePageData;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12",
        )}
      />
      <div className="relative z-10 max-w-2xl text-center">
        <Badge className="rounded-full border-none bg-gradient-to-br from-primary via-muted/30 via-70% to-primary py-1">
          {badge}
        </Badge>
        <h1 className="mt-6 text-4xl font-bold !leading-[1.2] tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">{description}</p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            {buttons.primary} <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> {buttons.secondary}
          </Button>
        </div>
      </div>
      <ChatPopover />
    </div>
  );
};

export default HomePage;
