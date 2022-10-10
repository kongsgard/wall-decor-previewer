import { FC } from "react";
import "@google/model-viewer";

export const ModelViewer: FC = () => {
  return (
    <model-viewer
      src="canvas.glb"
      ar
      ar-placement="wall"
      camera-controls
      touch-action="pan-y"
      alt="A 3D model of some wall art"
      class="model-viewer"
    ></model-viewer>
  );
};
