import { ImageStub } from "../ImageStub/ImageStub";

const COVER_HEIGHT = 300;

export const CardCover = ({
  imageUrl = "",
  name = "",
  className = "",
}: {
  className?: string;
  imageUrl?: string;
  name?: string;
}) => (
  <div style={{ height: COVER_HEIGHT, overflow: "hidden" }}>
    {imageUrl ? (
      <img
        className={className}
        src={imageUrl}
        alt={`Изображение ${name}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    ) : (
      <ImageStub
        className={className}
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
        imageSize="4rem"
      />
    )}
  </div>
);
