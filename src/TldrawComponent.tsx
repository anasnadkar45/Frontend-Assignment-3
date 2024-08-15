import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import Timeline from "./Timeline";

interface sizeOfTimelineProps {
  sizeOfTimeline: number;
  setEditor: (editor: any) => void; 
}

export default function TldrawComponent({ sizeOfTimeline, setEditor }: sizeOfTimelineProps) {
  return (
    <div className="fixed w-[100vw] h-[100vh]">
      <Tldraw hideUi onMount={(editor) => setEditor(editor)}> {/* Set editor instance */}
        <Timeline sizeOfTimeline={sizeOfTimeline} />
      </Tldraw>
    </div>
  );
}
