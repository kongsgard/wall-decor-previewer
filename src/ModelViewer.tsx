import { FC, useEffect, useState } from "react";
import "@google/model-viewer";
import { InputGroup, Input, InputRightAddon, Text } from "@chakra-ui/react";

export const ModelViewer: FC = () => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [modelViewerRef, setModelViewerRef] = useState<Element | null>(null);

  useEffect(() => {
    setModelViewerRef(document.querySelector("model-viewer"));
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (modelViewerRef) {
        modelViewerRef.scale = `${width} ${height} 1`;
        modelViewerRef.updateFraming();
      }
    };

    if (!(isNaN(width) || isNaN(height))) {
      updateScale();
    }
  }, [width, height]);

  const onImageLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      const image = new Image();
      image.src = fileURL;
      image.onload = function () {
        const w = parseFloat(this.width);
        const h = parseFloat(this.height);

        const scalingFactor = Math.pow(
          10,
          Math.floor(Math.log10(Math.max(w, h)))
        );
        setWidth(convertPixelsToMeters(w, scalingFactor));
        setHeight(convertPixelsToMeters(h, scalingFactor));
      };

      if (modelViewerRef) {
        // Apply the texture to the model
        const texture = await modelViewerRef.createTexture(fileURL);
        texture.name = file.name;
        const material = modelViewerRef.model.materials[0];
        console.log(material);
        material["pbrMetallicRoughness"]["baseColorTexture"].setTexture(
          texture
        );
      }
    }
  };

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
        <label className="controls-file-upload">
          <input
            type="file"
            aria-hidden="true"
            accept="image/*"
            onChange={onImageLoad}
          />
          Upload Image
        </label>

        <div className="controls-size">
          <label>
            <Text mb="8px">Width:</Text>
            <InputGroup maxW={32}>
              <Input
                type="number"
                value={isNaN(width) ? "" : width}
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
                value={isNaN(height) ? "" : height}
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

function convertPixelsToMeters(
  pixels: number,
  scalingFactor: number = 1.0
): number {
  const size = pixels / scalingFactor;
  return Math.round((size + Number.EPSILON) * 100) / 100;
}
