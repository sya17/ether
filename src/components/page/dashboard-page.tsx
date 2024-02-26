import LineChart from "../charts/line-chart";
import * as cards from "../ui/card";

export default function dashboard(params: {}) {
  return (
    <div className="flex flex-col w-full space-y-2">
      {/* section 1 */}
      <div className="flex h-80 flex-row space-x-2">
        <cards.Card className="w-full shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent>{/* <LineChart /> */}</cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
        <cards.Card className="w-1/2 shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent></cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
      </div>
      {/* section 2 */}
      <div className="grid grid-cols-3 gap-2">
        <cards.Card className="w-full shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent></cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
        <cards.Card className="w-full shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent></cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
        <cards.Card className="w-full shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent></cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
        <cards.Card className="w-full shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent></cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
        <cards.Card className="w-full shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent></cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
        <cards.Card className="w-full shadow-sm">
          <cards.CardHeader>
            <cards.CardTitle></cards.CardTitle>
            <cards.CardDescription></cards.CardDescription>
          </cards.CardHeader>
          <cards.CardContent></cards.CardContent>
          <cards.CardFooter></cards.CardFooter>
        </cards.Card>
      </div>
    </div>
  );
}
