import { useEffect, useMemo } from 'react';
import { createShapeId, TLShapeId, useEditor } from 'tldraw';

interface sizeOfTimelineProps {
    sizeOfTimeline: number;
}

const Timeline = ({ sizeOfTimeline }: sizeOfTimelineProps) => {
    const editor = useEditor();
    const ids: TLShapeId[] = [];

    const shapes = useMemo(() => {
        const shapeIds: TLShapeId[] = [];
        if (sizeOfTimeline === 0) {
            const initialId = createShapeId();
            shapeIds.push(initialId);
        } else {
            const timelineAxisId = createShapeId();
            shapeIds.push(timelineAxisId);

            for (let i = 0; i < sizeOfTimeline; i++) {
                const timelineId = createShapeId();
                shapeIds.push(timelineId);

                const headingId = createShapeId();
                shapeIds.push(headingId);

                const descriptionId = createShapeId();
                shapeIds.push(descriptionId);
            }
        }
        return shapeIds;
    }, [sizeOfTimeline]);

    useEffect(() => {

        ids.length = 0; // Reset IDs on each effect call

        if (sizeOfTimeline === 0) {
            const initialId = shapes[0];
            editor.createShape({
                id: initialId,
                "type": "geo",
                "x": 520,
                "y": 200,
                "rotation": 0,
                "opacity": 1,
                "isLocked": false,
                "props": {
                    "w": 400,
                    "h": 200,
                    "geo": "rectangle",
                    "color": "black",
                    "labelColor": "black",
                    "fill": "solid",
                    "dash": "draw",
                    "size": "m",
                    "font": "draw",
                    "text": "Click on Create Timeline button to create a new Timeline",
                    "align": "middle",
                    "verticalAlign": "middle",
                    "growY": 0,
                    "url": ""
                },
                "meta": {},
            });
        } else {
            const timelineAxisId = shapes[0];
            editor.createShape({
                id: timelineAxisId,
                type: "line",
                x: 500,
                y: 300,
                props: {
                    size: "l",
                    color: "black",
                    points: {
                        start: { id: "1", index: timelineAxisId, x: 0, y: 0 },
                        end: {
                            id: "2",
                            index: timelineAxisId,
                            x: sizeOfTimeline * 100,
                            y: 0,
                        },
                    },
                },
            });

            for (let i = 0; i < sizeOfTimeline; i++) {
                const timelineId = shapes[i + 1]; // Get timeline ID
                editor.createShape({
                    id: timelineId,
                    type: "line",
                    x: 500,
                    y: 300,
                    props: {
                        size: "m",
                        points: {
                            start: { id: "1", index: timelineAxisId, x: i * 100 + 50, y: 0 },
                            end: {
                                id: "2",
                                index: timelineAxisId,
                                x: i * 100 + 50,
                                y: i % 2 === 0 ? -50 : 50,
                            },
                        },
                    },
                });

                const headingId = shapes[i + 1 + sizeOfTimeline]; // Get heading ID
                editor.createShape({
                    id: headingId,
                    type: "text",
                    x: i * 100 + 500,
                    y: i % 2 === 0 ? 180 : 360,
                    props: {
                        text: `Subheading ${i + 1}`,
                        size: "s",
                    },
                });

                const descriptionId = shapes[i + 1 + sizeOfTimeline * 2]; // Get description ID
                editor.createShape({
                    id: descriptionId,
                    type: "text",
                    x: i * 100 + 500,
                    y: i % 2 === 0 ? 210 : 390,
                    props: {
                        text: `Description ${i + 1}`,
                        size: "s",
                    },
                });
            }
        }

        return () => {
            editor.deleteShapes(shapes);
        };
    }, [shapes, editor, sizeOfTimeline]);

    return null;
};

export default Timeline;
