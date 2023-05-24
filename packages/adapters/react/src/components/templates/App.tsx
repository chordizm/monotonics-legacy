import { AppShell, DatasetLinks, ImageDatasetView } from "..";
import { Data, Identity } from "@monotonics/core";

export type AppProps = {
  selectedId: Identity;
  onClick?: (id: Identity) => void;
  datasets: {
    id: Identity;
    name: string;
    description: string;
    mimeType: string;
  }[];
  data: Omit<Data, "raw" | "params">[];
  resolveUrl: (id: Identity) => string;
  resolveData: (id: Identity) => Promise<Omit<Data, "raw">>;
};

export const App = (props: AppProps): JSX.Element => {
  const { datasets, data, selectedId, resolveUrl, resolveData, onClick } =
    props;
  return (
    <AppShell
      title="MonoTonics"
      navbar={{
        sections: [
          {
            title: "Datasets",
            component: (
              <DatasetLinks
                activeKey={selectedId}
                links={datasets.map((dataset) => ({
                  key: dataset.id,
                  title: dataset.name,
                  description: dataset.description,
                }))}
                onClick={onClick}
              />
            ),
          },
        ],
      }}
    >
      {datasets
        .find(({ id }) => id === selectedId)
        ?.mimeType.startsWith("image") ? (
        <ImageDatasetView
          images={data}
          resolveUrl={resolveUrl}
          resolveData={resolveData}
        />
      ) : (
        <div>Unsupported MIME type</div>
      )}
    </AppShell>
  );
};
