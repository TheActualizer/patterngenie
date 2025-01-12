import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateProject: () => void;
}

export const EmptyState = ({ onCreateProject }: EmptyStateProps) => {
  return (
    <Card className="text-center p-8">
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">You haven't created any projects yet.</p>
        <Button onClick={onCreateProject}>Create Your First Project</Button>
      </CardContent>
    </Card>
  );
};