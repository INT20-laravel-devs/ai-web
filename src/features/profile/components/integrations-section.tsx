import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const IntegrationsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Integrations</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Connected Integration */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">FACE Advisor</CardTitle>
              <Badge>Connected</Badge>
            </div>
            <CardDescription>Financial Advice and Consultation Expert</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="FACE Advisor"/>
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">AI Financial Expert</p>
                <p className="text-sm text-muted-foreground">Powered by GPT-4</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Get personalized financial advice, investment strategies, and budget planning assistance.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Configure
            </Button>
          </CardFooter>
        </Card>

        {/* Available Integrations */}
        {["Document Analysis", "Creative Assistant", "Data Visualization"].map((integration, i) => (
          <Card key={integration} className="bg-muted/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{integration}</CardTitle>
              <CardDescription>
                {i === 0
                  ? "Extract insights from your documents"
                  : i === 1
                    ? "Generate creative content and ideas"
                    : "Visualize your data with AI assistance"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${i + 1}`} alt={integration}/>
                  <AvatarFallback>{integration.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">AI {integration}</p>
                  <p className="text-sm text-muted-foreground">
                    {i === 0 ? "Powered by GPT-4 Vision" : i === 1 ? "Powered by DALL-E 3" : "Powered by GPT-4 & D3.js"}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  {i === 0
                    ? "Upload documents and get summaries, insights, and answers to your questions."
                    : i === 1
                      ? "Generate creative text, images, and ideas for your projects and content."
                      : "Turn your data into beautiful, interactive visualizations with AI assistance."}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4"/>
                Connect
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add More Card */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-full py-8">
            <div className="rounded-full bg-muted p-3 mb-4">
              <PlusCircle className="h-6 w-6 text-muted-foreground"/>
            </div>
            <h3 className="text-lg font-medium mb-1">Add Integration</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Browse the marketplace for more AI integrations
            </p>
            <Button variant="outline">Explore Marketplace</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

export default IntegrationsSection;