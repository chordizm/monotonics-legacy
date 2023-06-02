import { ChartView, ImageView, TableView, ThumbnailView } from ".";
import { DataView, Tab, Tabs } from "@/components";
import { useData, useMimeType, useSelectedDataId } from "@/store";
import { IconChartHistogram, IconTable } from "@tabler/icons-react";

export const View = (_: {}) => {
  const [mimeType] = useMimeType();
  const [data] = useData();
  const [selectedDataId, setSelectedDataId] = useSelectedDataId();
  return mimeType ? (
    <DataView>
      <Tabs
        value={selectedDataId}
        onChange={(value) => setSelectedDataId(value)}
      >
        {data.map((x) => (
          <Tab key={x.id} value={x.id}>
            {mimeType?.startsWith("image") ? <ImageView /> : <></>}
          </Tab>
        ))}
      </Tabs>
      <Tabs defaultValue="table">
        <Tab icon={<IconTable size="0.8rem" />} value="table">
          <TableView />
        </Tab>
        <Tab icon={<IconChartHistogram size="0.8rem" />} value="chart">
          <ChartView />
        </Tab>
      </Tabs>
    </DataView>
  ) : (
    <>Select dataset</>
  );
  return mimeType?.startsWith("image") ? (
    selectedDataId ? (
      <DataView>
        <Tabs
          value={selectedDataId}
          onChange={(value) => setSelectedDataId(value)}
        >
          {data.map((x) => (
            <Tab icon={<></>} key={x.id} value={x.id}>
              <ImageView />
            </Tab>
          ))}
        </Tabs>
        <Tabs>
          <Tab icon={<IconTable size="0.8rem" />} value="table">
            <TableView />
          </Tab>
          <Tab icon={<IconChartHistogram size="0.8rem" />} value="chart">
            <ChartView />
          </Tab>
        </Tabs>
      </DataView>
    ) : (
      <ThumbnailView />
    )
  ) : (
    <div>Unsupported MIME type: {mimeType}</div>
  );
};
