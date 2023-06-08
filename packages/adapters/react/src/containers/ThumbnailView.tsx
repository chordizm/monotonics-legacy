import { useData, useSelectedDataId, useUseCases } from "@/store";
import { Thumbnail, GridView } from "@/components";

export const ThumbnailView = (_: {}) => {
  const [data] = useData();
  const [__, setSelectedIndex] = useSelectedDataId();
  const useCases = useUseCases();
  return data ? (
    <GridView>
      {data.map(({ id }, index) => (
        <Thumbnail
          key={index}
          src={useCases.getDataUrl.execute(id)}
          title={id}
          author={id}
          onClick={() => setSelectedIndex(id)}
        />
      ))}
    </GridView>
  ) : (
    <></>
  );
};
