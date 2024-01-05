import { useEffect, useRef, useState } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import getHand from "../controller/AIController";
import { Camera } from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs";
import { HAND_CONNECTIONS, NormalizedLandmarkListList, Results } from "@mediapipe/hands";
import { useNavigate } from "react-router-dom";


export default function AIPage() {
    const modelRef = useRef<tf.LayersModel | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [predictedLetter, setPredicted] = useState("Hand Sign Recognition");
    const imageRef = useRef<HTMLImageElement>(null);
    
    const loadTrainedModel = async () => {
        try {
            modelRef.current = await tf.loadLayersModel("/model.json");
        } catch (error) {
            console.error("Error loading the model:", error);
        }
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
                maxY = 0,
                minZ = 0,
                maxZ = 0;
            const landmarkData = [];

            for (const point of landmarks) {
                minX = Math.min(minX, point.x * canvas.width) - 3;
                maxX = Math.max(maxX, point.x * canvas.width) + 3;
                minY = Math.min(minY, point.y * canvas.height) - 3;
                maxY = Math.max(maxY, point.y * canvas.height) + 3;
                minZ = Math.min(minZ, point.z * canvas.height) - 3;
                maxZ = Math.max(maxZ, point.z * canvas.width) + 3;
                const relativeX = point.x - landmarks[0].x;
                const relativeY = point.y - landmarks[0].y;
                const relativeZ = point.z - landmarks[0].z;
                landmarkData.push(relativeX);
                landmarkData.push(relativeY);
                landmarkData.push(relativeZ);
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
        const model = modelRef.current!;

        if (landmarkData.length !== 63) {
            console.error("Invalid landmarkData length");
            return;
        }
    
        const flattenedLandmarkData = new Float32Array(landmarkData);
        const inputTensor = tf.tensor2d(flattenedLandmarkData, [1, 63]);
        const predictionResult = model.predict(inputTensor);
        const predictedLabel = tf.argMax(predictionResult as tf.Tensor, 1).dataSync()[0];
        const gestureLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    
        const prediction = gestureLabels[predictedLabel];
        // console.log("Prediction:", prediction);
        const predictRes = prediction
        setPredicted(predictRes);
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
                    <section className="flex flex-col items-center justify-center w-3/6 h-fit z-[-1] object-cover mx-auto my-auto translate-y-24">
                        <canvas className="z-0 w-full h-fit aspect-h-9 aspect-w-16 rounded-lg shadow-lg"
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
                <div className="absolute top-4 left-4">
                    <button className="bg-slate-50 text-[#1b1464] w-full px-7 py-2  rounded text-md" onClick={handleClick}>
                        Back
                    </button>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                    <div className="text-6xl font-bold text-white">
                        SignoAI
                    </div>
                </div>
                <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
                    <div className="text-white text-4xl italic text-center">
                        {predictedLetter != 'Hand Sign Recognition' ?  'Result =' : ''} <b>{predictedLetter}</b>
                    </div>
                </div>
            </div>
        </>   
    );
}
