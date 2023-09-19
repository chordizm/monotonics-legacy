import { Data, Identity, Index } from "@monotonics/core";
import { AddDataButton, ChartView, ImageView, TableView } from ".";
import { SplitView, Tab, Tabs } from "../components";
import { IconChartHistogram, IconTable } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Processing = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Now processing...
    </div>
  );
};

type ContentProps = {
  path: string;
  selectedIndex?: number;
  hidden?: boolean;
  data?: Data;
  onChange?: (selectedIndex?: number) => void;
};

const Content = ({
  selectedIndex,
  hidden,
  path,
  data,
  onChange,
}: ContentProps) => {
  return hidden ? (
    <></>
  ) : data ? (
    <ImageView
      path={path}
      data={data}
      selectedIndex={selectedIndex}
      onChange={onChange}
    />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
};

export type DataViewProps = {
  datasetId?: Identity;
  resolveIndexes: (id: Identity) => Promise<Index[]>;
  resolveData: (id: Identity) => Promise<Data>;
  resolveDataPath: (id: Identity) => string;
  onUpload?: (files: File[]) => Promise<void>;
};

export const DataView = ({
  datasetId,
  resolveDataPath,
  resolveIndexes,
  resolveData,
  onUpload,
}: DataViewProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>();
  const [indexes, setIndexes] = useState<Index[]>([]);
  const [data, setData] = useState<Data>();
  const [selectedId, setSelectedId] = useState<Identity>();
  useEffect(() => {
    let mounted = true;
    if (selectedId) {
      resolveData(selectedId).then((data) => {
        if (mounted) {
          setData(data);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [selectedId, resolveData]);
  useEffect(() => {
    let mounted = true;
    if (datasetId) {
      resolveIndexes(datasetId).then((indexes) => {
        if (mounted) {
          setIndexes(indexes);
          setSelectedId(indexes[0]?.id);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [datasetId, resolveIndexes]);
  useEffect(() => {
    setSelectedItemIndex(undefined);
    setData(undefined);
  }, [datasetId, selectedId]);
  return (
    <SplitView>
      <Tabs
        actions={
          <AddDataButton
            onUpload={async (files) => {
              onUpload?.(files).then(() => {
                datasetId &&
                  resolveIndexes(datasetId).then((indexes) => {
                    console.log("Indexes: ", indexes);
                    setIndexes(indexes);
                  });
              });
            }}
          />
        }
        value={selectedId}
        onChange={(id) => {
          console.log("Data selected: ", id);
          setSelectedId(id);
        }}
      >
        {indexes.map((x) => (
          <Tab key={x.id} label={x.name} value={x.id}>
            <Content
              path={resolveDataPath(x.id)}
              hidden={x.id !== selectedId}
              data={data}
              selectedIndex={selectedItemIndex}
              onChange={(index) => setSelectedItemIndex(index)}
            />
          </Tab>
        ))}
      </Tabs>
      {data?.status === "done" ? (
        <Tabs defaultValue="table">
          <Tab icon={<IconTable size="0.8rem" />} label="Table" value="table">
            {data.items.length > 0 && (
              <TableView
                data={data}
                onClick={(index) => setSelectedItemIndex(index)}
              />
            )}
          </Tab>
          <Tab
            icon={<IconChartHistogram size="0.8rem" />}
            label="Chart"
            value="chart"
          >
            <ChartView data={data} />
          </Tab>
        </Tabs>
      ) : data?.status === "pending" ? (
        <Processing />
      ) : (
        <></>
      )}
    </SplitView>
  );
};
