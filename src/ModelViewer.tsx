import { FC, useEffect, useState } from "react";
import "@google/model-viewer";
import {
  InputGroup,
  Input,
  InputRightAddon,
  Checkbox,
  FormLabel,
} from "@chakra-ui/react";
import {
  computePixelsToMetersScalingFactor,
  convertPixelsToMeters,
} from "./utils";

export const ModelViewer: FC = () => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [prevWidth, setPrevWidth] = useState(1);
  const [prevHeight, setPrevHeight] = useState(1);

  const [modelViewerRef, setModelViewerRef] = useState<any | null>(null);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);

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
        // @ts-ignore
        const w = parseFloat(this.width);
        // @ts-ignore
        const h = parseFloat(this.height);

        const scalingFactor = computePixelsToMetersScalingFactor(w, h);
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
          <Checkbox
            isChecked={keepAspectRatio}
            onChange={(e) => setKeepAspectRatio(e.target.checked)}
          >
            Keep aspect ratio
          </Checkbox>
        </div>
        <div className="controls-size">
          <label>
            <InputGroup maxW={32} display="flex" alignItems="center">
              <FormLabel mb="0" fontSize="0.8em" mr="5px">
                Width:
              </FormLabel>
              <Input
                p="0 0 0 8px"
                type="number"
                value={isNaN(width) ? "" : width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                onFocus={() => setPrevWidth(width)}
                onBlur={() =>
                  keepAspectRatio && setHeight(height * (width / prevWidth))
                }
              />
              <InputRightAddon fontSize="0.8em" children="m" p="10px" />
            </InputGroup>
          </label>
          <label>
            <InputGroup maxW={32} display="flex" alignItems="center">
              <FormLabel mb="0" fontSize="0.8em" mr="5px">
                Height:
              </FormLabel>
              <Input
                p="0 0 0 8px"
                type="number"
                value={isNaN(height) ? "" : height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                onFocus={() => setPrevHeight(height)}
                onBlur={() =>
                  keepAspectRatio && setWidth(width * (height / prevHeight))
                }
              />
              <InputRightAddon fontSize="0.8em" children="m" p="10px" />
            </InputGroup>
          </label>
        </div>
      </div>
    </model-viewer>
  );
};
