import { useData, useSelectedDataId, useGetImageURL } from "@/store";
import { Thumbnail, GridView } from "@/components";

export const ThumbnailView = (_: {}) => {
  const [data] = useData();
  const [__, setSelectedIndex] = useSelectedDataId();
  const [getImageURL] = useGetImageURL();
  return data ? (
    <GridView>
      {data.map(({ id }, index) => (
        <Thumbnail
          key={index}
          src={getImageURL.execute(id)}
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
