import { ImagesView } from ".";
import { ImageView } from "./ImageView";
import {
  Text,
  Flex,
  ActionIcon,
  Center,
  Divider,
  Pagination,
} from "@mantine/core";
import { Data, Identity } from "@monotonics/core";
import { IconArrowLeft, IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export type ImageDatasetViewProps = {
  images: Omit<Data, "raw" | "params">[];
  resolveData: (id: Identity) => Promise<Omit<Data, "raw">>;
  resolveUrl: (id: Identity) => string;
};

export const ImageDatasetView = (props: ImageDatasetViewProps) => {
  const { images, resolveUrl, resolveData } = props;
  const [selectedDataIndex, setSelectedDataIndex] = useState<
    number | undefined
  >();
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<
    number | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Omit<Data, "raw">>();
  useEffect(() => {
    if (selectedDataIndex !== undefined) {
      setLoading(true);
      resolveData(images[selectedDataIndex].id).then((data) => {
        setData(data);
        setLoading(false);
      });
    }
  }, [selectedDataIndex]);
  return selectedDataIndex === undefined ? (
    <ImagesView
      data={images}
      resolveUrl={resolveUrl}
      onClick={(i) => {
        setSelectedSegmentIndex(undefined);
        setSelectedDataIndex(i);
      }}
    />
  ) : data === undefined ? (
    <></>
  ) : (
    <Flex direction="column" style={{ width: "100%", height: "100%" }}>
      <Flex gap="sm" p="xs" style={{ borderBottom: "solid 1px lightgray" }}>
        <ActionIcon
          onClick={() => {
            setSelectedSegmentIndex(undefined);
            setSelectedDataIndex(undefined);
          }}
        >
          <IconArrowLeft />
        </ActionIcon>
        <Center style={{ flex: 1 }}>
          <Text>{data.name}</Text>
        </Center>
        <ActionIcon>
          <IconDownload />
        </ActionIcon>
      </Flex>
      <ImageView
        data={data}
        resolveUrl={resolveUrl}
        selectedIndex={selectedSegmentIndex}
        onClick={(index) => setSelectedSegmentIndex(index)}
      />
      <Divider />
      <Center p="sm">
        <Pagination
          value={selectedDataIndex + 1}
          total={images.length}
          onChange={(value) => {
            setSelectedSegmentIndex(undefined);
            setSelectedDataIndex(value - 1);
          }}
        />
      </Center>
    </Flex>
  );
};
