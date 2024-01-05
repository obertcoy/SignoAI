import { useEffect, useRef, useState } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import getHand from "../../controller/AIController.ts";
import { Camera } from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs";
import { HAND_CONNECTIONS, NormalizedLandmarkListList, Results } from "@mediapipe/hands";
import { useNavigate } from "react-router-dom";


export default function AIPage() {
    const modelRef = useRef<tf.LayersModel | null>(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [predictedLetter, setPredicted] = useState("Hand Sign Recognition");
    const imageRef = useRef<HTMLImageElement>(null);
    
    const loadTrainedModel = async () => {
        modelRef.current = await tf.loadLayersModel("../assets/model.json");
        setModelLoaded(true);
    };
    
    const retrieveCanvasContext = () => {
        return {
            canvas: canvasRef.current!,
            ctx: canvasRef.current!.getContext("2d")!,
        };
    };
    
    const renderHandImage = async (multiHandLandmarks: NormalizedLandmarkListList) => {
        const { canvas, ctx } = retrieveCanvasContext();
        for (const landmarks of multiHandLandmarks) {
            let minX = canvas.width,
                minY = canvas.height,
                maxX = 0,
                maxY = 0;
            const landmarkData = [];

            for (const point of landmarks) {
                minX = Math.min(minX, point.x * canvas.width) - 3;
                maxX = Math.max(maxX, point.x * canvas.width) + 3;
                minY = Math.min(minY, point.y * canvas.height) - 3;
                maxY = Math.max(maxY, point.y * canvas.height) + 3;
                const relativeX = point.x - landmarks[0].x;
                const relativeY = point.y - landmarks[0].y;
                landmarkData.push(relativeX);
                landmarkData.push(relativeY);
            }
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: "#3366FF", lineWidth: 1 });
            drawLandmarks(ctx, landmarks, {
                color: "##FF3366",
                fillColor: "#3366FF",
            });
    
            await processHandGesturePrediction(landmarkData);
            ctx.strokeStyle = "#FF3366";
            ctx.lineWidth = 3;
            ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
        }
    };
    
    const processHandGesturePrediction = async (landmarkData: number[]) => {
        if (!modelLoaded) {
            // console.log("model not loaded")
            return;
        }
    
        const model = modelRef.current!;
        const flattenedLandmarkData = new Float32Array(landmarkData);
        const predictionResult = model.predict(tf.tensor([flattenedLandmarkData]));
        const predictedLabel = tf.argMax(predictionResult as tf.Tensor, 1).dataSync()[0];
        const gestureLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "Space", "T", "U", "V", "W", "X", "Y", "Z"];
        const prediction = gestureLabels[predictedLabel];
        console.log("Prediction:", prediction);
        setPredicted(prediction);
    };

    const displayHandImageResults = (results: Results) => {
        const { canvas, ctx } = retrieveCanvasContext();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        if (results.multiHandLandmarks) {
            renderHandImage(results.multiHandLandmarks);
        }
    };
    
    const handleVideo = async () => {
        const videoElement = videoRef.current!;
        const handsDetector = getHand();
        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await handsDetector.send({ image: videoElement });
            },
            width: 1920,
            height: 1080,
        });
        await camera.start();
        handsDetector.onResults((result) => displayHandImageResults(result));
    };

    //routing
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate("/")
    }
    
    useEffect(() => {
        loadTrainedModel().then();
        handleVideo().then();
    }, []);
    

    return (
        <>
            <div className="relative overflow-hidden flex justify-center items-center min-h-screen bg-[#1b1464]">
                <div className="inset-0">
                <img ref={imageRef} className="absolute inset-0 w-full h-full object-cover m-0 p-0"
                />
                <section className="flex flex-col items-center justify-center w-3/6 h-fit z-[-1] object-cover">
                    <canvas className="z-0 w-full h-fit aspect-h-9 aspect-w-16"
                        ref={canvasRef}
                        width={1920}
                        height={1080}
                    />
                    <canvas className="z-0 h-auto aspect-w-16 aspect-h-9"
                        ref={canvasRef2}
                        width={1920 / 4}
                        height={1080 / 4}
                        style={{
                            width: '200px',
                            height: '200px',
                            
                        }}
                    />
                    <video
                        hidden={true}
                        className="w-full h-full"
                        ref={videoRef}
                    />
                </section>
                </div>
                <div className="absolute top-0 left-0 p-4">
                    <button className="bg-slate-50 text-[#1b1464] w-full  rounded text-lg" onClick={handleClick}>
                        Back
                    </button>
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-7xl font-bold text-white">
                        SignoAI
                    </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-white text-5xl italic">
                        {predictedLetter}
                    </div>
                </div>
            </div>
        </>   
    );
}
