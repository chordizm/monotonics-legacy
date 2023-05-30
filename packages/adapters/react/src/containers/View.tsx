import { ChartView, ImageView, TableView, ThumbnailView } from ".";
import { DataView } from "@/components";
import { useMimeType, useSelectedDataId } from "@/store";

export const View = (_: {}) => {
  const [mimeType] = useMimeType();
  const [selectedDataId, setSelectedDataId] = useSelectedDataId();
  return mimeType?.startsWith("image") ? (
    selectedDataId ? (
      <DataView
        tl={<ImageView />}
        tr={<ChartView />}
        bottom={<TableView />}
        onBack={() => setSelectedDataId(undefined)}
      />
    ) : (
      <ThumbnailView />
    )
  ) : (
    <div>Unsupported MIME type: {mimeType}</div>
  );
};
