import { Hands } from "@mediapipe/hands";

export default function getHand() {
    const hand = new Hands({
        locateFile: (file) => {
            return `/node_modules/@mediapipe/hands/${file}`;
        },
    });
    hand.setOptions({
        maxNumHands: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
        modelComplexity: 1,
    });
    return hand;
}
