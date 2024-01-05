import { Hands } from "@mediapipe/hands";

export default function getHand() {
    const hand = new Hands({
        locateFile: (file) => {
            return `/node_modules/@mediapipe/hands/${file}`;
        },
    });
    hand.setOptions({
        maxNumHands: 2,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
        modelComplexity: 1,
    });
    return hand;
}
