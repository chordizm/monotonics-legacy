import { useData, useSelectedDataId, useUrlResolver } from "@/store";
import { Thumbnail, GridView } from "@/components";

export const ThumbnailView = (_: {}) => {
  const [data] = useData();
  const [__, setSelectedIndex] = useSelectedDataId();
  const resolver = useUrlResolver();
  return data ? (
    <GridView>
      {data.map(({ id }, index) => (
        <Thumbnail
          key={index}
          src={resolver.getUrl(id)}
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
