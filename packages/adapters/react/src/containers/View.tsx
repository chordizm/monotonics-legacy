import { AddDataButton, ChartView, ImageView, TableView } from ".";
import { DataView, Tab, Tabs } from "../components";
import {
  useData,
  useMimeType,
  useSelectedDataId,
  useSelectedData,
  useSelectedDatasetId,
} from "../hooks";
import { IconChartHistogram, IconTable } from "@tabler/icons-react";

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

export const View = (_: {}) => {
  const [mimeType] = useMimeType();
  const [data] = useData();
  const [datasetId] = useSelectedDatasetId();
  const [selectedDataId, setSelectedDataId] = useSelectedDataId();
  const [selectedData] = useSelectedData();
  return mimeType ? (
    <DataView>
      <Tabs
        actions={datasetId && <AddDataButton datasetId={datasetId} />}
        value={selectedDataId}
        onChange={(value) => {
          console.log("Data selected: ", value);
          setSelectedDataId(value);
        }}
      >
        {data.map((x) => (
          <Tab key={x.id} label={x.name} value={x.id}>
            {mimeType?.startsWith("image") ? <ImageView /> : <></>}
          </Tab>
        ))}
      </Tabs>
      {selectedData && selectedData.items.length > 0 ? (
        <Tabs defaultValue="table">
          <Tab icon={<IconTable size="0.8rem" />} label="Table" value="table">
            <TableView />
          </Tab>
          <Tab
            icon={<IconChartHistogram size="0.8rem" />}
            label="Chart"
            value="chart"
          >
            <ChartView />
          </Tab>
        </Tabs>
      ) : selectedData ? (
        <Processing />
      ) : (
        <></>
      )}
    </DataView>
  ) : (
    <SelectDataset />
  );
};
