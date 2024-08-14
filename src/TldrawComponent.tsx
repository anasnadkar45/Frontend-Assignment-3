import { Tldraw, createShapeId } from "tldraw";
import "tldraw/tldraw.css";
import Timeline from "./Timeline";

interface sizeOfTimelineProps {
    sizeOfTimeline: number;
}

export default function TldrawComponent({ sizeOfTimeline }: sizeOfTimelineProps) {
    console.log(sizeOfTimeline)
    return (
        <div className="fixed w-[100vw] h-[100vh]">
            <Tldraw hideUi>
                <Timeline sizeOfTimeline = { sizeOfTimeline }/>
            </Tldraw>
        </div>
    );
}
