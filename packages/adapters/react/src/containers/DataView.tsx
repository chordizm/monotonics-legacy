import { Data, Identity, Index } from "@monotonics/core";
import { AddDataButton, ChartView, ImageView, TableView } from ".";
import { SplitView, Tab, Tabs } from "../components";
import { IconChartHistogram, IconTable } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const SelectDataset = () => {
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
      Select dataset
    </div>
  );
};

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
  hidden?: boolean;
  data?: Data;
};

const Content = ({ hidden, data }: ContentProps) => {
  return hidden ? (
    <></>
  ) : data ? (
    <ImageView dataUrl="" data={data} />
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
  indexes: Index[];
  resolveData: (id: Identity) => Promise<Data>;
  onUpload?: (input: { name: string; data: string }) => Promise<void>;
};

export const DataView = ({ indexes, resolveData, onUpload }: DataViewProps) => {
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

  return (
    <SplitView>
      <Tabs
        actions={<AddDataButton onUpload={onUpload} />}
        value={selectedId}
        onChange={(id) => {
          console.log("Data selected: ", id);
          setSelectedId(id);
        }}
      >
        {indexes.map((x) => (
          <Tab key={x.id} label={x.name} value={x.id}>
            <Content hidden={x.id !== selectedId} />
          </Tab>
        ))}
      </Tabs>
      {data ? (
        <Tabs defaultValue="table">
          <Tab icon={<IconTable size="0.8rem" />} label="Table" value="table">
            {data.items.length > 0 ? <TableView data={data} /> : <Processing />}
          </Tab>
          <Tab
            icon={<IconChartHistogram size="0.8rem" />}
            label="Chart"
            value="chart"
          >
            <ChartView data={data} />
          </Tab>
        </Tabs>
      ) : (
        <></>
      )}
    </SplitView>
  );
};
