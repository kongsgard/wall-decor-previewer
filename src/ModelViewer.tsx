import { FC, useEffect, useState } from "react";
import "@google/model-viewer";
import { InputGroup, Input, InputRightAddon, Text } from "@chakra-ui/react";

export const ModelViewer: FC = () => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [modelViewerTransform, setModelViewerTransform] =
    useState<Element | null>(null);

  useEffect(() => {
    setModelViewerTransform(document.querySelector("model-viewer"));
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (modelViewerTransform) {
        modelViewerTransform.scale = `${width} ${height} 1`;
        modelViewerTransform.updateFraming();
      }
    };

    if (!isNaN(width) && !isNaN(height)) {
      updateScale();
    }
  }, [width, height]);

  return (
    <model-viewer
      src="canvas.glb"
      ar
      ar-placement="wall"
      camera-controls
      touch-action="pan-y"
      alt="A 3D model of some wall art"
      class="model-viewer"
    >
      <button slot="ar-button" className="ar-button">
        🪄 Activate AR
      </button>
      <div className="controls">
        <div className="controls-size">
          <label>
            <Text mb="8px">Width:</Text>
            <InputGroup maxW={32}>
              <Input
                type="number"
                defaultValue={1}
                onChange={(e) => {
                  setWidth(parseFloat(e.target.value));
                }}
              />
              <InputRightAddon children="m" />
            </InputGroup>
          </label>
          <label>
            <Text mb="8px">Height:</Text>
            <InputGroup maxW={32}>
              <Input
                type="number"
                defaultValue={1}
                onChange={(e) => {
                  setHeight(parseFloat(e.target.value));
                }}
              />
              <InputRightAddon children="m" />
            </InputGroup>
          </label>
        </div>
      </div>
    </model-viewer>
  );
};
