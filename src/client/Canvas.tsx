import { JSX, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { fabric } from "fabric";
import { Button } from "preact-material-components/Button";
import { Canvas, Image } from "fabric/fabric-impl";
import style from "./Canvas.css";
import useStyles from "../common/useStyles";

interface CanvasProps {

}

export default (props: CanvasProps): JSX.Element => {
    useStyles(style);

    const [text, setText] = useState("");
    const inputRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<Canvas>(null);
    let canvas = canvasRef.current;

    useEffect(() => {
        canvasRef.current = new fabric.Canvas('canvas', {
            width: 300,
            height: 300,
            clipPath: new fabric.Circle({
                radius: 150,
                top: 0,
                left: 0,
                originX: 'left',
                originY: 'top',
                stroke: "red",
                strokeWidth: 1,
                strokeDashArray: [1, 1]
            }),
            skipOffscreen: true
        });
        let rect = new fabric.Rect({
            top : 100,
            left : 100,
            width : 60,
            height : 70,
            fill : 'red',
            stroke: "black",
            strokeWidth: 0.3
        });

        canvasRef.current.add(rect);
        canvas = canvasRef.current;
    }, []);

    const handleExport = () => {
        setText(canvas.toSVG());
    };

    const handleUploadImageRequest = () => {
        inputRef.current.click();
    };

    const handleUploadImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);

        fabric.Image.fromURL(url, function(img) {
            let scale = 100 / img.width;

            img.set({
                scaleX: scale,
                scaleY: scale
            });
            canvas.add(img);
        });
    };

    return <Fragment>
        <canvas id="canvas" width="300" height="300" className="canvas"/>
        <Button primary={true} onClick={handleExport}>Export</Button>
        <input type="file" style="display: none" ref={inputRef} onChange={handleUploadImage}/>
        <Button primary={true} onClick={handleUploadImageRequest}>Import</Button>
        <div>{text}</div>
    </Fragment>
};