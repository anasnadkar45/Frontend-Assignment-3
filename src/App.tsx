import { FormEvent, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import TldrawComponent from "./TldrawComponent";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { exportToBlob } from "tldraw";

export default function App() {
  const [sizeOfTimeline, setSizeOfTimeline] = useState<number>(0);
  const [totalTimeline, setTotalTimeline] = useState<number>(0);
  const [editor, setEditor] = useState(null); 

  const handleGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (totalTimeline <= 0) {
      alert("Please enter a positive number of items.");
      return;
    }
    setSizeOfTimeline(totalTimeline);
  };

  const handleExport = async () => {
    if (!editor) {
      alert("Editor is not ready yet!");
      return;
    }
    const shapeIds = editor.getCurrentPageShapeIds();
    if (shapeIds.size === 0) return alert('No shapes on the canvas');

    const blob = await exportToBlob({
      editor,
      ids: [...shapeIds],
      format: 'png',
      opts: { background: true },
    });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'timeline-image.png';
    link.click();
  };

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <div className="flex justify-between items-center bg-white border-b-2 px-6 py-2">
        <h1 className="text-2xl font-bold w-fit">Tldraw Canvas</h1>
        <div>
          <Sheet>
            <SheetTrigger>
              <Button size={"sm"}>Create Timeline</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Do you want to create a Timeline?</SheetTitle>
                <SheetDescription>
                  Enter the desired number of items to be displayed on the Timeline and click the generate button.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleGenerate} className="space-y-4 mt-4">
                <div className="space-y-1">
                  <Label className="text-right">
                    Number of Timeline Items
                  </Label>
                  <Input
                    value={totalTimeline}
                    onChange={(e) => setTotalTimeline(+e.target.value)}
                    placeholder="No. of timelines you want to create"
                    type="number"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Generate
                </Button>
              </form>
            </SheetContent>
          </Sheet>
          <Button size={"sm"} onClick={handleExport} className="ml-4">
            Export Timeline
          </Button>
        </div>
      </div>
      <TldrawComponent sizeOfTimeline={sizeOfTimeline} setEditor={setEditor} />
    </div>
  );
}
