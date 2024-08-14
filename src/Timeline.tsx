import React, { useEffect } from 'react'
import { createShapeId, TLShapeId, useEditor } from 'tldraw';

interface sizeOfTimelineProps {
    sizeOfTimeline: number;
}

const Timeline = ({ sizeOfTimeline }: sizeOfTimelineProps) => {
    const editor = useEditor();
    const ids: TLShapeId[] = [];

    const createShape = (id: TLShapeId, type: string, x: number, y: number, props: any) => {
        ids.push(id);
        editor.createShape({ id, type, x, y, props });
    };

    useEffect(() => {
        if (sizeOfTimeline === 0) {
            const initialId = createShapeId();
            ids.push(initialId);
            editor.createShape({
                id: initialId,
                type: "geo",
                x: 500,
                y: 200,
                props: {
                    text: "Click on Create Timeline to add a timeline! Press 'c' key to create a timeline.",
                    w: 400,
                },
            });
        } else {
            const timelineAxisId = createShapeId();
            ids.push(timelineAxisId);
            editor.createShape({
                id: timelineAxisId,
                type: "line",
                x: 500,
                y: 300,
                props: {
                    size: "l",
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
                const timelineId = createShapeId();
                ids.push(timelineId);
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

                const timelineHeadingId = createShapeId();
                ids.push(timelineHeadingId);
                editor.createShape({
                    id: timelineHeadingId,
                    type: "text",
                    x: i * 100 + 500,
                    y: i % 2 === 0 ? 180 : 360,
                    props: {
                        text: `Subheading ${i + 1}`,
                        size: "s",
                    },
                });

                const timelineDescriptionId = createShapeId();
                ids.push(timelineDescriptionId);
                editor.createShape({
                    id: timelineDescriptionId,
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
            editor.deleteShapes(ids);
        };
    }, [sizeOfTimeline]);

    return null;
}

export default Timeline