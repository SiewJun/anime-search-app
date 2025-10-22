import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  return (
    <>
      <p className="text-center text-green-300">test</p>

      <Card>
        <CardHeader>
          <CardTitle>Test</CardTitle>
          <CardDescription>Testing ShadcCN</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Date</CardFooter>
      </Card>
    </>
  );
}

export default App;
